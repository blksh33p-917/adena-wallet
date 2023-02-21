import { RoutePath } from '@router/path';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWalletCreator } from '@hooks/use-wallet-creator';
import { PasswordValidationError } from '@common/errors';
import { useResetRecoilState } from 'recoil';
import { WalletState } from '@states/index';
import { useAdenaContext } from '@hooks/use-context';
import { validateEmptyPassword, validateNotMatchConfirmPassword, validateWrongPasswordLength } from '@common/validation';

export const useCreatePassword = () => {
  const { accountService } = useAdenaContext();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [inputs, setInputs] = useState({
    pwd: '',
    confirmPwd: '',
  });
  const [terms, setTerms] = useState(false);
  const [isPwdError, setIsPwdError] = useState(false);
  const [isConfirmPwdError, setIsConfirmPwdError] = useState(false);
  const { pwd, confirmPwd } = inputs;
  const [seeds, SetSeeds] = useState('');
  const [, createWallet] = useWalletCreator();
  const [errorMessage, setErrorMessage] = useState('');
  const clearCurrentAccount = useResetRecoilState(WalletState.currentAccount);

  useEffect(() => {
    setIsPwdError(false);
    setIsConfirmPwdError(false);
    setErrorMessage('');
  }, [pwd, confirmPwd]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && terms && pwd && confirmPwd) {
      nextButtonClick();
    }
  };

  const handleTermsChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTerms((prev: boolean) => !prev);
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setInputs((input) => ({ ...input, [name]: value }));
    },
    [pwd, confirmPwd],
  );

  const validationConfirmPassword = (isValidPassword?: boolean) => {
    const password = pwd;
    const confirmPassword = confirmPwd;
    try {
      if (validateNotMatchConfirmPassword(password, confirmPassword)) return true;
    } catch (error) {
      if (error instanceof PasswordValidationError) {
        switch (error.getType()) {
          case 'NOT_MATCH_CONFIRM_PASSWORD':
            setIsConfirmPwdError(true);
            break;
          default:
            break;
        }
        if (isValidPassword) {
          setErrorMessage(error.message);
        }
      }
    }
    return false;
  };

  const validationPassword = () => {
    const password = pwd;
    try {
      validateEmptyPassword(password);
      validateWrongPasswordLength(password);
      return true;
    } catch (error) {
      console.log(error);
      setIsPwdError(true);
      if (error instanceof PasswordValidationError) {
        setErrorMessage(error.message);
      }
    }
    return false;
  };

  const validationCheck = async () => {
    const isValidPassword = validationPassword();
    const isValidConfirmPassword = validationConfirmPassword(isValidPassword);

    try {
      if (isValidPassword && isValidConfirmPassword) {
        clearCurrentAccount();
        await accountService.clearWalletAccountData();
        const walletState = await createWallet({ mnemonic: seeds, password: pwd });
        return walletState;
      }
    } catch (error) {
      console.error(error);
    }
    return 'FAIL';
  };

  const nextButtonClick = async () => {
    const walletState = await validationCheck();
    if (walletState === 'FINISH') {
      navigate(RoutePath.LaunchAdena);
      return;
    }
  };

  return {
    pwdState: {
      value: pwd,
      onChange: onChange,
      error: isPwdError,
      ref: inputRef,
    },
    confirmPwdState: {
      value: confirmPwd,
      onChange: onChange,
      error: isConfirmPwdError,
    },
    termsState: {
      value: terms,
      onChange: handleTermsChange,
    },
    errorMessage: errorMessage,
    buttonState: {
      onClick: nextButtonClick,
      disabled: terms && pwd && confirmPwd ? false : true,
    },
    setSeeds: SetSeeds,
    onKeyDown,
  };
};

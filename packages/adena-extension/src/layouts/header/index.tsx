import React from 'react';
import styled from 'styled-components';
import { useLocation, useMatch } from 'react-router-dom';
import { RoutePath } from '@router/path';
import { HomeMenu } from './home-menu';
import { TopMenu } from './top-menu';
import { ProgressMenu } from './progress-menu';
import ApproveMenu from './approve-menu';
import { useRecoilState } from 'recoil';
import { CommonState, WalletState } from '@states/index';
import { ArrowTitleMenu } from './arrow-title-menu';
import { TabMenu } from './tab-menu';

const Wrapper = styled.header`
  width: 100%;
  height: 48px;
  background-color: ${({ theme }) => theme.color.neutral[7]};
  position: sticky;
  top: 0px;
  z-index: 2;
`;

export const Header = () => {
  const location = useLocation();
  const login = useMatch(RoutePath.Login);
  const approveEstablish = useMatch(RoutePath.ApproveEstablish);
  const ApproveLogin = useMatch(RoutePath.ApproveLogin);
  const approveSign = useMatch(RoutePath.ApproveSign);
  const approveTransaction = useMatch(RoutePath.ApproveTransaction);
  const wallet = useMatch('/wallet/*');
  const nft = useMatch(RoutePath.Nft);

  const explore = useMatch(RoutePath.Explore);
  const history = useMatch(RoutePath.History);
  const settings = useMatch('/settings/*');
  const connectedApps = useMatch(RoutePath.ConnectedApps);
  const changeNetwork = useMatch(RoutePath.ChangeNetwork);

  const enterSeedPhrase = useMatch(RoutePath.EnterSeedPhrase);
  const importPrivateKey = useMatch(RoutePath.ImportPrivateKey);
  const yourSeedPhrase = useMatch(RoutePath.YourSeedPhrase);
  const createPassword = useMatch(RoutePath.CreatePassword);
  const launchAdena = useMatch(RoutePath.LaunchAdena);
  const forgotPassword = useMatch(RoutePath.ForgotPassword);
  const resetWallet = useMatch(RoutePath.ResetWallet);
  const generateSeedPhrase = useMatch(RoutePath.GenerateSeedPhrase);
  const approveHardwareWalletInit = useMatch(RoutePath.ApproveHardwareWalletInit);
  const approveHardwareWalletConnect = useMatch(RoutePath.ApproveHardwareWalletConnect);
  const approveHardwareWalletSelectAccount = useMatch(RoutePath.ApproveHardwareWalletSelectAccount);
  const approveHardwareWalletFinish = useMatch(RoutePath.ApproveHardwareWalletFinish);
  const approveHardwareWalletLedgerPassword = useMatch(
    RoutePath.ApproveHardwareWalletLedgerPassword,
  );
  const approveHardwareWalletLedgerAllSet = useMatch(RoutePath.ApproveHardwareWalletLedgerAllSet);

  const googleConnect = useMatch(RoutePath.GoogleConnect);
  const googleFailed = useMatch(RoutePath.GoogleConnectFailed);

  const [walletState] = useRecoilState(WalletState.state);
  const [failedNetwork] = useRecoilState(CommonState.failedNetwork);

  const loadingComplete = walletState === 'FINISH' || failedNetwork;
  const renderHeader = () => {
    if (login || ApproveLogin) {
      return <HomeMenu entry={location.pathname as string} />;
    }
    if (approveEstablish || approveTransaction || approveSign) {
      return <ApproveMenu />;
    }
    if (yourSeedPhrase && location?.state?.type === 'ADD_ACCOUNT') {
      return <ArrowTitleMenu />;
    }
    if (yourSeedPhrase || enterSeedPhrase) {
      return <ProgressMenu progressLevel={'first'} />;
    }
    if (location?.state?.type === 'GOOGLE' && createPassword) {
      return <ProgressMenu showLogo progressLevel={'second'} hideArrow />;
    }
    if (createPassword) {
      return <ProgressMenu progressLevel={'second'} />;
    }
    if (googleConnect || googleFailed) {
      return <ProgressMenu showLogo progressLevel={'first'} hideArrow />;
    }
    if (launchAdena) {
      return <ProgressMenu progressLevel={'third'} hideArrow />;
    }
    if (resetWallet) {
      return <ArrowTitleMenu title={'Reset Wallet'} />;
    }
    if (importPrivateKey) {
      return <ArrowTitleMenu />;
    }
    if (forgotPassword) {
      return <ArrowTitleMenu title={'Forgot Password?'} />;
    }
    if (generateSeedPhrase) {
      return <ArrowTitleMenu title={'Generate Seed Phrase'} />;
    }
    if (
      approveHardwareWalletInit ||
      approveHardwareWalletConnect ||
      approveHardwareWalletSelectAccount ||
      approveHardwareWalletFinish ||
      approveHardwareWalletLedgerPassword ||
      approveHardwareWalletLedgerAllSet
    ) {
      return <TabMenu />;
    }

    if (
      wallet ||
      nft ||
      explore ||
      history ||
      settings ||
      connectedApps ||
      changeNetwork ||
      loadingComplete
    ) {
      return <TopMenu />;
    }
  };

  return <Wrapper>{renderHeader()}</Wrapper>;
};

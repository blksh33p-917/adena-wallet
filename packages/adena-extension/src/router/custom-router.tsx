import React, { useEffect } from 'react';
import { HashRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { RoutePath } from './path';
import { Header } from '@layouts/header';
import { Navigation } from '@layouts/navigation';
import { WalletCreate } from '@pages/wallet/wallet-create';
import { ApproveTransactionMain } from '@pages/wallet/approve-transaction-main';
import { ApproveLogin } from '@pages/wallet/approve-login';
import { YourSeedPhrase } from '@pages/certify/your-seed-phrase';
import { ImportPrivateKey } from '@pages/certify/import-private-key';
import { GenerateSeedPhrase } from '@pages/certify/generate-seed-phrase';
import { CreatePassword } from '@pages/certify/create-password';
import { LaunchAdena } from '@pages/certify/launch-adena';
import { WalletMain } from '@pages/wallet/wallet-main';
import { Login } from '@pages/certify/login';
import { ForgotPassword } from '@pages/certify/forgot-password';
import { EnterSeedPharse } from '@pages/certify/enter-seed';
import { Nft } from '@pages/wallet/nft';
import { Staking } from '@pages/wallet/staking';
import { Explore } from '@pages/wallet/explore';
import { History } from '@pages/wallet/history';
import { TransactionDetail } from '@pages/wallet/transaction-detail';
import { Settings } from '@pages/certify/settings';
import { ChangePassword } from '@pages/certify/change-password';
import { ExportAccount } from '@pages/certify/export-account';
import { ViewPrivateKey } from '@pages/certify/view-private-key';
import { SeedPhrase } from '@pages/certify/seed-phrase';
import { ViewSeedPhrase } from '@pages/certify/view-seed-phrase';
import { WalletSearch } from '@pages/wallet/search';
import { GeneralSend } from '@pages/wallet/general-send';
import { SendConfirm } from '@pages/wallet/send-confirm';
import { Deposit } from '@pages/wallet/deposit';
import { TokenDetails } from '@pages/wallet/token-details';
import { ConnectedApps } from '@pages/certify/connected-apps';
import { ChangeNetwork } from '@pages/certify/change-network';
import { AddAccount } from '@pages/certify/add-account';
import { ImportAccount } from '@pages/certify/import-account';
import { ApproveEstablish } from '@pages/wallet/approve-establish';
import AddressBook from '@pages/certify/address-book';
import AddAddress from '@pages/certify/add-address';
import {
  ApproveConnectHardwareWalletConnect,
  ApproveConnectHardwareWalletFinish,
  ApproveConnectHardwareWalletInit,
  ApproveConnectHardwareWalletSelectAccount,
  ApproveHardwareWalletLedgerPassword,
  ApproveHardwareWalletLedgerAllSet,
} from '@pages/certify/approve-connect-hardware-wallet';
import { GoogleConnect, GoogleConnectFailed } from '@pages/certify/google-login/connect';
import { SendConfirmReject } from '@pages/wallet/send-confirm-reject';
import { ApproveSign } from '@pages/wallet/approve-sign';
import { SecurityPrivacy } from '@pages/certify/security-privacy';
import { AboutAdena } from '@pages/certify/about-adena';
import { RevealPasswoardPhrase } from '@pages/certify/reveal-password-phrase';
import { RevealPrivatePhrase } from '@pages/certify/reveal-private-phrase';
import { ApproachPasswordPhrase } from '@pages/certify/approach-password-phrase';
import { ApproachPrivatePhrase } from '@pages/certify/approach-private-phrase';
import { RemoveAccount } from '@pages/certify/remove-account';
import { ResetWallet } from '@pages/certify/reset-wallet';
import { ErrorContainer } from '@layouts/error-container';
import { Background } from '@components/background';
import { useLoadAccounts } from '@hooks/use-load-accounts';
import LoadingMain from '@components/loading-screen/loading-main';
import { useResetRecoilState } from 'recoil';
import { WalletState } from '@states/index';
import { TabContainer } from '@layouts/tab-container';
import { ProgressMenu } from '@layouts/header/progress-menu';

export const CustomRouter = () => {
  const { loadAccounts, accounts } = useLoadAccounts();
  const clearCurrentBalance = useResetRecoilState(WalletState.currentBalance);
  const clearBalances = useResetRecoilState(WalletState.balances);

  useEffect(() => {
    clearStates();
    loadAccounts();
  }, []);

  const clearStates = () => {
    clearCurrentBalance();
    clearBalances();
  };

  return (
    <Router>
      <Background>
        <Header />
        <Routes>
          <Route path={RoutePath.Home} element={<WalletCreate />} />
          <Route path={RoutePath.YourSeedPhrase} element={<YourSeedPhrase />} />
          <Route path={RoutePath.ImportPrivateKey} element={<ImportPrivateKey />} />
          <Route path={RoutePath.GenerateSeedPhrase} element={<GenerateSeedPhrase />} />
          <Route path={RoutePath.CreatePassword} element={<CreatePassword />} />
          <Route path={RoutePath.LaunchAdena} element={<LaunchAdena />} />
          <Route
            path={RoutePath.Wallet}
            element={
              <ErrorContainer>
                <WalletMain />
              </ErrorContainer>
            }
          />
          <Route path={RoutePath.EnterSeedPhrase} element={<EnterSeedPharse />} />
          <Route path={RoutePath.Login} element={<Login />} />
          <Route path={RoutePath.ForgotPassword} element={<ForgotPassword />} />
          <Route path={RoutePath.Nft} element={<Nft />} />
          <Route path={RoutePath.Staking} element={<Staking />} />
          <Route path={RoutePath.Explore} element={<Explore />} />
          <Route path={RoutePath.History} element={<History />} />
          <Route path={RoutePath.TransactionDetail} element={<TransactionDetail />} />
          <Route path={RoutePath.Setting} element={<Settings />} />
          <Route path={RoutePath.SettingChangePassword} element={<ChangePassword />} />
          <Route path={RoutePath.SettingExportAccount} element={<ExportAccount />} />
          <Route path={RoutePath.ViewPrivateKey} element={<ViewPrivateKey />} />
          <Route path={RoutePath.SettingSeedPhrase} element={<SeedPhrase />} />
          <Route path={RoutePath.ViewSeedPhrase} element={<ViewSeedPhrase />} />
          <Route path={RoutePath.WalletSearch} element={<WalletSearch />} />
          <Route path={RoutePath.GeneralSend} element={<GeneralSend />} />
          <Route path={RoutePath.SendConfirm} element={<SendConfirm />} />
          <Route path={RoutePath.SendLedgerReject} element={<SendConfirmReject />} />
          <Route path={RoutePath.Deposit} element={<Deposit />} />
          <Route path={RoutePath.TokenDetails} element={<TokenDetails />} />
          <Route path={RoutePath.ApproveTransaction} element={<ApproveTransactionMain />} />
          <Route path={RoutePath.ApproveSign} element={<ApproveSign />} />
          <Route path={RoutePath.ApproveLogin} element={<ApproveLogin />} />
          <Route path={RoutePath.ApproveEstablish} element={<ApproveEstablish />} />
          <Route path={RoutePath.ConnectedApps} element={<ConnectedApps />} />
          <Route path={RoutePath.ChangeNetwork} element={<ChangeNetwork />} />
          <Route path={RoutePath.AddAccount} element={<AddAccount />} />
          <Route path={RoutePath.ImportAccount} element={<ImportAccount />} />
          <Route path={RoutePath.AddressBook} element={<AddressBook />} />
          <Route path={RoutePath.AddAddress} element={<AddAddress />} />
          <Route path={RoutePath.AddAddress} element={<AddAddress />} />
          <Route
            path={RoutePath.ApproveHardwareWalletInit}
            element={
              <TabContainer header={<ProgressMenu showLogo progressLevel={'first'} hideArrow />}>
                <ApproveConnectHardwareWalletInit />
              </TabContainer>
            }
          />
          <Route
            path={RoutePath.ApproveHardwareWalletConnect}
            element={
              <TabContainer header={<ProgressMenu showLogo progressLevel={'first'} hideArrow />}>
                <ApproveConnectHardwareWalletConnect />
              </TabContainer>
            }
          />
          <Route
            path={RoutePath.ApproveHardwareWalletSelectAccount}
            element={
              <TabContainer
                header={
                  <ProgressMenu
                    showLogo
                    progressLevel={accounts && accounts?.length > 0 ? 'second' : 'first'}
                    hideArrow
                  />
                }
              >
                <ApproveConnectHardwareWalletSelectAccount />
              </TabContainer>
            }
          />
          <Route
            path={RoutePath.ApproveHardwareWalletLedgerPassword}
            element={
              <TabContainer header={<ProgressMenu showLogo progressLevel={'second'} hideArrow />}>
                <ApproveHardwareWalletLedgerPassword />
              </TabContainer>
            }
          />
          <Route
            path={RoutePath.ApproveHardwareWalletFinish}
            element={
              <TabContainer header={<ProgressMenu showLogo progressLevel={'third'} hideArrow />}>
                <ApproveConnectHardwareWalletFinish />
              </TabContainer>
            }
          />
          <Route
            path={RoutePath.ApproveHardwareWalletLedgerAllSet}
            element={
              <TabContainer header={<ProgressMenu showLogo progressLevel={'third'} hideArrow />}>
                <ApproveHardwareWalletLedgerAllSet />
              </TabContainer>
            }
          />
          <Route path={RoutePath.SecurityPrivacy} element={<SecurityPrivacy />} />
          <Route path={RoutePath.AboutAdena} element={<AboutAdena />} />
          <Route path={RoutePath.RevealPasswoardPhrase} element={<RevealPasswoardPhrase />} />
          <Route path={RoutePath.RevealPrivatePhrase} element={<RevealPrivatePhrase />} />
          <Route path={RoutePath.ApproachPasswordPhrase} element={<ApproachPasswordPhrase />} />
          <Route path={RoutePath.ApproachPrivatePhrase} element={<ApproachPrivatePhrase />} />
          <Route path={RoutePath.RemoveAccount} element={<RemoveAccount />} />
          <Route path={RoutePath.ResetWallet} element={<ResetWallet />} />
          <Route path={RoutePath.GoogleConnect} element={<GoogleConnect />} />
          <Route path={RoutePath.GoogleConnectFailed} element={<GoogleConnectFailed />} />
        </Routes>
        <Navigation />
      </Background>
      <LoadingMain />
    </Router>
  );
};

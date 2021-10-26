import { AppBackground } from 'components/AppBackground'
import { IXSBalanceModal } from 'components/Header/IXSBalanceModal'
import { SECURITY_TOKENS } from 'config'
import {
  MATIC_TGE_CHAINS,
  SUPPORTED_TGE_CHAINS,
  TGE_CHAINS_WITH_STAKING,
  TGE_CHAINS_WITH_SWAP,
} from 'constants/addresses'
import ApeModeQueryParamReader from 'hooks/useApeModeQueryParamReader'
import { useActiveWeb3React } from 'hooks/web3'
import React, { useMemo } from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'
import { useAccount } from 'state/user/hooks'
import styled from 'styled-components/macro'
import { ConnectToAppropriateNetwork } from 'theme'
import { routes } from 'utils/routes'
import GoogleAnalyticsReporter from '../components/analytics/GoogleAnalyticsReporter'
import ErrorBoundary from '../components/ErrorBoundary'
import Header from '../components/Header'
import Popups from '../components/Popups'
import Web3ReactManager from '../components/Web3ReactManager'
import { ApplicationModal } from '../state/application/actions'
import { useModalOpen } from '../state/application/hooks'
import DarkModeQueryParamReader from '../theme/DarkModeQueryParamReader'
import { RedirectDuplicateTokenIdsV2 } from './AddLiquidityV2/redirects'
import { AdminKyc } from './AdminKyc'
import { AdminLoginPage } from './AdminLogin'
import Custodian from './Custodian'
import { StakingTab } from './Farming/StakingTab'
import { VestingTab } from './Farming/VestingTab'
import PoolV2 from './Pool/v2'
import PoolFinder from './PoolFinder'
import RemoveLiquidity from './RemoveLiquidity'
import SecTokenDetails from './SecTokenDetails'
import Swap from './Swap'
import { RedirectPathToSwapOnly, RedirectPathToStaking, RedirectToSwap, RedirectPathToVesting } from './Swap/redirects'

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  position: relative;
`

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 120px;
  align-items: center;
  flex: 1;
  z-index: 1;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 16px;
    margin-top: 64px;
  `};
`

const ToggleableBody = styled(BodyWrapper)<{ isVisible?: boolean }>`
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
`

const Marginer = styled.div`
  margin-top: 5rem;
`

export default function App() {
  const isSettingsOpen = useModalOpen(ApplicationModal.SETTINGS)
  const { pathname } = useLocation()
  useAccount()
  const { chainId, account } = useActiveWeb3React()

  const isAdminKyc = pathname.includes('admin-kyc')
  const validChainId = useMemo(() => {
    if (!chainId) {
      return true
    }
    return chainId && Object.values(SUPPORTED_TGE_CHAINS).includes(chainId)
  }, [chainId])

  const visibleBody = useMemo(() => {
    return (!isSettingsOpen && (validChainId || isAdminKyc)) || !account
  }, [isAdminKyc, isSettingsOpen, validChainId, account])
  console.log({ chainId, account })
  return (
    <ErrorBoundary>
      <Route component={GoogleAnalyticsReporter} />
      <Route component={DarkModeQueryParamReader} />
      <Route component={ApeModeQueryParamReader} />
      <AppBackground />
      <Popups />
      <AppWrapper>
        {validChainId && !isAdminKyc && <Header />}
        {chainId && !validChainId && !isAdminKyc && account && <ConnectToAppropriateNetwork />}
        <ToggleableBody isVisible={visibleBody} {...(isAdminKyc && { style: { marginTop: 26 } })}>
          <IXSBalanceModal />
          <Web3ReactManager>
            <Switch>
              <Route exact strict path="/admin-kyc" component={AdminKyc} />
              <Route exact strict path="/admin-login" component={AdminLoginPage} />

              {chainId && !MATIC_TGE_CHAINS.includes(chainId) && (
                <Route exact strict path="/send" component={RedirectPathToSwapOnly} />
              )}
              {chainId && !MATIC_TGE_CHAINS.includes(chainId) && (
                <Route exact strict path="/swap/:outputCurrency" component={RedirectToSwap} />
              )}
              {chainId && !MATIC_TGE_CHAINS.includes(chainId) && <Route exact strict path="/swap" component={Swap} />}
              {chainId && !MATIC_TGE_CHAINS.includes(chainId) && (
                <Route exact strict path="/find" component={PoolFinder} />
              )}
              {chainId && !MATIC_TGE_CHAINS.includes(chainId) && <Route exact strict path="/pool" component={PoolV2} />}

              {chainId && !MATIC_TGE_CHAINS.includes(chainId) && (
                <Route exact strict path="/add/:currencyIdA?/:currencyIdB?" component={RedirectDuplicateTokenIdsV2} />
              )}

              {chainId && !MATIC_TGE_CHAINS.includes(chainId) && (
                <Route exact strict path="/remove/:currencyIdA/:currencyIdB" component={RemoveLiquidity} />
              )}

              {SECURITY_TOKENS && (
                <Route exact strict path="/security-tokens/:currencyId" component={SecTokenDetails} />
              )}
              {SECURITY_TOKENS && <Route exact strict path={routes.securityTokens()} component={Custodian} />}

              {chainId && TGE_CHAINS_WITH_STAKING.includes(chainId) && (
                <Route exact strict path={routes.staking} component={StakingTab} />
              )}
              <Route exact strict path={routes.vesting} component={VestingTab} />

              {chainId && TGE_CHAINS_WITH_SWAP.includes(chainId) && <Route component={RedirectPathToSwapOnly} />}
              {chainId &&
                [SUPPORTED_TGE_CHAINS.MAIN, SUPPORTED_TGE_CHAINS.MUMBAI, SUPPORTED_TGE_CHAINS.MATIC].includes(
                  chainId
                ) && <Route component={RedirectPathToStaking} />}
            </Switch>
          </Web3ReactManager>
          <Marginer />
        </ToggleableBody>
      </AppWrapper>
    </ErrorBoundary>
  )
}

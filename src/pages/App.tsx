import { AppBackground } from 'components/AppBackground'
import { SECURITY_TOKENS } from 'config'
import ApeModeQueryParamReader from 'hooks/useApeModeQueryParamReader'
import React from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'
import { useAccount } from 'state/user/hooks'
import styled from 'styled-components/macro'
import { routes } from 'utils/routes'
import GoogleAnalyticsReporter from '../components/analytics/GoogleAnalyticsReporter'
import ErrorBoundary from '../components/ErrorBoundary'
import Header from '../components/Header'
import Polling from '../components/Header/Polling'
import Popups from '../components/Popups'
import Web3ReactManager from '../components/Web3ReactManager'
import { ApplicationModal } from '../state/application/actions'
import { useModalOpen } from '../state/application/hooks'
import DarkModeQueryParamReader from '../theme/DarkModeQueryParamReader'
import { RedirectDuplicateTokenIdsV2 } from './AddLiquidityV2/redirects'
import Custodian from './Custodian'
import PoolV2 from './Pool/v2'
import PoolFinder from './PoolFinder'
import RemoveLiquidity from './RemoveLiquidity'
import SecTokenDetails from './SecTokenDetails'
import Swap from './Swap'
import { RedirectPathToSwapOnly, RedirectToSwap } from './Swap/redirects'
import { AdminLoginPage } from './AdminLogin'
import { AdminKyc } from './AdminKyc'

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
    margin-top: 9rem;
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

  const isAdminKyc = pathname.includes('admin-kyc')

  return (
    <ErrorBoundary>
      <Route component={GoogleAnalyticsReporter} />
      <Route component={DarkModeQueryParamReader} />
      <Route component={ApeModeQueryParamReader} />
      <AppBackground />
      <AppWrapper>
        {!isAdminKyc && <Header />}
        <ToggleableBody isVisible={!isSettingsOpen} {...(isAdminKyc && { style: { marginTop: 26 } })}>
          <Popups />
          <Polling />
          <Web3ReactManager>
            <Switch>
              <Route exact strict path="/admin-kyc" component={AdminKyc} />
              <Route exact strict path="/admin-login" component={AdminLoginPage} />
              <Route exact strict path="/send" component={RedirectPathToSwapOnly} />
              <Route exact strict path="/swap/:outputCurrency" component={RedirectToSwap} />
              <Route exact strict path="/swap" component={Swap} />

              <Route exact strict path="/find" component={PoolFinder} />
              <Route exact strict path="/pool" component={PoolV2} />

              <Route exact strict path="/add/:currencyIdA?/:currencyIdB?" component={RedirectDuplicateTokenIdsV2} />

              <Route exact strict path="/remove/:currencyIdA/:currencyIdB" component={RemoveLiquidity} />
              {SECURITY_TOKENS && (
                <Route exact strict path="/security-tokens/:currencyId" component={SecTokenDetails} />
              )}
              {SECURITY_TOKENS && <Route exact strict path={routes.securityTokens()} component={Custodian} />}
              <Route component={RedirectPathToSwapOnly} />
            </Switch>
          </Web3ReactManager>
          <Marginer />
        </ToggleableBody>
      </AppWrapper>
    </ErrorBoundary>
  )
}

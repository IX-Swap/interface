import React, { Suspense, useCallback, useEffect, useMemo, useState } from 'react'
import { Redirect, RouteComponentProps, Route, Switch, useLocation } from 'react-router-dom'
import styled from 'styled-components/macro'
import { useDispatch } from 'react-redux'

import { ENV_SUPPORTED_TGE_CHAINS } from 'constants/addresses'

import { useActiveWeb3React } from 'hooks/web3'
import ApeModeQueryParamReader from 'hooks/useApeModeQueryParamReader'

import { KYCStatuses } from 'pages/KYC/enum'

import { isUserWhitelisted } from 'utils/isUserWhitelisted'

import Header from 'components/Header'
import Popups from 'components/Popups'
import ErrorBoundary from 'components/ErrorBoundary'
import GoogleAnalyticsReporter from 'components/analytics/GoogleAnalyticsReporter'

import WhiteLabelFooter from 'components/WhiteLabelFooter'
import { LoadingIndicator } from 'components/LoadingIndicator'
import { AppBackground } from 'components/AppBackground'
import { IXSBalanceModal } from 'components/Header/IXSBalanceModal'

import DarkModeQueryParamReader from 'theme/DarkModeQueryParamReader'

import { useAuthState } from 'state/auth/hooks'
import { useHideHeader, useModalOpen } from 'state/application/hooks'
import { useAccount, useGetMe, useRawRole, useRole } from 'state/user/hooks'
import { useGetMyKyc, useKYCState } from 'state/kyc/hooks'
import { useGetWhitelabelConfig, useWhitelabelState } from 'state/whitelabel/hooks'

import { ApplicationModal, clearStore } from 'state/application/actions'

import { routeConfigs, RouteMapEntry } from './AppRoutes'
import { routes } from 'utils/routes'
import { ROLES } from 'constants/roles'
import { RestrictedModal } from './RestrictedModal'
import axios from 'axios'
import { ip } from 'services/apiUrls'
import { metaMask } from 'connectors/metaMask'
import { walletConnectV2 } from 'connectors/walletConnectV2'
/* eslint-disable react/display-name */
import { Footer as DefaultFooter } from './Launchpad/Footer'
import { CustomHeaders } from 'components/CustomHeaders'
import { useWalletState } from 'state/wallet/hooks'
import { coinbaseWallet } from 'connectors/coinbaseWallet'
import { blockedCountries } from 'constants/countriesList'
import { SupportedChainId } from 'constants/chains'

const chains = ENV_SUPPORTED_TGE_CHAINS || [42]
const lbpAdminRoutes = [routes.lbpCreate, routes.lbpEdit, routes.lbpDashboard, routes.adminDetails]

const initSafary = () => {
  const script = document.createElement('script')
  script.src = 'https://tag.safary.club/stag-0.1.5.js'
  script.defer = true
  script.setAttribute('data-name', 'safary-sdk')
  script.setAttribute('data-product-id', 'prd_z2suvagAL5')
  script.integrity = 'sha256-sFvG3ANXkfEJBbfj+oozHwPgzQSoq4uDCv3xrLblnmM='
  script.crossOrigin = 'anonymous'
  document.head.appendChild(script)
}

export default function App() {
  const getMe = useGetMe()
  const { isAdmin } = useRole()
  const { config: whiteLabelConfig } = useWhitelabelState()
  const isSettingsOpen = useModalOpen(ApplicationModal.SETTINGS)
  const { pathname } = useLocation()
  const { chainId, account } = useActiveWeb3React()
  const getMyKyc = useGetMyKyc()
  const { token } = useAuthState()
  const dispatch = useDispatch()
  const getWitelabelConfig = useGetWhitelabelConfig()
  const { config } = useWhitelabelState()
  const hideHeader = useHideHeader()
  const { kyc } = useKYCState()
  const { isConnected, walletName } = useWalletState()

  const isWhitelisted = isUserWhitelisted({ account, chainId })
  const [countryCode, setCountryCode] = useState()

  const isIxSwap = whiteLabelConfig?.isIxSwap ?? false
  const routeFinalConfig = isAdmin ? routeConfigs : routeConfigs.filter((route) => !lbpAdminRoutes.includes(route.path))
  useEffect(() => {
    const getCountryCode = async () => {
      const response = await axios.get(ip.getIPAddress)
      setCountryCode(response?.data?.countryCode)
    }
    getCountryCode()
  }, [])

  useEffect(() => {
    initSafary()
  }, [])

  const canAccessKycForm = (kycType: string) => {
    if (!account) return false
    if (!kyc) return true

    if ([KYCStatuses.REJECTED, KYCStatuses.APPROVED, KYCStatuses.PENDING].includes(kyc?.status)) return false

    const userKyc = kyc?.corporateKycId ? 'corporate' : 'individual'

    if (KYCStatuses.CHANGES_REQUESTED) {
      return kycType === userKyc
    }

    return true
  }

  const isAllowed = useCallback(
    (route: RouteMapEntry): boolean => {
      if (!config) {
        return false
      }

      if (!config.pages || config.pages.length === 0) {
        return true
      }

      return config.pages.includes(route.path)
    },
    [config]
  )

  const defaultPage = useMemo(() => {
    const defaultPath = [routes.launchpad, routes.issuance].includes(pathname) ? routes.launchpad : routes.kyc
    if (isAllowed({ path: routes.kyc }) && (kyc?.status !== KYCStatuses.APPROVED || !account)) {
      return defaultPath
    }
    if (
      isAllowed({ path: routes.securityTokens('tokens') }) &&
      kyc?.status === KYCStatuses.APPROVED &&
      chainId &&
      chains.includes(chainId) &&
      isWhitelisted
    ) {
      return routes.securityTokens('tokens')
    }

    return (config?.pages ?? []).length > 0 ? config?.pages[0] : defaultPath
  }, [kyc, account, chainId, isWhitelisted, chains])

  useAccount()

  useEffect(() => {
    getMyKyc()
  }, [account, token, getMyKyc])

  const clearLocaleStorage = () => {
    const cleared = localStorage.getItem('clearedLS-28-04-22')
    if (!cleared) {
      dispatch(clearStore())
      localStorage.clear()
      localStorage.setItem('clearedLS-28-04-22', 'true')
    }
  }

  useEffect(() => {
    if (token) {
      getMe()
    }
  }, [token, getMe])

  useEffect(() => {
    clearLocaleStorage()

    if (isConnected && walletName === 'MetaMask') {
      // connect eagerly for metamask
      void metaMask.connectEagerly().catch(() => {
        console.debug('Failed to connect eagerly to metamask')
      })
    }

    if (isConnected && walletName === 'WalletConnect') {
      // connect eagerly for walletConnectV2
      walletConnectV2.connectEagerly().catch((error) => {
        console.debug('Failed to connect eagerly to walletconnect', error)
      })
    }

    if (isConnected && walletName === 'Coinbase Wallet') {
      const defaultChain = ENV_SUPPORTED_TGE_CHAINS?.[0] || SupportedChainId.AMOY

      void coinbaseWallet.connectEagerly().catch((error) => {
        coinbaseWallet.activate(defaultChain).catch((errorConnect) => {
          console.debug('Failed to connect eagerly to coinbase wallet', errorConnect)
        })
        console.debug('Failed to connect eagerly to coinbase wallet', error)
      })
    }
  }, [isConnected, walletName])

  useEffect(() => {
    getWitelabelConfig()
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  const isAdminKyc = pathname.includes('admin')
  const isWhiteBackground =
    pathname === routes.launchpad ||
    pathname === routes.payoutHistory ||
    pathname === routes.payoutEvent ||
    pathname === routes.manageTokens ||
    pathname === routes.createPayoutEvent ||
    pathname === routes.createAirdropEvent ||
    pathname.includes('security-tokens')
  const visibleBody = useMemo(() => {
    return !isSettingsOpen || !account || kyc !== null
  }, [isAdminKyc, isSettingsOpen, account])

  const userRole = useRawRole();

  const routeGenerator = useCallback(
    (route: RouteMapEntry) => {
      const roleGuard =
        route.conditions?.rolesSupported !== undefined && !route.conditions?.rolesSupported.includes(userRole)
      const guards = [
        !isAllowed(route),
        route.conditions?.isWhitelisted !== undefined && !isWhitelisted,
        route.conditions?.chainId !== undefined && chainId !== route.conditions.chainId,
        route.conditions?.chainIsSupported !== undefined && (!chainId || !chains.includes(chainId)),
        route.conditions?.kycFormAccess !== undefined && !canAccessKycForm(route.conditions.kycFormAccess),
        route.conditions?.isKycApproved === true && kyc?.status !== KYCStatuses.APPROVED && ![ROLES.ADMIN, ROLES.MASTER_TENANT].includes(userRole),
        roleGuard,
      ]

      if (guards.some((guard) => guard === true)) {
        if (roleGuard) {
          return (
            <Route
              component={(props: RouteComponentProps) => (
                <Redirect to={{ ...props, pathname: !isAdmin ? routes.kyc : defaultPage }} />
              )}
            />
          )
        }

        return null
      }

      return <Route exact strict path={route.path} component={route.component} render={route.render} />
    },
    [isAllowed, canAccessKycForm, chainId, isWhitelisted, userRole, account]
  )

  if (!config) {
    return <LoadingIndicator isLoading />
  }

  return (
    <>
      <CustomHeaders />
      {/* {isMobile && !window.ethereum && <ConnectWalletModal />} */}
      {countryCode && blockedCountries.includes(countryCode) && <RestrictedModal />}
      <ErrorBoundary>
        <Route component={GoogleAnalyticsReporter} />
        <Route component={DarkModeQueryParamReader} />
        <Route component={ApeModeQueryParamReader} />
        <AppBackground />
        <Popups />
        <AppWrapper isLaunchpad={isWhiteBackground}>
          {!isAdminKyc && !hideHeader && <Header />}
          <ToggleableBody
            isVisible={visibleBody}
            {...(isAdminKyc && { style: { marginTop: 26 } })}
            hideHeader={hideHeader}
          >
            <IXSBalanceModal />
            {/* <Web3ReactManager> */}
            <Suspense
              fallback={
                <>
                  <LoadingIndicator isLoading />
                </>
              }
            >
              <Switch>
                {routeFinalConfig.map(routeGenerator).filter((route) => !!route)}

                <Route component={() => <Redirect to={defaultPage ? defaultPage : routes.kyc} />} />
              </Switch>
            </Suspense>
            {/* </Web3ReactManager> */}
          </ToggleableBody>
          {!hideHeader ? <>{isIxSwap ? <DefaultFooter /> : <WhiteLabelFooter />}</> : null}
        </AppWrapper>
      </ErrorBoundary>
    </>
  )
}

const AppWrapper = styled.div<{ isLaunchpad: boolean }>`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  position: relative;
  background: ${({ isLaunchpad }) => (isLaunchpad ? '#ffffff' : 'initial')};
`

const BodyWrapper = styled.div<{ hideHeader?: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  ${(props) => !props.hideHeader && 'margin-top: 120px;'}
  align-items: center;
  flex: 1;
  z-index: 1;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 0 12px;
    margin-top: 0;
  `};
`

const ToggleableBody = styled(BodyWrapper)<{ isVisible?: boolean; hideHeader?: boolean }>`
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
  ${({ theme }) => theme.mediaWidth.upToSmall`
    min-height: calc(100vh - 64px);
    // width: 100%;
    // padding: 0px 20px;
  `}
`

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
import Web3ReactManager from 'components/Web3ReactManager'
import GoogleAnalyticsReporter from 'components/analytics/GoogleAnalyticsReporter'

// import { Footer } from 'components/Footer'
import { LoadingIndicator } from 'components/LoadingIndicator'
import { AppBackground } from 'components/AppBackground'
import { IXSBalanceModal } from 'components/Header/IXSBalanceModal'

import DarkModeQueryParamReader from 'theme/DarkModeQueryParamReader'

import { useAuthState } from 'state/auth/hooks'
import { useHideHeader, useModalOpen } from 'state/application/hooks'
import { useAccount, useGetMe, useRawRole } from 'state/user/hooks'
import { useGetMyKyc, useKYCState } from 'state/kyc/hooks'
import { useGetWihitelabelConfig, useWhitelabelState } from 'state/whitelabel/hooks'

import { ApplicationModal, clearStore } from 'state/application/actions'

import { routeConfigs, RouteMapEntry } from './AppRoutes'
import { routes } from 'utils/routes'
import { ROLES } from 'constants/roles'
import { RestrictedModal } from './RestrictedModal'
import axios from 'axios'
import { ip } from 'services/apiUrls'
import { isMobile } from 'react-device-detect'
import { ConnectWalletModal } from './Connect Wallet Modal'
import { Footer } from './Launchpad/Footer'

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  position: relative;
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
    padding: 12px;
    margin-top: 64px;
  `};
`

const ToggleableBody = styled(BodyWrapper)<{ isVisible?: boolean; hideHeader?: boolean }>`
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
  min-height: calc(100vh - 120px);

  ${(props) => !props.hideHeader && 'padding-bottom: 48px;'}

  ${({ theme }) => theme.mediaWidth.upToSmall`
    min-height: calc(100vh - 64px);
  `}
`

const chains = ENV_SUPPORTED_TGE_CHAINS || [42]

export default function App() {
  const getMe = useGetMe()

  const isSettingsOpen = useModalOpen(ApplicationModal.SETTINGS)
  const { pathname } = useLocation()
  const { chainId, account } = useActiveWeb3React()
  const getMyKyc = useGetMyKyc()
  const { token } = useAuthState()
  const dispatch = useDispatch()
  const getWitelabelConfig = useGetWihitelabelConfig()
  const { config } = useWhitelabelState()
  const hideHeader = useHideHeader()
  const { kyc } = useKYCState()
  const isWhitelisted = isUserWhitelisted({ account, chainId })
  const [countryCode, setCountryCode] = useState()
  useEffect(() => {
    const getCountryCode = async () => {
      const response = await axios.get(ip.getIPAddress)
      setCountryCode(response?.data?.countryCode)
    }
    getCountryCode()
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
  }, [])

  useEffect(() => {
    if (window.location.host.split('.')[1] !== 'ixswap') {
      getWitelabelConfig()
    }
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  const isAdminKyc = pathname.includes('admin')
  const visibleBody = useMemo(() => {
    return !isSettingsOpen || !account || kyc !== null
  }, [isAdminKyc, isSettingsOpen, account])

  const userRole = useRawRole()

  const routeGenerator = useCallback(
    (route: RouteMapEntry) => {
      const roleGuard =
        route.conditions?.rolesSupported !== undefined &&
        !(route.conditions?.rolesSupported.includes(userRole) && account)
      const guards = [
        !isAllowed(route),
        route.conditions?.isWhitelisted !== undefined && !isWhitelisted,
        route.conditions?.chainId !== undefined && chainId !== route.conditions.chainId,
        route.conditions?.chainIsSupported !== undefined && (!chainId || !chains.includes(chainId)),
        route.conditions?.kycFormAccess !== undefined && !canAccessKycForm(route.conditions.kycFormAccess),
        route.conditions?.isKycApproved === true && kyc?.status !== KYCStatuses.APPROVED && userRole !== ROLES.ADMIN,
        roleGuard,
      ]

      if (guards.some((guard) => guard === true)) {
        if (roleGuard) {
          return (
            <Route component={(props: RouteComponentProps) => <Redirect to={{ ...props, pathname: defaultPage }} />} />
          )
        }
        return null
      }

      return <Route exact strict path={route.path} component={route.component} render={route.render} />
    },
    [isAllowed, canAccessKycForm, chainId, isWhitelisted, userRole, account]
  )

  const useRedirect = account ? kyc !== null : true
  if (!config) {
    return <LoadingIndicator isLoading />
  }

  return (
    <>
      {isMobile && !window.ethereum && <ConnectWalletModal />}
      {/* {countryCode === 'SG' && <RestrictedModal />} */}
      <ErrorBoundary>
        <Route component={GoogleAnalyticsReporter} />
        <Route component={DarkModeQueryParamReader} />
        <Route component={ApeModeQueryParamReader} />
        <AppBackground />
        <Popups />
        <AppWrapper>
          {!isAdminKyc && !hideHeader && <Header />}
          <ToggleableBody
            isVisible={visibleBody}
            {...(isAdminKyc && { style: { marginTop: 26 } })}
            hideHeader={hideHeader}
          >
            <IXSBalanceModal />
            <Web3ReactManager>
              <Suspense
                fallback={
                  <>
                    <LoadingIndicator isLoading />
                  </>
                }
              >
                <Switch>
                  {routeConfigs.map(routeGenerator).filter((route) => !!route)}

                  {useRedirect && (
                    <Route
                      component={(props: RouteComponentProps) => <Redirect to={{ ...props, pathname: defaultPage }} />}
                    />
                  )}
                </Switch>
              </Suspense>
            </Web3ReactManager>
          </ToggleableBody>
          {!hideHeader && <Footer />}
        </AppWrapper>
      </ErrorBoundary>
    </>
  )
}

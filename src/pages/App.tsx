import React, { Suspense, useCallback, useEffect, useMemo } from 'react'
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

import { Footer } from 'components/Footer'
import { LoadingIndicator } from 'components/LoadingIndicator'
import { AppBackground } from 'components/AppBackground'
import { IXSBalanceModal } from 'components/Header/IXSBalanceModal'

import DarkModeQueryParamReader from 'theme/DarkModeQueryParamReader'

import { useAuthState } from 'state/auth/hooks'
import { useModalOpen } from 'state/application/hooks'
import { useAccount, useGetMe } from 'state/user/hooks'
import { useGetMyKyc, useKYCState } from 'state/kyc/hooks'
import { useGetWihitelabelConfig, useWhitelabelState } from 'state/whitelabel/hooks'
import { CustomHeaders } from 'components/CustomHeaders'

import { ApplicationModal, clearStore } from 'state/application/actions'

import { routeConfigs, RouteMapEntry } from './AppRoutes'

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
  min-height: calc(100vh - 120px);
  padding-bottom: 48px;
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

  const { kyc } = useKYCState()

  const isWhitelisted = isUserWhitelisted({ account, chainId })

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
  
  const isAllowed = useCallback((route: RouteMapEntry): boolean => {
    if (!config) {
      return false
    }

    if (config.pages.length === 0) {
      return true
    }

    return config.pages.includes(route.path)
  }, [config])
  
  const defaultPage = useMemo(() => {
    if (isAllowed({ path: '/kyc' }) && (kyc?.status !== KYCStatuses.APPROVED || !account)) {
      return '/kyc'
    }
    if (isAllowed({ path: '/security-tokens'}) && (kyc?.status === KYCStatuses.APPROVED && chainId && chains.includes(chainId) && isWhitelisted)) {
      return '/security-tokens'
    }

    return (config?.pages ?? []).length > 0 ? config?.pages[0] : '/kyc'
  }, [kyc, account, chainId, isWhitelisted, chains])

  useAccount()

  useEffect(() => {
    if (account && token) {
      getMyKyc()
    }
  }, [account, token])

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
    getWitelabelConfig()
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  const isAdminKyc = pathname.includes('admin')
  const visibleBody = useMemo(() => {
    return !isSettingsOpen || !account || kyc !== null
  }, [isAdminKyc, isSettingsOpen, account])


  const routeGenerator = useCallback((route: RouteMapEntry) => {
    const guards = [
      !isAllowed(route),
      route.conditions?.isWhitelisted !== undefined && !isWhitelisted,
      route.conditions?.chainId !== undefined && chainId !== route.conditions.chainId,
      route.conditions?.chainIsSupported !== undefined && (!chainId || !chains.includes(chainId)),
      route.conditions?.kycFormAccess !== undefined && !canAccessKycForm(route.conditions.kycFormAccess)
    ];

    if (guards.some(guard => guard === true)) {
      return null
    }

    return <Route exact strict path={route.path} component={route.component} render={route.render} />
  }, [isAllowed, canAccessKycForm, chainId, isWhitelisted])

  const useRedirect = account ? kyc !== null : true

  if (!config) {
    return <LoadingIndicator isLoading />
  }

  return (
    <ErrorBoundary>
      <Route component={GoogleAnalyticsReporter} />
      <Route component={DarkModeQueryParamReader} />
      <Route component={ApeModeQueryParamReader} />
      <AppBackground />
      <Popups />
      <CustomHeaders />
      <AppWrapper>
        {!isAdminKyc && <Header />}
        <ToggleableBody isVisible={visibleBody} {...(isAdminKyc && { style: { marginTop: 26 } })}>
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
                {routeConfigs.map(routeGenerator).filter(route => !!route)}

                {useRedirect && (
                  <Route
                    component={(props: RouteComponentProps) => <Redirect to={{ ...props, pathname: defaultPage }} />}
                  />
                )}
              </Switch>
            </Suspense>
          </Web3ReactManager>
        </ToggleableBody>
        <Footer />
      </AppWrapper>
    </ErrorBoundary>
  )
}

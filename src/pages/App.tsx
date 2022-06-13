import React, { lazy, Suspense, useEffect, useMemo } from 'react'
import { Redirect, RouteComponentProps, Route, Switch, useLocation } from 'react-router-dom'
import styled from 'styled-components/macro'
import { useDispatch } from 'react-redux'

import { AppBackground } from 'components/AppBackground'
import { IXSBalanceModal } from 'components/Header/IXSBalanceModal'
import PlaygroundModal from 'components/PlaygroundModal'
import { ENV_SUPPORTED_TGE_CHAINS } from 'constants/addresses'
import ApeModeQueryParamReader from 'hooks/useApeModeQueryParamReader'
import { useActiveWeb3React } from 'hooks/web3'
import { useAccount, useGetMe } from 'state/user/hooks'
import { routes } from 'utils/routes'
import { SupportedChainId } from 'constants/chains'
import { useGetMyKyc, useKYCState } from 'state/kyc/hooks'
import { KYCStatuses } from 'pages/KYC/enum'
import { useAuthState } from 'state/auth/hooks'
import { LoadingIndicator } from 'components/LoadingIndicator'
import { isUserWhitelisted } from 'utils/isUserWhitelisted'

import GoogleAnalyticsReporter from '../components/analytics/GoogleAnalyticsReporter'
import ErrorBoundary from '../components/ErrorBoundary'
import Header from '../components/Header'
import Popups from '../components/Popups'
import Web3ReactManager from '../components/Web3ReactManager'
import { ApplicationModal, clearStore } from '../state/application/actions'
import { useModalOpen } from '../state/application/hooks'
import DarkModeQueryParamReader from '../theme/DarkModeQueryParamReader'
import { RedirectDuplicateTokenIdsV2 } from './AddLiquidityV2/redirects'
import { StakingTab } from './Farming/StakingTab'
import { VestingTab } from './Farming/VestingTab'
import Faucet from './Faucet'
import PoolFinder from './PoolFinder'
import { RedirectPathToSwapOnly, RedirectToSwap } from './Swap/redirects'
import { Footer } from '../components/Footer'

const Admin = lazy(() => import('./Admin'))
const TokenManager = lazy(() => import('./TokenManager'))

const KYC = lazy(() => import('./KYC'))
const IndividualKYC = lazy(() => import('./KYC/IndividualKycForm'))
const CreatePayoutEvent = lazy(() => import('./CreatePayoutEvent'))
const CorporateKYC = lazy(() => import('./KYC/CorporateKycForm'))
// const Custodian = lazy(() => import('./Custodian'))
const CustodianV2 = lazy(() => import('./CustodianV2'))
const CreateNFT = lazy(() => import('./CreateNFT'))
const ListNFT = lazy(() => import('./ListNFT'))
const RemoveLiquidity = lazy(() => import('./RemoveLiquidity'))
const SecTokenDetails = lazy(() => import('./SecTokenDetails'))
const Swap = lazy(() => import('./Swap'))
const PoolV2 = lazy(() => import('./Pool/v2'))
const NftImport = lazy(() => import('./NftImport'))
const NFTCollections = lazy(() => import('./NFTCollections'))
const NFTCollection = lazy(() => import('./NFTCollection'))
const UpdateCollection = lazy(() => import('./UpdateCollection'))
const CreateCollection = lazy(() => import('./CreateCollection'))
const NftAssetPage = lazy(() => import('./NFTAsset'))
const PayoutItem = lazy(() => import('./PayoutItem'))

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

const ToggleableBody = styled(BodyWrapper) <{ isVisible?: boolean }>`
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
  min-height: calc(100vh - 120px);
  padding-bottom: 48px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    min-height: calc(100vh - 64px);
  `}
`

export default function App() {
  const getMe = useGetMe()

  const isSettingsOpen = useModalOpen(ApplicationModal.SETTINGS)
  const { pathname } = useLocation()
  const { chainId, account } = useActiveWeb3React()
  const getMyKyc = useGetMyKyc()
  const { token } = useAuthState()
  const dispatch = useDispatch()

  const { kyc } = useKYCState()

  const chains = useMemo(() => ENV_SUPPORTED_TGE_CHAINS || [42], [])
  const isWhitelisted = isUserWhitelisted({ account, chainId })

  const defaultPage = useMemo(() => {
    if (kyc?.status !== KYCStatuses.APPROVED || !account) {
      return '/kyc'
    }
    if (kyc?.status === KYCStatuses.APPROVED && chainId && chains.includes(chainId) && isWhitelisted) {
      return '/security-tokens'
    }

    return '/kyc'
  }, [kyc, account, chainId, isWhitelisted, chains])

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
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  const isAdminKyc = pathname.includes('admin')
  const visibleBody = useMemo(() => {
    return !isSettingsOpen || !account || kyc !== null
  }, [isAdminKyc, isSettingsOpen, account])

  const useRedirect = account ? kyc !== null : true

  return (
    <ErrorBoundary>
      <Route component={GoogleAnalyticsReporter} />
      <Route component={DarkModeQueryParamReader} />
      <Route component={ApeModeQueryParamReader} />
      <AppBackground />
      <Popups />
      <AppWrapper>
        <PlaygroundModal />
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
                <Route exact strict path="/admin" render={() => <Redirect to="/admin/accreditation" />} />
                <Route exact strict path="/admin/:tab/:id?" component={Admin} />

                <Route exact strict path="/token-manager" render={() => <Redirect to="/token-manager/my-tokens" />} />
                <Route exact strict path="/token-manager/:tab/:id?" component={TokenManager} />

                {chainId && chainId === SupportedChainId.KOVAN && isWhitelisted && (
                  <Route exact strict path={routes.nftCreate} component={CreateNFT} />
                )}
                {chainId && chainId === SupportedChainId.KOVAN && isWhitelisted && (
                  <Route exact strict path={routes.nftList} component={ListNFT} />
                )}
                {chainId && chainId === SupportedChainId.KOVAN && isWhitelisted && (
                  <Route exact strict path={routes.nftCollections} component={NFTCollections} />
                )}
                {chainId && chainId === SupportedChainId.KOVAN && isWhitelisted && (
                  <Route exact strict path={routes.nftCollectionCreate} component={CreateCollection} />
                )}
                {chainId && chainId === SupportedChainId.KOVAN && isWhitelisted && (
                  <Route exact strict path={routes.nftEditCollectionPath} component={UpdateCollection} />
                )}
                {chainId && chainId === SupportedChainId.KOVAN && isWhitelisted && (
                  <Route exact strict path={routes.nftCollectionImport} component={NftImport} />
                )}
                {chainId && chainId === SupportedChainId.KOVAN && isWhitelisted && (
                  <Route exact strict path={routes.nftViewCollectionPath} component={NFTCollection} />
                )}
                {chainId && chainId === SupportedChainId.KOVAN && isWhitelisted && (
                  <Route exact strict path={routes.nftItemPath} component={NftAssetPage} />
                )}
                {isWhitelisted && <Route exact strict path={routes.kyc} component={KYC} />}
                {isWhitelisted && <Route exact strict path={routes.createPayoutEvent} component={CreatePayoutEvent} />}
                {isWhitelisted && <Route exact strict path={routes.payoutItem} component={PayoutItem} />}
                {isWhitelisted && canAccessKycForm('individual') && (
                  <Route exact strict path={routes.kycIndividual} component={IndividualKYC} />
                )}
                {isWhitelisted && canAccessKycForm('corporate') && (
                  <Route exact strict path={routes.kycCorporate} component={CorporateKYC} />
                )}

                {chainId && chains.includes(chainId) && isWhitelisted && (
                  <Route exact strict path="/send" component={RedirectPathToSwapOnly} />
                )}
                {chainId && chains.includes(chainId) && isWhitelisted && (
                  <Route exact strict path="/swap/:outputCurrency" component={RedirectToSwap} />
                )}
                {chainId && chains.includes(chainId) && isWhitelisted && (
                  <Route exact strict path="/swap" component={Swap} />
                )}
                {chainId && chains.includes(chainId) && isWhitelisted && (
                  <Route exact strict path="/find" component={PoolFinder} />
                )}
                {chainId && chains.includes(chainId) && isWhitelisted && (
                  <Route exact strict path="/pool" component={PoolV2} />
                )}

                {chainId && chains.includes(chainId) && isWhitelisted && (
                  <Route exact strict path="/add/:currencyIdA?/:currencyIdB?" component={RedirectDuplicateTokenIdsV2} />
                )}

                {chainId && chains.includes(chainId) && isWhitelisted && (
                  <Route exact strict path="/remove/:currencyIdA/:currencyIdB" component={RemoveLiquidity} />
                )}

                {chainId && chainId === SupportedChainId.KOVAN && isWhitelisted && (
                  <Route exact strict path={routes.faucet} component={Faucet} />
                )}

                {chainId && chains.includes(chainId) && isWhitelisted && (
                  <Route exact strict path="/security-tokens/:currencyId" component={SecTokenDetails} />
                )}
                {chainId && chains.includes(chainId) && isWhitelisted && (
                  <Route exact strict path={routes.securityTokens()} component={CustodianV2} />
                )}

                <Route exact strict path={routes.staking} component={StakingTab} />
                <Route exact strict path={routes.vesting} component={VestingTab} />

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

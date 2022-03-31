import React, { lazy, Suspense, useEffect, useMemo } from 'react'
import { Redirect, Route, Switch, useLocation } from 'react-router-dom'
import styled from 'styled-components/macro'

import { AppBackground } from 'components/AppBackground'
import { IXSBalanceModal } from 'components/Header/IXSBalanceModal'
import PlaygroundModal from 'components/PlaygroundModal'
import {
  MATIC_TGE_CHAINS,
  SUPPORTED_TGE_CHAINS,
  TGE_CHAINS_WITH_SWAP,
  TGE_CHAINS_WITH_KYC,
  ENV_SUPPORTED_TGE_CHAINS,
} from 'constants/addresses'
import ApeModeQueryParamReader from 'hooks/useApeModeQueryParamReader'
import { useActiveWeb3React } from 'hooks/web3'
import { useAccount } from 'state/user/hooks'
import { routes } from 'utils/routes'
import { SupportedChainId } from 'constants/chains'

import GoogleAnalyticsReporter from '../components/analytics/GoogleAnalyticsReporter'
import ErrorBoundary from '../components/ErrorBoundary'
import Header from '../components/Header'
import Popups from '../components/Popups'
import Web3ReactManager from '../components/Web3ReactManager'
import { ApplicationModal } from '../state/application/actions'
import { useModalOpen } from '../state/application/hooks'
import DarkModeQueryParamReader from '../theme/DarkModeQueryParamReader'
import { RedirectDuplicateTokenIdsV2 } from './AddLiquidityV2/redirects'
import { StakingTab } from './Farming/StakingTab'
import { VestingTab } from './Farming/VestingTab'
import Faucet from './Faucet'
import PoolFinder from './PoolFinder'
import { RedirectPathToKyc, RedirectPathToSwapOnly, RedirectToSwap } from './Swap/redirects'
import { Footer } from '../components/Footer'
import { isUserWhitelisted } from 'utils/isUserWhitelisted'

const Admin = lazy(() => import('./Admin'))

const KYC = lazy(() => import('./KYC'))
const IndividualKYC = lazy(() => import('./KYC/IndividualKycForm'))
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

export default function App() {
  const isSettingsOpen = useModalOpen(ApplicationModal.SETTINGS)
  const { pathname } = useLocation()
  const { chainId, account } = useActiveWeb3React()

  useAccount()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  const isAdminKyc = pathname.includes('admin')

  const visibleBody = useMemo(() => {
    return !isSettingsOpen || !account
  }, [isAdminKyc, isSettingsOpen, account])

  const isWhitelisted = isUserWhitelisted({ account, chainId })

  const chains = ENV_SUPPORTED_TGE_CHAINS || [42]

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
            <Suspense fallback={<></>}>
              <Switch>
                <Route exact strict path="/admin" render={() => <Redirect to="/admin/accreditation" />} />

                <Route exact strict path="/admin/:tab/:id?" component={Admin} />

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
                {isWhitelisted && <Route exact strict path={routes.kycIndividual} component={IndividualKYC} />}
                {isWhitelisted && <Route exact strict path={routes.kycCorporate} component={CorporateKYC} />}

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
                  <Route exact strict path="/faucet" component={Faucet} />
                )}

                {chainId && chains.includes(chainId) && isWhitelisted && (
                  <Route exact strict path="/security-tokens/:currencyId" component={SecTokenDetails} />
                )}
                {chainId && chains.includes(chainId) && isWhitelisted && (
                  <Route exact strict path={routes.securityTokens()} component={CustodianV2} />
                )}

                <Route exact strict path={routes.staking} component={StakingTab} />
                <Route exact strict path={routes.vesting} component={VestingTab} />

                <Route component={RedirectPathToKyc} />
              </Switch>
            </Suspense>
          </Web3ReactManager>
        </ToggleableBody>
        <Footer />
      </AppWrapper>
    </ErrorBoundary>
  )
}

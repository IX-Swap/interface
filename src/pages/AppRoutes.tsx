import React, { lazy } from 'react'
import { Redirect } from 'react-router-dom'

// import { SupportedChainId } from 'constants/chains'
import { routes } from 'utils/routes'

import Faucet from 'pages/Faucet'
import PoolFinder from 'pages/PoolFinder'

import { StakingTab } from 'pages/Farming/StakingTab'
import { VestingTab } from 'pages/Farming/VestingTab'

import { RedirectPathToSwapOnly, RedirectToSwap } from 'pages/Swap/redirects'
import { RedirectDuplicateTokenIdsV2 } from 'pages/AddLiquidityV2/redirects'
import { ROLES } from 'constants/roles'

const Admin = lazy(() => import('pages/Admin'))
const Swap = lazy(() => import('pages/Swap'))
const PoolV2 = lazy(() => import('pages/Pool/v2'))
const RemoveLiquidity = lazy(() => import('pages/RemoveLiquidity'))
const SecTokenDetails = lazy(() => import('pages/SecTokenDetails'))

const KYC = lazy(() => import('pages/KYC'))
const IndividualKYC = lazy(() => import('pages/KYC/IndividualKycForm'))
const CorporateKYC = lazy(() => import('pages/KYC/CorporateKycForm'))

const SecurityTokens = lazy(() => import('pages/SecurityTokens'))

const ListNFT = lazy(() => import('pages/ListNFT'))
const CreateNFT = lazy(() => import('pages/CreateNFT'))
const NftImport = lazy(() => import('pages/NftImport'))
const NFTCollection = lazy(() => import('pages/NFTCollection'))
const NFTCollections = lazy(() => import('pages/NFTCollections'))
const UpdateCollection = lazy(() => import('pages/UpdateCollection'))
const CreateCollection = lazy(() => import('pages/CreateCollection'))
const NftAssetPage = lazy(() => import('pages/NFTAsset'))
const TokenManager = lazy(() => import('pages/TokenManager'))
const CreatePayoutEvent = lazy(() => import('pages/CreatePayoutEvent'))
const EditPayoutEvent = lazy(() => import('pages/CreatePayoutEvent/EditPayoutEvent'))
const PayoutItem = lazy(() => import('pages/PayoutItem'))
const PayoutItemManager = lazy(() => import('pages/PayoutItem/PayoutItemManager'))

const Launchpad = lazy(() => import('pages/Launchpad'))
const LaunchpadOffer = lazy(() => import('pages/LaunchpadOffer'))

const LaunchpadIssuanceDashboard = lazy(() => import('pages/LaunchpadIssuance/Dashboard'))
const LaunchpadIssuanceForm = lazy(() => import('pages/LaunchpadIssuance/Form'))
const LaunchpadIssuanceVettingForm = lazy(() => import('pages/LaunchpadIssuance/VettingForm'))
const LaunchpadIssuanceInformationForm = lazy(() => import('pages/LaunchpadIssuance/InformationForm'))
const LaunchpadIssuanceInformationEditForm = lazy(() => import('pages/LaunchpadIssuance/InformationEditForm'))
const LaunchpadIssuanceInformationReview = lazy(() => import('pages/LaunchpadIssuance/InformationReview'))
const LaunchpadIssuanceReport = lazy(() => import('pages/LaunchpadIssuance/Report'))
export interface RouteMapEntry {
  path: string

  render?: () => JSX.Element
  component?: React.ComponentType<any>

  conditions?: {
    chainId?: number
    chainIsSupported?: boolean
    rolesSupported?: ROLES[]
    isWhitelisted?: boolean
    kycFormAccess?: string
  }
}
const onlyOfferManager = { conditions: { rolesSupported: [ROLES.OFFER_MANAGER, ROLES.ADMIN] } }
export const routeConfigs: RouteMapEntry[] = [
  { path: '/admin', render: () => <Redirect to={routes.admin('accreditation', null)} /> },
  { path: routes.admin(), component: Admin },

  {
    path: routes.nftCreate,
    component: CreateNFT,
    conditions: { isWhitelisted: true },
  },
  { path: routes.nftList, component: ListNFT, conditions: { isWhitelisted: true } },
  {
    path: routes.nftCollections,
    component: NFTCollections,
    conditions: { isWhitelisted: true },
  },
  {
    path: routes.nftCollectionCreate,
    component: CreateCollection,
    conditions: { isWhitelisted: true },
  },
  {
    path: routes.nftEditCollectionPath,
    component: UpdateCollection,
    conditions: { isWhitelisted: true },
  },
  {
    path: routes.nftCollectionImport,
    component: NftImport,
    conditions: { isWhitelisted: true },
  },
  {
    path: routes.nftViewCollectionPath,
    component: NFTCollection,
    conditions: { isWhitelisted: true },
  },
  {
    path: routes.nftItemPath,
    component: NftAssetPage,
    conditions: { isWhitelisted: true },
  },

  { path: routes.kyc, component: KYC, conditions: { isWhitelisted: true } },
  {
    path: routes.kycIndividual,
    component: IndividualKYC,
    conditions: { isWhitelisted: true, kycFormAccess: 'individual' },
  },
  {
    path: routes.kycCorporate,
    component: CorporateKYC,
    conditions: { isWhitelisted: true, kycFormAccess: 'corporate' },
  },
  { path: '/send', component: RedirectPathToSwapOnly, conditions: { isWhitelisted: true, chainIsSupported: true } },
  { path: '/swap/:outputCurrency', component: RedirectToSwap },
  { path: '/swap', component: Swap },
  { path: '/find', component: PoolFinder },
  { path: '/pool', component: PoolV2 },

  { path: '/add/:currencyIdA?/:currencyIdB?', component: RedirectDuplicateTokenIdsV2 },

  { path: '/remove/:currencyIdA/:currencyIdB', component: RemoveLiquidity },

  { path: routes.faucet, component: Faucet },

  { path: routes.securityToken(), component: SecTokenDetails },
  { path: routes.securityTokens(), component: SecurityTokens },

  { path: '/token-manager', render: () => <Redirect to={routes.tokenManager('my-tokens', null)} /> },
  { path: routes.tokenManager(), component: TokenManager },
  { path: routes.createPayoutEvent, component: CreatePayoutEvent },
  { path: routes.editPayoutEvent(), component: EditPayoutEvent },
  { path: routes.payoutItem(), component: PayoutItem },
  { path: routes.payoutItemManager(), component: PayoutItemManager },

  { path: routes.staking, component: StakingTab },
  { path: routes.vesting, component: VestingTab },
  { path: '/launchpad', component: Launchpad },
  { path: '/offers/:offerId', component: LaunchpadOffer },

  {
    path: '/issuance',
    component: LaunchpadIssuanceDashboard,
    ...onlyOfferManager,
  },

  { path: '/issuance/create', component: LaunchpadIssuanceForm, ...onlyOfferManager },
  {
    path: '/issuance/create/vetting',
    component: LaunchpadIssuanceVettingForm,
    ...onlyOfferManager,
  },

  {
    path: '/issuance/create/information',
    component: LaunchpadIssuanceInformationForm,
    ...onlyOfferManager,
  },
  {
    path: '/issuance/edit/information',
    component: LaunchpadIssuanceInformationEditForm,
    ...onlyOfferManager,
  },
  { path: '/issuance/review/information', component: LaunchpadIssuanceInformationReview, ...onlyOfferManager },
  {
    path: routes.issuanceReport,
    component: LaunchpadIssuanceReport,
    ...onlyOfferManager,
  },
]

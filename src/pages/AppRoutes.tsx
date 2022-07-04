import React, { lazy } from 'react'
import { Redirect } from 'react-router-dom'

import { SupportedChainId } from 'constants/chains'
import { routes } from 'utils/routes'

import Faucet from 'pages/Faucet'
import PoolFinder from 'pages/PoolFinder'

import { StakingTab } from 'pages/Farming/StakingTab'
import { VestingTab } from 'pages/Farming/VestingTab'

import { RedirectPathToSwapOnly, RedirectToSwap } from 'pages/Swap/redirects'
import { RedirectDuplicateTokenIdsV2 } from 'pages/AddLiquidityV2/redirects'

const Admin = lazy(() => import('pages/Admin'))
const Swap = lazy(() => import('pages/Swap'))
const PoolV2 = lazy(() => import('pages/Pool/v2'))
const RemoveLiquidity = lazy(() => import('pages/RemoveLiquidity'))
const SecTokenDetails = lazy(() => import('pages/SecTokenDetails'))

const KYC = lazy(() => import('pages/KYC'))
const IndividualKYC = lazy(() => import('pages/KYC/IndividualKycForm'))
const CorporateKYC = lazy(() => import('pages/KYC/CorporateKycForm'))

const CustodianV2 = lazy(() => import('pages/CustodianV2'))

const ListNFT = lazy(() => import('pages/ListNFT'))
const CreateNFT = lazy(() => import('pages/CreateNFT'))
const NftImport = lazy(() => import('pages/NftImport'))
const NFTCollection = lazy(() => import('pages/NFTCollection'))
const NFTCollections = lazy(() => import('pages/NFTCollections'))
const UpdateCollection = lazy(() => import('pages/UpdateCollection'))
const CreateCollection = lazy(() => import('pages/CreateCollection'))
const NftAssetPage = lazy(() => import('pages/NFTAsset'))

export interface RouteMapEntry {
  path: string

  render?: () => JSX.Element
  component?: React.ComponentType<any>

  conditions?: {
    chainId?: number
    chainIsSupported?: boolean

    isWhitelisted?: boolean
    kycFormAccess?: string
  }
}

export const routeConfigs: RouteMapEntry[] = [
  { path: "/admin", render: () => <Redirect to="/admin/accreditation" /> },
  { path: "/admin/:tab/:id?", component: Admin },

  { path: routes.nftCreate, component: CreateNFT, conditions: { isWhitelisted: true, chainId: SupportedChainId.KOVAN } },
  { path: routes.nftList, component: ListNFT, conditions: { isWhitelisted: true, chainId: SupportedChainId.KOVAN } },
  { path: routes.nftCollections, component: NFTCollections, conditions: { isWhitelisted: true, chainId: SupportedChainId.KOVAN } },
  { path: routes.nftCollectionCreate, component: CreateCollection, conditions: { isWhitelisted: true, chainId: SupportedChainId.KOVAN } },
  { path: routes.nftEditCollectionPath, component: UpdateCollection, conditions: { isWhitelisted: true, chainId: SupportedChainId.KOVAN } },
  { path: routes.nftCollectionImport, component: NftImport, conditions: { isWhitelisted: true, chainId: SupportedChainId.KOVAN } },
  { path: routes.nftViewCollectionPath, component: NFTCollection, conditions: { isWhitelisted: true, chainId: SupportedChainId.KOVAN } },
  { path: routes.nftItemPath, component: NftAssetPage, conditions: { isWhitelisted: true, chainId: SupportedChainId.KOVAN } },

  { path: routes.kyc, component: KYC, conditions: { isWhitelisted: true } },
  { path: routes.kycIndividual, component: IndividualKYC, conditions: { isWhitelisted: true, kycFormAccess: 'individual' } },
  { path: routes.kycCorporate, component: CorporateKYC, conditions: { isWhitelisted: true, kycFormAccess: 'corporate' } },
  { path: "/send", component: RedirectPathToSwapOnly, conditions: { isWhitelisted: true, chainIsSupported: true } },
  { path: "/swap/:outputCurrency", component: RedirectToSwap },
  { path: "/swap", component: Swap },
  { path: "/find", component: PoolFinder },
  { path: "/pool", component: PoolV2 },

  { path: "/add/:currencyIdA?/:currencyIdB?", component: RedirectDuplicateTokenIdsV2 },

  { path: "/remove/:currencyIdA/:currencyIdB", component: RemoveLiquidity },

  { path: routes.faucet, component: Faucet },

  { path: "/security-tokens/:currencyId", component: SecTokenDetails },
  { path: routes.securityTokens(), component: CustodianV2 },

  { path: routes.staking, component: StakingTab },
  { path: routes.vesting, component: VestingTab },
]

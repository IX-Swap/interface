import { ActionCreatorWithoutPayload, ActionCreatorWithPayload, createAction } from '@reduxjs/toolkit'
import { timePeriods } from 'utils/time'
export interface AuthPayload {
  token: string
  expiresAt: number
}
export interface RawAuthPayload {
  accessToken: string
  expiresIn: keyof typeof timePeriods
}

export const postLogin: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithPayload<{ auth: RawAuthPayload }>
  rejected: ActionCreatorWithPayload<{ errorMessage: string }>
}> = {
  pending: createAction('admin/postLogin/pending'),
  fulfilled: createAction('admin/postLogin/fulfilled'),
  rejected: createAction('admin/postLogin/rejected'),
}

export interface RawGetMePayload {
  id: number
  email: string
  tenant: string
  language: string
  role: string
  photo: {
    uuid: string
  }
  photoId: number
  active: boolean
  ethAddress: string
  ethAddressMd5: string
  createdAt: string
  updatedAt: string
  deletedAt: string
}

export const getMe: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithPayload<{ data: RawGetMePayload }>
  rejected: ActionCreatorWithPayload<{ errorMessage: string }>
}> = {
  pending: createAction('admin/getMe/pending'),
  fulfilled: createAction('admin/getMe/fulfilled'),
  rejected: createAction('admin/getMe/rejected'),
}

export const logout: Readonly<{
  fulfilled: ActionCreatorWithoutPayload
}> = {
  fulfilled: createAction('admin/logOut/fulfilled'),
}

export interface KycList {
  page: number
  offset: number
  totalItems: number
  totalPages: number
  itemCount: number
  items: any[]
  nextPage: number
  prevPage: number
}

export interface BrokerDealerList {
  data: any
}

export interface BrokerDealerSwaps {
  page: number
  totalPages: number
  items: BrokerDealerSwapItem[]
  offset: number
}
export interface KycItem {
  createdAt: string
  custodianApplicationId?: number
  deletedAt?: string
  id: number
  kyc: {
    url: string
  }
  message?: string
  status: string
  custodian: {
    createdAt: string
    deletedAt: string | null
    description: string
    id: number
    logoId: number | null
    name: string
    updatedAt: string
    website: string
  }
  brokerDealerId?: number
  brokerDealer: {
    createdAt: string
    deletedAt: string | null
    description: string
    id: number
    logoId: number | null
    name: string
    updatedAt: string
    website: string
  }
  token: {
    address: string
    chainId: number
    createdAt: string
    custodyAssetAddress: string
    custodyAssetId: string
    custodyVaultId: string
    decimals: number
    deletedAt?: string
    description: string
    ethTransactionId: number
    id: number
    lastBlockNumber: number
    logoId?: number
    name: string
    network: string
    platformId: number
    status: string
    symbol: string
    updatedAt: string
  }
  tokenId: number
  updatedAt: string
  user: {
    active: true
    createdAt: string
    deletedAt?: string
    email?: string
    ethAddress: string
    id: number
    language: string
    photo?: { uuid: string }
    photoId?: number
    principal: string
    role: string
    tenant: string
    updatedAt: string
  }
  userId: number
}

export type BrokerDealerSwapItem = {
  id: number
  amount: string
  brokerDealer: {
    name: string
  }
  brokerDealerId: number
  status: string
  token: {
    name: string
    symbol: string
    decimals: number
  }
  tokenId: number
  user: {
    ethAddress: string
  }
  data: {
    amount: string
    userEthAddress: string
    pairAddress: string
    tokenSymbol: string
    pairSymbol: string
    tokenAddress: string
  }
  createdAt: string
  transactionHash?: string | null
}

export const getKycList: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithPayload<{ data: KycList }>
  rejected: ActionCreatorWithPayload<{ errorMessage: string }>
}> = {
  pending: createAction('admin/getKycList/pending'),
  fulfilled: createAction('admin/getKycList/fulfilled'),
  rejected: createAction('admin/getKycList/rejected'),
}

export const getBrokerDealerList: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithPayload<{ data: BrokerDealerList }>
  rejected: ActionCreatorWithPayload<{ errorMessage: string }>
}> = {
  pending: createAction('admin/getBrokerDealerList/pending'),
  fulfilled: createAction('admin/getBrokerDealerList/fulfilled'),
  rejected: createAction('admin/getBrokerDealerList/rejected'),
}

export const postApproveKyc: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithPayload<{ data: { id: number; status: string } }>
  rejected: ActionCreatorWithPayload<{ errorMessage: string }>
}> = {
  pending: createAction('admin/postApproveKyc/pending'),
  fulfilled: createAction('admin/postApproveKyc/fulfilled'),
  rejected: createAction('admin/postApproveKyc/rejected'),
}

export const postDeclineKyc: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithPayload<{ data: { id: number; status: string } }>
  rejected: ActionCreatorWithPayload<{ errorMessage: string }>
}> = {
  pending: createAction('admin/postDeclineKyc/pending'),
  fulfilled: createAction('admin/postDeclineKyc/fulfilled'),
  rejected: createAction('admin/postDeclineKyc/rejected'),
}

export const postKycReset: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithPayload<{ data: { id: number; status: string } }>
  rejected: ActionCreatorWithPayload<{ errorMessage: string }>
}> = {
  pending: createAction('admin/postKycReset/pending'),
  fulfilled: createAction('admin/postKycReset/fulfilled'),
  rejected: createAction('admin/postKycReset/rejected'),
}

export const getBrokerDealerSwaps: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithPayload<{ data: BrokerDealerSwaps }>
  rejected: ActionCreatorWithPayload<{ errorMessage: string }>
}> = {
  pending: createAction('broker-dealer/swaps/pending'),
  fulfilled: createAction('broker-dealer/swaps/fulfilled'),
  rejected: createAction('broker-dealer/swaps/rejected'),
}

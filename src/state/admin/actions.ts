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

export interface AccreditationList {
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
export interface AccreditationItem {
  createdAt: string
  custodianApplicationId?: number
  deletedAt?: string
  id: number
  kyc: {
    url: string
    [key: string]: any
  }
  userKyc?: {
    id: number
    userId: number
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
  userKyc?: KycItem
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

export const getAccreditationList: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithPayload<{ data: AccreditationList }>
  rejected: ActionCreatorWithPayload<{ errorMessage: string }>
}> = {
  pending: createAction('admin/getAccreditationList/pending'),
  fulfilled: createAction('admin/getAccreditationList/fulfilled'),
  rejected: createAction('admin/getAccreditationList/rejected'),
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

export const postApproveAccreditation: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithPayload<{ data: { id: number; status: string } }>
  rejected: ActionCreatorWithPayload<{ errorMessage: string }>
}> = {
  pending: createAction('admin/postApproveAccreditation/pending'),
  fulfilled: createAction('admin/postApproveAccreditation/fulfilled'),
  rejected: createAction('admin/postApproveAccreditation/rejected'),
}

export const postDeclineAccreditation: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithPayload<{ data: { id: number; status: string } }>
  rejected: ActionCreatorWithPayload<{ errorMessage: string }>
}> = {
  pending: createAction('admin/postDeclineAccreditation/pending'),
  fulfilled: createAction('admin/postDeclineAccreditation/fulfilled'),
  rejected: createAction('admin/postDeclineAccreditation/rejected'),
}

export const postResetAccreditation: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithPayload<{ data: { id: number; status: string } }>
  rejected: ActionCreatorWithPayload<{ errorMessage: string }>
}> = {
  pending: createAction('admin/postResetAccreditation/pending'),
  fulfilled: createAction('admin/postResetAccreditation/fulfilled'),
  rejected: createAction('admin/postResetAccreditation/rejected'),
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

export const getKycList: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithPayload<{ data: KycList }>
  rejected: ActionCreatorWithPayload<{ errorMessage: string }>
}> = {
  pending: createAction('admin/getKycList/pending'),
  fulfilled: createAction('admin/getKycList/fulfilled'),
  rejected: createAction('admin/getKycList/rejected'),
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

export const postRejectKyc: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithPayload<{ data: { id: number; status: string } }>
  rejected: ActionCreatorWithPayload<{ errorMessage: string }>
}> = {
  pending: createAction('admin/postRejectKyc/pending'),
  fulfilled: createAction('admin/postRejectKyc/fulfilled'),
  rejected: createAction('admin/postRejectKyc/rejected'),
}

export const postResetKyc: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithPayload<{ data: { id: number; status: string } }>
  rejected: ActionCreatorWithPayload<{ errorMessage: string }>
}> = {
  pending: createAction('admin/postResetKyc/pending'),
  fulfilled: createAction('admin/postResetKyc/fulfilled'),
  rejected: createAction('admin/postResetKyc/rejected'),
}

export interface Document {
  asset: {
    createdAt: string
    deletedAt: string | null
    id: number
    isPrivate: false
    mimeType: string
    name: string
    otc: string | null
    path: string
    public: string
    size: string | null
    state: string
    tenant: string
    updatedAt: string
    userId: number
    uuid: string
  }
  assetId: number
  createdAt: string
  deletedAt: string | null
  id: number
  individualKycId: number
  type: string
  updatedAt: string
}

export interface KycList {
  page: number
  offset: number
  totalItems: number
  totalPages: number
  itemCount: number
  items: Array<KycItem>
  nextPage: number
  prevPage: number
}

export interface IndividualKyc {
  accredited: number
  address: {
    city: string
    country: string
    createdAt: string
    deletedAt: string | null
    id: number
    line1: string
    line2: string
    updatedAt: string
    [key: string]: any
  }
  addressId: number
  citizenship: string
  createdAt: string
  dateOfBirth: string
  deletedAt: string | null
  documents: Array<Document>
  email: string
  employer: string
  employmentStatus: string
  firstName: string
  gender: string
  id: number
  income: string
  lastName: string
  middleName: string
  nationality: string
  occupation: string
  phoneNumber: string
  sourceOfFunds: string
  updatedAt: string
  usTin: string | null
  [key: string]: any
}

export interface CorporateKyc {
  accredited: number
  address: {
    city: string
    country: string
    createdAt: string
    deletedAt: string | null
    id: number
    line1: string
    line2: string
    updatedAt: string
    [key: string]: any
  }
  addressId: number
  citizenship: string
  createdAt: string
  dateOfBirth: string
  deletedAt: string | null
  documents: Array<Document>
  email: string
  employer: string
  employmentStatus: string
  firstName: string
  gender: string
  id: number
  income: string
  lastName: string
  middleName: string
  nationality: string
  occupation: string
  phoneNumber: string
  sourceOfFunds: string
  updatedAt: string
  usTin: string | null
  [key: string]: any
}

export interface KycItem {
  createdAt: string
  deletedAt: string | null
  id: number
  individual?: IndividualKyc
  corporate?: IndividualKyc
  individualKycId: number
  status: string
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

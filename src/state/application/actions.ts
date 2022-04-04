import { createAction } from '@reduxjs/toolkit'
import { ModalType } from './reducer'

export type PopupContent = {
  txn?: {
    hash: string
    success: boolean
    summary?: string
  }
  info?: {
    success: boolean
    summary?: string
  }
}

export enum ApplicationModal {
  WALLET,
  SETTINGS,
  SELF_CLAIM,
  ADDRESS_CLAIM,
  CLAIM_POPUP,
  MENU,
  DELEGATE,
  VOTE,
  POOL_OVERVIEW_OPTIONS,
  DEPOSIT,
  WITHDRAW,
  TRANSACTION_DETAILS,
  STAKE,
  MANAGE_REWARD,
  ADD_STAKE,
  UNSTAKE,
  CHOOSE_BROKER_DEALER,
  STAKE_IXS,
  UNSTAKE_IXS,
  IXS_BALANCE,
  NETWORK_SELECTOR,
  GENERAL,
  PROPERTIES,
  LEVELS,
  STATS,
  ABOUT_WRAPPING,
  PLAYGROUND_WARNING,
  TOKEN_POPUP,
  TOKEN_DELETE_CLAIM,
}

export const updateBlockNumber = createAction<{ chainId: number; blockNumber: number }>('application/updateBlockNumber')
export const setOpenModal = createAction<ApplicationModal | null>('application/setOpenModal')
export const setShowFakeApproval = createAction<{ showValue: boolean }>('application/setShowFakeApproval')
export const setBrokerDealerData = createAction<{ newData: any }>('application/setBrokerDealerData')
export const addPopup = createAction<{ key?: string; removeAfterMs?: number | null; content: PopupContent }>(
  'application/addPopup'
)
export const removePopup = createAction<{ key: string }>('application/removePopup')
export const setModalDetails = createAction<{ modalType: ModalType; modalTitle: string; modalMessage: string }>(
  'application/setModalDetails'
)
export const setPendingSign = createAction<boolean>('application/pendingSign')
export const clearStore = createAction('clearStore')

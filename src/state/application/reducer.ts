import { createReducer, nanoid } from '@reduxjs/toolkit'
import {
  addPopup,
  PopupContent,
  removePopup,
  updateBlockNumber,
  ApplicationModal,
  setOpenModal,
  setModalDetails,
  setShowFakeApproval,
  setBrokerDealerData,
  setPendingSign,
} from './actions'

type PopupList = Array<{ key: string; show: boolean; content: PopupContent; removeAfterMs: number | null }>
export enum ModalType {
  ERROR = 'error',
  INFO = 'info',
  SUCCESS = 'success',
}
export interface ApplicationState {
  readonly blockNumber: { readonly [chainId: number]: number }
  readonly popupList: PopupList
  readonly openModal: ApplicationModal | null
  readonly modalType: ModalType
  readonly modalTitle: string
  readonly modalMessage: string
  readonly showFakeApproval: boolean
  readonly brokerDealerData: any
  pendingSign: boolean
}

const initialState: ApplicationState = {
  blockNumber: {},
  popupList: [],
  openModal: null,
  modalType: ModalType.INFO,
  modalTitle: '',
  modalMessage: '',
  showFakeApproval: false,
  brokerDealerData: {},
  pendingSign: false,
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(updateBlockNumber, (state, action) => {
      const { chainId, blockNumber } = action.payload
      if (typeof state.blockNumber[chainId] !== 'number') {
        state.blockNumber[chainId] = blockNumber
      } else {
        state.blockNumber[chainId] = Math.max(blockNumber, state.blockNumber[chainId])
      }
    })
    .addCase(setOpenModal, (state, action) => {
      state.openModal = action.payload
    })
    .addCase(setModalDetails, (state, { payload: { modalType, modalTitle, modalMessage } }) => {
      state.openModal = ApplicationModal.GENERAL
      state.modalType = modalType
      state.modalTitle = modalTitle
      state.modalMessage = modalMessage
    })
    .addCase(addPopup, (state, { payload: { content, key, removeAfterMs = 25000 } }) => {
      state.popupList = (key ? state.popupList.filter((popup) => popup.key !== key) : state.popupList).concat([
        {
          key: key || nanoid(),
          show: true,
          content,
          removeAfterMs,
        },
      ])
    })
    .addCase(removePopup, (state, { payload: { key } }) => {
      state.popupList.forEach((p) => {
        if (p.key === key) {
          p.show = false
        }
      })
    })
    .addCase(setShowFakeApproval, (state, { payload: { showValue } }) => {
      state.showFakeApproval = showValue
    })
    .addCase(setBrokerDealerData, (state, { payload: { newData } }) => {
      state.brokerDealerData = newData
    })
    .addCase(setPendingSign, (state, { payload }) => {
      state.pendingSign = payload
    })
)

import { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useActiveWeb3React } from '../../hooks/web3'
import { AppDispatch, AppState } from '../index'
import {
  addPopup,
  ApplicationModal,
  PopupContent,
  removePopup,
  setBrokerDealerData,
  setOpenModal,
  setShowFakeApproval,
} from './actions'

export function useBlockNumber(): number | undefined {
  const { chainId } = useActiveWeb3React()

  return useSelector((state: AppState) => state.application.blockNumber[chainId ?? -1])
}

export function useModalOpen(modal: ApplicationModal): boolean {
  const openModal = useSelector((state: AppState) => state.application.openModal)
  return openModal === modal
}

export function useToggleModal(modal: ApplicationModal): () => void {
  const open = useModalOpen(modal)
  const dispatch = useDispatch<AppDispatch>()
  return useCallback(() => dispatch(setOpenModal(open ? null : modal)), [dispatch, modal, open])
}

export function useToggleFakeApproval() {
  const dispatch = useDispatch<AppDispatch>()
  return useCallback((showValue: boolean) => dispatch(setShowFakeApproval({ showValue })), [dispatch])
}

export function useSetBrokerDealerData() {
  const dispatch = useDispatch<AppDispatch>()
  return useCallback((newData: any) => dispatch(setBrokerDealerData({ newData })), [dispatch])
}

export function useFakeApprovalState(): boolean {
  return useSelector((state: AppState) => state.application.showFakeApproval)
}

export function useBrokerDealerState(): any {
  return useSelector((state: AppState) => state.application.brokerDealerData)
}

export function useOpenModal(modal: ApplicationModal): () => void {
  const dispatch = useDispatch<AppDispatch>()
  return useCallback(() => dispatch(setOpenModal(modal)), [dispatch, modal])
}

export function useCloseModals(): () => void {
  const dispatch = useDispatch<AppDispatch>()
  return useCallback(() => dispatch(setOpenModal(null)), [dispatch])
}

export function useWalletModalToggle(): () => void {
  return useToggleModal(ApplicationModal.WALLET)
}
export function useDepositModalToggle(): () => void {
  return useToggleModal(ApplicationModal.DEPOSIT)
}
export function useWithdrawModalToggle(): () => void {
  return useToggleModal(ApplicationModal.WITHDRAW)
}
export function useToggleSettingsMenu(): () => void {
  return useToggleModal(ApplicationModal.SETTINGS)
}
export function useToggleStakeModal(): () => void {
  return useToggleModal(ApplicationModal.STAKE)
}

export function useToggleTransactionModal(): () => void {
  return useToggleModal(ApplicationModal.TRANSACTION_DETAILS)
}

export function useChooseBrokerDealerModalToggle(): () => void {
  return useToggleModal(ApplicationModal.CHOOSE_BROKER_DEALER)
}

export function useTokenPopupToggle(): () => void {
  return useToggleModal(ApplicationModal.TOKEN_POPUP)
}

export function useDeleteTokenPopupToggle(): () => void {
  return useToggleModal(ApplicationModal.TOKEN_DELETE_CLAIM)
}

// returns a function that allows adding a popup
export function useAddPopup(): (content: PopupContent, key?: string) => void {
  const dispatch = useDispatch()

  return useCallback(
    (content: PopupContent, key?: string) => {
      dispatch(addPopup({ content, key }))
    },
    [dispatch]
  )
}

// returns a function that allows removing a popup via its key
export function useRemovePopup(): (key: string) => void {
  const dispatch = useDispatch()
  return useCallback(
    (key: string) => {
      dispatch(removePopup({ key }))
    },
    [dispatch]
  )
}

// get the list of active popups
export function useActivePopups(): AppState['application']['popupList'] {
  const list = useSelector((state: AppState) => state.application.popupList)
  return useMemo(() => list.filter((item) => item.show), [list])
}

export function useGeneralModalState() {
  const applicationState = useSelector((state: AppState) => state.application)
  const { modalType, modalTitle, modalMessage } = applicationState
  return { modalType, modalTitle, modalMessage }
}

export function useShowError() {
  const addPopup = useAddPopup()
  return useCallback(
    async (message: string) => {
      addPopup({
        info: {
          success: false,
          summary: message,
        },
      })
    },
    [addPopup]
  )
}

import KYC from "pages/KYC"
import { KYCStatuses } from "pages/KYC/enum"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppState } from "state"
import { useKYCState } from "state/kyc/hooks"

import { toggleKYCDialog } from './actions'

export const useKYCModalState = () => {
  return useSelector<AppState, boolean>(state => state.launchpad.isKYCModalOpen)
}

export const useToggleKYCModal = () => {
  const dispatch = useDispatch()
  const isOpen = useKYCModalState()


  return React.useCallback(() => {
    console.log('toggling modal: ', !isOpen)
    dispatch(toggleKYCDialog({ open: !isOpen }))
  }, [isOpen])
}

export const useCheckKYC = () => {
  const dispatch = useDispatch()

  const { kyc } = useKYCState()
  
  return React.useCallback((callback: () => void) => {
    console.log('checking KYC')

    if (kyc && kyc.status === KYCStatuses.APPROVED && kyc.individual?.accredited) {
      callback()
    } else {
      console.log('opening modal')
      dispatch(toggleKYCDialog({ open: true }))
    }
  }, [kyc])
}

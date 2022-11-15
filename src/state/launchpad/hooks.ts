import KYC from "pages/KYC"
import { KYCStatuses } from "pages/KYC/enum"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppState } from "state"
import { useKYCState } from "state/kyc/hooks"

import { toggleKYCDialog } from './actions'

export const useKYCIsModalOpen = () => {
  return useSelector<AppState, boolean>(state => state.launchpad.isKYCModalOpen)
}

export const useKYCAllowOnlyAccredited = () => {
  return useSelector<AppState, boolean>(state => state.launchpad.allowOnlyAccredited)
}

export const useToggleKYCModal = () => {
  const dispatch = useDispatch()
  const isOpen = useKYCIsModalOpen()

  return React.useCallback(() => {
    dispatch(toggleKYCDialog({ open: !isOpen }))
  }, [isOpen])
}

export const useSetAllowOnlyAccredited = () => {
  const dispatch = useDispatch()

  return React.useCallback((allowOnlyAccredited: boolean) => {
    dispatch(toggleKYCDialog({ open: allowOnlyAccredited }))
  }, [dispatch])
}

export const useCheckKYC = () => {
  const { kyc } = useKYCState()
  
  return React.useCallback((allowOnlyAccredited: boolean) => {
    return kyc && kyc.status === KYCStatuses.APPROVED && (!allowOnlyAccredited || kyc.individual?.accredited === 1)
  }, [kyc])
}

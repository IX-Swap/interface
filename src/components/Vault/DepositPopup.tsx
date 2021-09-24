import { Currency } from '@ixswap1/sdk-core'
import { Trans } from '@lingui/macro'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import { RowBetween } from 'components/Row'
import { ModalContentWrapper } from 'components/SearchModal/styleds'
import React, { useCallback, useEffect, useState } from 'react'
import { ApplicationModal } from 'state/application/actions'
import { useDepositModalToggle, useModalOpen } from 'state/application/hooks'
import { ModalBlurWrapper } from 'theme'
import { CloseIcon, TYPE } from '../../theme'
import { DepositRequestForm } from './DepositRequestForm'
import { ModalPadding } from './styleds'
import { DepositSendInfo } from './DepositSendInfo'
import { useDepositState } from 'state/deposit/hooks'
import { DepositPending } from './DepositPending'
import { DepositError } from './DepositError'
import { setError, setLoading } from 'state/deposit/actions'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'state'

export enum DepositModalView {
  CREATE_REQUEST,
  SEND_INFO,
  PENDING,
  ERROR,
}
interface Props {
  currency?: Currency
}
export const DepositPopup = ({ currency }: Props) => {
  const isOpen = useModalOpen(ApplicationModal.DEPOSIT)
  const toggle = useDepositModalToggle()
  const [modalView, setModalView] = useState<DepositModalView>(DepositModalView.CREATE_REQUEST)
  const { loadingDeposit, depositError } = useDepositState()
  const dispatch = useDispatch<AppDispatch>()

  const onClose = useCallback(() => {
    setModalView(DepositModalView.CREATE_REQUEST)
    dispatch(setError({ errorMessage: '' }))
    dispatch(setLoading({ loading: false }))
    toggle()
  }, [toggle, setModalView])

  useEffect(() => {
    if (loadingDeposit && modalView === DepositModalView.CREATE_REQUEST) {
      setModalView(DepositModalView.PENDING)
    }
    if (depositError && modalView !== DepositModalView.ERROR) {
      setModalView(DepositModalView.ERROR)
    }
  }, [loadingDeposit, modalView, toggle, depositError])
  return (
    <RedesignedWideModal
      isOpen={isOpen}
      onDismiss={onClose}
      minHeight={false}
      maxHeight={'fit-content'}
      mobileMaxHeight={90}
    >
      <ModalBlurWrapper data-testid="depositPopup">
        <ModalContentWrapper>
          <ModalPadding>
            <RowBetween>
              <TYPE.title5>
                <Trans>Deposit</Trans>
              </TYPE.title5>
              <CloseIcon data-testid="cross" onClick={onClose} />
            </RowBetween>
            {modalView === DepositModalView.CREATE_REQUEST && (
              <DepositRequestForm currency={currency} setModalView={setModalView} />
            )}
            {modalView === DepositModalView.SEND_INFO && <DepositSendInfo onClose={onClose} />}
            {modalView === DepositModalView.PENDING && <DepositPending />}
            {modalView === DepositModalView.ERROR && <DepositError onClose={onClose} />}
          </ModalPadding>
        </ModalContentWrapper>
      </ModalBlurWrapper>
    </RedesignedWideModal>
  )
}

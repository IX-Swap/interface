import { Currency } from '@ixswap1/sdk-core'
import { Trans } from '@lingui/macro'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import { RowBetween } from 'components/Row'
import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'state'
import { ApplicationModal } from 'state/application/actions'
import { useDepositModalToggle, useModalOpen } from 'state/application/hooks'
import { setError, setLoading, setModalView } from 'state/deposit/actions'
import { useDepositState } from 'state/deposit/hooks'
import { DepositModalView } from 'state/deposit/reducer'
import { ModalBlurWrapper, ModalContentWrapper } from 'theme'
import { CloseIcon, TYPE } from '../../theme'
import { DepositError } from './DepositError'
import { DepositPending } from './DepositPending'
import { DepositRequestForm } from './DepositRequestForm'
import { DepositSendInfo } from './DepositSendInfo'
import { ModalPadding } from './styleds'

interface Props {
  currency?: Currency
}
export const DepositPopup = ({ currency }: Props) => {
  const isOpen = useModalOpen(ApplicationModal.DEPOSIT)
  const toggle = useDepositModalToggle()
  const { modalView } = useDepositState()
  const dispatch = useDispatch<AppDispatch>()

  const onClose = useCallback(() => {
    dispatch(setModalView({ view: DepositModalView.CREATE_REQUEST }))
    dispatch(setError({ errorMessage: '' }))
    dispatch(setLoading({ loading: false }))
    toggle()
  }, [toggle])

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
            {modalView === DepositModalView.CREATE_REQUEST && <DepositRequestForm currency={currency} />}
            {modalView === DepositModalView.SEND_INFO && <DepositSendInfo onClose={onClose} />}
            {modalView === DepositModalView.PENDING && <DepositPending />}
            {modalView === DepositModalView.ERROR && <DepositError onClose={onClose} />}
          </ModalPadding>
        </ModalContentWrapper>
      </ModalBlurWrapper>
    </RedesignedWideModal>
  )
}

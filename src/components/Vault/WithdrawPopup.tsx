import { Currency } from '@ixswap1/sdk-core'
import { Trans } from '@lingui/macro'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import { RowBetween } from 'components/Row'
import React, { useCallback, useEffect, useState } from 'react'
import { ApplicationModal } from 'state/application/actions'
import { useModalOpen, useWithdrawModalToggle } from 'state/application/hooks'
import { useWithdrawState } from 'state/withdraw/hooks'
import { ModalBlurWrapper, ModalContentWrapper } from 'theme'
import { CloseIcon, TYPE } from '../../theme'
import { ModalPadding } from './styleds'
import { WithdrawError } from './WithDrawError'
import { WithdrawPending } from './WithdrawPending'
import { WithdrawRequestForm } from './WithdrawRequestForm'
import { WithdrawSuccess } from './WithDrawSuccess'

export enum WithdrawModalView {
  WITHDRAW_REQUEST,
  PENDING,
  SUCCESS,
  ERROR,
}
interface Props {
  currency?: Currency
}
export const WithdrawPopup = ({ currency }: Props) => {
  const isOpen = useModalOpen(ApplicationModal.WITHDRAW)
  const toggle = useWithdrawModalToggle()
  const [modalView, setModalView] = useState<WithdrawModalView>(WithdrawModalView.WITHDRAW_REQUEST)
  const { loadingWithdraw } = useWithdrawState()

  const onClose = useCallback(() => {
    setModalView(WithdrawModalView.WITHDRAW_REQUEST)
    toggle()
  }, [toggle, setModalView])

  useEffect(() => {
    if (loadingWithdraw && modalView === WithdrawModalView.WITHDRAW_REQUEST) {
      setModalView(WithdrawModalView.PENDING)
    }
  }, [loadingWithdraw, modalView, toggle])

  return (
    <RedesignedWideModal
      isOpen={isOpen}
      onDismiss={onClose}
      minHeight={false}
      maxHeight={'fit-content'}
      mobileMaxHeight={90}
    >
      <ModalBlurWrapper>
        <ModalContentWrapper>
          <ModalPadding>
            <RowBetween>
              <TYPE.title5>
                <Trans>Withdraw from Custodian</Trans>
              </TYPE.title5>
              <CloseIcon onClick={onClose} />
            </RowBetween>
            {modalView === WithdrawModalView.WITHDRAW_REQUEST && (
              <WithdrawRequestForm currency={currency} changeModal={setModalView} />
            )}
            {modalView === WithdrawModalView.PENDING && <WithdrawPending />}
            {modalView === WithdrawModalView.SUCCESS && <WithdrawSuccess onClose={onClose} />}
            {modalView === WithdrawModalView.ERROR && <WithdrawError onClose={onClose} />}
          </ModalPadding>
        </ModalContentWrapper>
      </ModalBlurWrapper>
    </RedesignedWideModal>
  )
}

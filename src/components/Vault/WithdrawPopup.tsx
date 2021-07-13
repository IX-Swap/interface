import { Currency } from '@ixswap1/sdk-core'
import { Trans } from '@lingui/macro'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import { RowBetween } from 'components/Row'
import { ModalContentWrapper } from 'components/SearchModal/styleds'
import React, { useState } from 'react'
import { ApplicationModal } from 'state/application/actions'
import { useModalOpen, useWithdrawModalToggle } from 'state/application/hooks'
import { ModalBlurWrapper } from 'theme'
import { CloseIcon, TYPE } from '../../theme'
import { ModalPadding } from './styleds'
import { WithdrawPending } from './WithdrawPending'
import { WithdrawRequestForm } from './WithdrawRequestForm'

export enum WithdrawModalView {
  WITHDRAW_REQUEST,
  PENDING,
}
interface Props {
  currency?: Currency
}
export const WithdrawPopup = ({ currency }: Props) => {
  const isOpen = useModalOpen(ApplicationModal.WITHDRAW)
  const toggleModal = useWithdrawModalToggle()
  const [modalView, setModalView] = useState<WithdrawModalView>(WithdrawModalView.WITHDRAW_REQUEST)
  return (
    <RedesignedWideModal
      isOpen={isOpen}
      onDismiss={toggleModal}
      minHeight={false}
      maxHeight={'fit-content'}
      mobileMaxHeight={90}
    >
      <ModalBlurWrapper>
        <ModalContentWrapper>
          <ModalPadding>
            <RowBetween>
              <TYPE.title5>
                <Trans>Withdraw</Trans>
              </TYPE.title5>
              <CloseIcon onClick={toggleModal} />
            </RowBetween>
            {modalView === WithdrawModalView.WITHDRAW_REQUEST && (
              <WithdrawRequestForm currency={currency} changeModal={() => setModalView(WithdrawModalView.PENDING)} />
            )}
            {modalView === WithdrawModalView.PENDING && <WithdrawPending />}
          </ModalPadding>
        </ModalContentWrapper>
      </ModalBlurWrapper>
    </RedesignedWideModal>
  )
}

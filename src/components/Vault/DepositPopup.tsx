import { Currency } from '@ixswap1/sdk-core'
import { Trans } from '@lingui/macro'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import { RowBetween } from 'components/Row'
import { ModalContentWrapper } from 'components/SearchModal/styleds'
import React, { useState } from 'react'
import { ApplicationModal } from 'state/application/actions'
import { useDepositModalToggle, useModalOpen } from 'state/application/hooks'
import { ModalBlurWrapper } from 'theme'
import { CloseIcon, TYPE } from '../../theme'
import { DepositRequestForm } from './DepositRequestForm'
import { ModalPadding } from './styleds'
import { DepositSendInfo } from './DepositSendInfo'

export enum DepositModalView {
  CREATE_REQUEST,
  SEND_INFO,
}
interface Props {
  currency?: Currency
}
export const DepositPopup = ({ currency }: Props) => {
  const isOpen = useModalOpen(ApplicationModal.DEPOSIT)
  const toggleModal = useDepositModalToggle()
  const [modalView, setModalView] = useState<DepositModalView>(DepositModalView.CREATE_REQUEST)
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
                <Trans>Deposit</Trans>
              </TYPE.title5>
              <CloseIcon onClick={toggleModal} />
            </RowBetween>
            {modalView === DepositModalView.CREATE_REQUEST && (
              <DepositRequestForm currency={currency} changeModal={() => setModalView(DepositModalView.SEND_INFO)} />
            )}
            {modalView === DepositModalView.SEND_INFO && <DepositSendInfo />}
          </ModalPadding>
        </ModalContentWrapper>
      </ModalBlurWrapper>
    </RedesignedWideModal>
  )
}

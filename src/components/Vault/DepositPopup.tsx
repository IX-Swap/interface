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
  const { loadingDeposit } = useDepositState()

  const onClose = useCallback(() => {
    setModalView(DepositModalView.CREATE_REQUEST)
    toggle()
  }, [toggle, setModalView])

  useEffect(() => {
    if (loadingDeposit && modalView === DepositModalView.CREATE_REQUEST) {
      setModalView(DepositModalView.PENDING)
    }
  }, [loadingDeposit, modalView, toggle])

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
                <Trans>Deposit</Trans>
              </TYPE.title5>
              <CloseIcon onClick={onClose} />
            </RowBetween>
            {modalView === DepositModalView.CREATE_REQUEST && (
              <DepositRequestForm currency={currency} setModalView={setModalView} />
            )}
            {modalView === DepositModalView.SEND_INFO && <DepositSendInfo onClose={onClose} />}
          </ModalPadding>
        </ModalContentWrapper>
      </ModalBlurWrapper>
    </RedesignedWideModal>
  )
}

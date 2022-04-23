import React, { FC } from 'react'

import { useDeleteConfirmationPopupToggle, useModalOpen } from 'state/application/hooks'
import { ApplicationModal } from 'state/application/actions'
import { TYPE } from 'theme'
import { RowBetween } from 'components/Row'
import { ButtonGradientBorder, ButtonIXSGradient } from 'components/Button'
import { SmallModal, SmallModalWrapper } from './styleds'

interface Props {
  confirmCallback: any
  callbackParams: any[]
}

export const DeleteConfirmationPopup: FC<Props> = ({ confirmCallback, callbackParams }: Props) => {
  const isOpen = useModalOpen(ApplicationModal.DELETE_CONFIRMATION)
  const toggle = useDeleteConfirmationPopupToggle()

  const onClose = () => {
    toggle()
  }

  return (
    <SmallModal isOpen={isOpen} onDismiss={onClose} minHeight={false} maxHeight={'fit-content'}>
      <SmallModalWrapper data-testid="deleteConfirmation" style={{ width: 400 }}>
        <TYPE.title3 marginBottom="32px" textAlign="center">
          Are you sure?
        </TYPE.title3>
        <RowBetween>
          <ButtonIXSGradient
            onClick={confirmCallback ? () => confirmCallback.apply(this, callbackParams) : () => null}
            style={{ width: 150 }}
          >
            Yes
          </ButtonIXSGradient>
          <ButtonGradientBorder onClick={toggle} style={{ width: 150 }}>
            Cancel
          </ButtonGradientBorder>
        </RowBetween>
      </SmallModalWrapper>
    </SmallModal>
  )
}

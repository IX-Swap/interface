import React, { FC } from 'react'

import { useDeleteTokenPopupToggle, useModalOpen } from 'state/application/hooks'
import { ApplicationModal } from 'state/application/actions'
import { TYPE } from 'theme'
import { RowBetween } from 'components/Row'
import { ButtonOutlined, PinnedContentButton } from 'components/Button'
import { SmallModal, SmallModalWrapper } from './styleds'
import { deleteToken, useFetchIssuers } from 'state/secCatalog/hooks'

interface Props {
  tokenId: number
}

export const DeleteTokenConfirmationPopup: FC<Props> = ({ tokenId }: Props) => {
  const isOpen = useModalOpen(ApplicationModal.TOKEN_DELETE_CLAIM)
  const toggle = useDeleteTokenPopupToggle()
  const getIssuers = useFetchIssuers()

  const onClose = () => {
    toggle()
  }

  const handleDeleteToken = async () => {
    await deleteToken(tokenId)
    toggle()
    getIssuers()
  }

  return (
    <SmallModal isOpen={isOpen} onDismiss={onClose} minHeight={false} maxHeight={'fit-content'}>
      <SmallModalWrapper data-testid="deleteTokenConfirmation" style={{ width: 400 }}>
        <TYPE.title3 marginBottom="32px" textAlign="center">
          Are you sure?
        </TYPE.title3>
        <div style={{ display: 'flex', gap: 24 }}>
          <PinnedContentButton onClick={handleDeleteToken} style={{ flex: 1, height: 48, fontSize: 14 }}>
            Yes
          </PinnedContentButton>
          <ButtonOutlined style={{ flex: 1, background: '#fff', fontSize: 14, height: 48 }} onClick={toggle}>
            Cancel
          </ButtonOutlined>
        </div>
      </SmallModalWrapper>
    </SmallModal>
  )
}

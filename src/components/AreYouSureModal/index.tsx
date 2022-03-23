import React from 'react'
import { t } from '@lingui/macro'
import styled from 'styled-components'

import { ModalBlurWrapper, ModalContentWrapper, CloseIcon } from 'theme'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import { ButtonPinkBorder, ButtonIXSGradient } from 'components/Button'

interface Props {
  isOpen: boolean
  onAccept: () => void
  onDecline: () => void
  acceptText?: string
  declineText?: string
  title?: string
  info?: string
}

export const AreYouSureModal = ({ isOpen, title, acceptText, declineText, info, onAccept, onDecline }: Props) => {
  return (
    <RedesignedWideModal isOpen={isOpen} onDismiss={onDecline} maxHeight={'360px'}>
      <ModalBlurWrapper data-testid="areYouSureModal" style={{ minWidth: '360px' }}>
        <ModalContent>
          <Title>
            {<span>{t`${title || 'Are you sure?'}`}</span>}
            <CloseIcon data-testid="cross" onClick={onDecline} />
          </Title>
          {info && <Info>{t`${info}`}</Info>}
          <ButtonsContainer>
            <ButtonIXSGradient onClick={onAccept}>{t`${acceptText || 'Yes'}`}</ButtonIXSGradient>
            <ButtonPinkBorder onClick={onDecline}>{t`${declineText || 'No'}`}</ButtonPinkBorder>
          </ButtonsContainer>
        </ModalContent>
      </ModalBlurWrapper>
    </RedesignedWideModal>
  )
}

const ModalContent = styled(ModalContentWrapper)`
  padding: 29px 38px 42px 42px;
  border-radius: 20px;
`

const Title = styled.div`
  font-weight: 600;
  font-size: 22px;
  margin-bottom: 27px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Info = styled.div`
  font-size: 16px;
  margin-bottom: 27px;
`

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 16px;
  > button {
    width: 100%;
  }
`

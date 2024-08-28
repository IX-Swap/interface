import React from 'react'
import { Trans, t } from '@lingui/macro'
import styled from 'styled-components'

import { ModalBlurWrapper, ModalContentWrapper, CloseIcon, MEDIA_WIDTHS } from 'theme'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import { ButtonPinkBorder, ButtonIXSGradient, PinnedContentButton } from 'components/Button'

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
            {
              <span>
                <Trans>{`${title || 'Are you sure?'}`}</Trans>
              </span>
            }
            <CloseIcon data-testid="cross" onClick={onDecline} />
          </Title>
          {info && (
            <Info>
              <Trans>{`${info}`}</Trans>
            </Info>
          )}
          <ButtonsContainer>
            <PinnedContentButton color={'black'} onClick={onAccept}>
              <Trans>{`${acceptText || 'Yes'}`}</Trans>
            </PinnedContentButton>
            <Declinedbutton onClick={onDecline}>
              <Trans>{`${declineText || 'No'}`}</Trans>
            </Declinedbutton>
          </ButtonsContainer>
        </ModalContent>
      </ModalBlurWrapper>
    </RedesignedWideModal>
  )
}

const Declinedbutton = styled(PinnedContentButton)`
  background: none;
  color: ${({ theme: { text11 } }) => text11};
  border: 1px solid #e6e6ff;
`

const ModalContent = styled(ModalContentWrapper)`
  // padding: 29px 38px 42px 42px;
  border-radius: 20px;

  @media (max-width: ${MEDIA_WIDTHS.upToExtraSmall}px) {
    padding: 29px 38px 42px 42px;
  }
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
    min-height: 40px;
    height: 40px;
  }
`

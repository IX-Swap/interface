import React from 'react'

import styled from 'styled-components'
import { ModalBlurWrapper, ModalContentWrapper, MEDIA_WIDTHS, CloseIcon, TYPE } from 'theme'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import { KycItem } from 'state/admin/actions'
import { ReactComponent as ArrowLeft } from '../../assets/images/newCross.svg'
import { IndividualFormV2 } from './IndividualFormV2'

interface Props {
  isOpen: boolean
  onClose: () => void
  data: KycItem
}

export const KycReviewModalV2 = ({ isOpen, onClose }: Props) => {
  return (
    <>
      <RedesignedWideModal isOpen={isOpen} onDismiss={onClose} scrollable>
        <ModalBlurWrapper touchable data-testid="kyc-review">
          <ModalContent style={{ minWidth: '45vh', padding: '0px' }}>
            <TitleContainer>
              <TYPE.label fontSize={'24px'}>Individual KYC</TYPE.label>
              <ArrowLeft style={{ cursor: 'pointer' }} data-testid="cross" onClick={onClose} />
            </TitleContainer>
            <Body>
              <IndividualFormV2 />
            </Body>
          </ModalContent>
        </ModalBlurWrapper>
      </RedesignedWideModal>
    </>
  )
}

const Body = styled.div`
  display: grid;
  row-gap: 35px;
`

const TitleContainer = styled.div`
  margin-bottom: 27px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const ModalContent = styled(ModalContentWrapper)`
  padding: 29px 38px 42px 42px;
  border-radius: 20px;
  min-width: 70vw;
  max-width: 70vw;
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    padding: 16px;
    // padding: 29px 5px 42px 5px;
    border-radius: 6px;
    min-width: 90vw;
    max-width: 90vw;
  }
`

import React from 'react'
import styled from 'styled-components'
import { Trans } from '@lingui/macro'
import { Download } from 'react-feather'

import { ModalLightBlurWrapper, ModalContentWrapper, MEDIA_WIDTHS, CloseIcon, EllipsisText } from 'theme'
import RedesignedLightWideModal from 'components/Modal/RedesignedLightWideModal'
import { ButtonGradient } from 'components/Button'
import { ReactComponent as Explore } from 'assets/images/exploreNew.svg'

const ModalContent = styled(ModalContentWrapper)`
  padding: 29px 38px 20px 42px;
  border-radius: 8px;
  color: ${(props) => props.theme.launchpad.colors.text.body};
  background-color: ${(props) => props.theme.launchpad.colors.background};
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    padding: 16px;
  }
`

const Title = styled.div`
  font-weight: 700;
  font-size: 20px;
  width: 100%;
  margin-bottom: 27px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #292933;
`

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;
`

const Column = styled.div`
  border: 1px solid #e6e6ff;
  padding: 24px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Image = styled.img`
  max-width: 100%;
`

const Text = styled.div`
  flex: 1;
  margin: 0 16px;
`

const IconWrapper = styled.div`
  /* You can style the icon wrapper as needed */
`

const StyledIcon = styled.div`
  /* Style your icon as needed */
`

interface Props {
  isOpen: boolean
  onClose: () => void
}

const data = [
  { imageSrc: 'image1.jpg', text: 'Transak' },
  { imageSrc: 'image2.jpg', text: 'Moonpay' },
  { imageSrc: 'image3.jpg', text: 'Ramp' },
  { imageSrc: 'image4.jpg', text: 'Sardine' },
  { imageSrc: 'image5.jpg', text: 'Banxa' },
  { imageSrc: 'image6.jpg', text: 'dtcpay' },
]

export const BuyModal = ({ isOpen, onClose }: Props) => {
  return (
    <>
      <RedesignedLightWideModal isOpen={isOpen} onDismiss={onClose}>
        <ModalContent>
          <TitleContainer>
            <Title>
              <Trans>Select any of these platforms to buy stablecoin</Trans>
            </Title>
          </TitleContainer>
          <Row>
            {data.map((item, index) => (
              <Column key={index}>
                <Image src={item.imageSrc} alt={`Image ${index + 1}`} />
                <Text>{item.text}</Text>
                <IconWrapper>
                  <Explore />
                </IconWrapper>
              </Column>
            ))}
          </Row>
        </ModalContent>
      </RedesignedLightWideModal>
    </>
  )
}

export default BuyModal

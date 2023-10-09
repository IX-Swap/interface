import React from 'react'
import styled from 'styled-components'
import { Trans } from '@lingui/macro'
import { Download } from 'react-feather'

import { ModalLightBlurWrapper, ModalContentWrapper, MEDIA_WIDTHS, CloseIcon, EllipsisText } from 'theme'
import RedesignedLightWideModal from 'components/Modal/RedesignedLightWideModal'
import { ButtonGradient } from 'components/Button'
import { ReactComponent as Explore } from 'assets/images/exploreNew.svg'
import Transak from 'assets/images/Transak Logo.svg'
import MoonPay from 'assets/images/Moonpay Logo 1.svg'
import Ramp from 'assets/images/Ramp Logo.svg'
import Sardine from 'assets/images/Sardine Logo 1.svg'
import Banxa from 'assets/images/Banxa Logo 1.svg'
import DTCPay from 'assets/images/dtcpay logo 1.svg'

const ModalContent = styled(ModalContentWrapper)`
  padding: 29px 38px 20px 42px;
  border-radius: 8px;
  width: 900px;
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
  cursor: pointer;
  &:hover {
    background-color: #f7f7fa;
  }
`

const Image = styled.img`
  max-width: 100%;
`

const Text = styled.div`
  flex: 1;
  margin: 0 16px;
  color: #292933;
  font-size: 16px;
  font-weight: 700;
`

const IconWrapper = styled.div`
  /* You can style the icon wrapper as needed */
`

const StyledIcon = styled.div`
  /* Style your icon as needed */
`

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
`

interface Props {
  isOpen: boolean
  onClose: () => void
}

const data = [
  { imageSrc: Transak, text: 'Transak', url: 'https://global.transak.com' },
  { imageSrc: MoonPay, text: 'Moonpay', url: 'https://buy.moonpay.com' },
  { imageSrc: Ramp, text: 'Ramp', url: 'https://ramp.network/buy' },
  { imageSrc: Sardine, text: 'Sardine', url: 'https://crypto.sardine.ai/buy' },
  { imageSrc: Banxa, text: 'Banxa', url: 'https://openocean.banxa.com/' },
  { imageSrc: DTCPay, text: 'dtcpay', url: 'https://dtcpay.com/registration' },
]

export const BuyModal = ({ isOpen, onClose }: Props) => {
  const openUrlInNewTab = (url: string) => {
    window.open(url, '_blank')
  }
  return (
    <>
      <RedesignedLightWideModal isOpen={isOpen} onDismiss={onClose}>
        <ModalContent>
          <Wrapper>
            <CloseIcon data-testid="cross" onClick={onClose} />
          </Wrapper>
          <TitleContainer>
            <Title>
              <Trans>Select any of these platforms to buy stablecoin</Trans>
            </Title>
          </TitleContainer>
          <Row>
            {data.map((item, index) => (
              <a
                style={{ textDecoration: 'none' }}
                key={index}
                href={item.url} // Add the URL property to your data
                target="_blank" // Open in a new tab
                rel="noopener noreferrer" // Recommended for security
                onClick={(e) => {
                  e.preventDefault() // Prevent the default behavior of anchor tag
                  openUrlInNewTab(item.url) // Open the URL in a new tab
                }}
              >
                <Column key={index}>
                  <img src={item.imageSrc} alt={`Image ${index + 1}`} />
                  <Text>{item.text}</Text>
                  <IconWrapper>
                    <Explore />
                  </IconWrapper>
                </Column>
              </a>
            ))}
          </Row>
        </ModalContent>
      </RedesignedLightWideModal>
    </>
  )
}

export default BuyModal

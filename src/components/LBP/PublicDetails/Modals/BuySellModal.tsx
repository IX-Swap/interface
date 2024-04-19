import React from 'react'
import styled from 'styled-components'
import { ModalBlurWrapper, ModalContentWrapper, TYPE, CloseIcon } from 'theme'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import { PinnedContentButton } from 'components/Button'
import { Line } from 'components/Line'
import { ReactComponent as Serenity } from '../../../../assets/images/serenity.svg'
import { ReactComponent as USDC } from '../../../../assets/images/usdcNew.svg'

interface BuyModalProps {
  isOpen: boolean
  onClose: () => void
  buyBtnText: string
  assetValue: string
  shareValue: string
}

interface ButtonProps {
    buttonText: string;
  }
  

const BuySellModal = ({ isOpen, onClose, buyBtnText }: BuyModalProps) => {
  return (
    <RedesignedWideModal isOpen={isOpen} onDismiss={onClose} minHeight={false} maxHeight={'fit-content'} scrollable>
      <CustomModalBlurWrapper>
        <ModalContent>
          <Header>
            <Title>Confirm Transaction</Title>
            <CloseIcon onClick={onClose} />
          </Header>
          <Body>
            Summary
            <Line style={{margin: '15px 0px'}} />
            <TokenWrapper>
              <TYPE.subHeader1 color={'#8F8FB2'}>Project Token Amount</TYPE.subHeader1>
              <AmounWrapper>
                <TYPE.black>1,000.00</TYPE.black>
                <Serenity />
              </AmounWrapper>
            </TokenWrapper>
            <Line style={{margin: '15px 0px'}} />
            <TokenWrapper>
              <TYPE.subHeader1 color={'#8F8FB2'}>Network Fee</TYPE.subHeader1>
              <AmounWrapper>
                <TYPE.black>$1.25</TYPE.black>
                <USDC />
              </AmounWrapper>
            </TokenWrapper>
          </Body>
          <ButtonWrapper>
          <CancelButton onClick={onClose}>Cancel</CancelButton>
          <ConfirmButton buttonText={buyBtnText}>{buyBtnText.charAt(0).toUpperCase() + buyBtnText.slice(1)}</ConfirmButton>
          </ButtonWrapper>
        </ModalContent>
      </CustomModalBlurWrapper>
    </RedesignedWideModal>
  )
}

export default BuySellModal

const CustomModalBlurWrapper = styled(ModalBlurWrapper)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
`

const ModalContent = styled(ModalContentWrapper)`
  padding: 30px;
`
const Header = styled.div`
  font-weight: 600;
  font-size: 22px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between; ;
`

const Title = styled.div`
  font-weight: 600;
  font-size: 22px;
  margin-bottom: 27px;
  display: flex;
`
const Body = styled.div`
  background: #f7f7fa;
  border: 1px solid #e6e6ff;
  padding: 30px;
  margin-bottom: 20px;
`

const TokenWrapper = styled.div`
display: flex;
justify-content: space-between;
`

const AmounWrapper = styled.div`
display: flex;
gap: 7px;
`

const ButtonWrapper = styled.div`
display: flex;
gap: 7px;
`

const CancelButton = styled(PinnedContentButton)`
background: #FFFFFF;
border: 1px solid #6666FF33;
color: #6666FF
`
const ConfirmButton = styled(PinnedContentButton)<ButtonProps>`
  background: ${props => props.buttonText === 'buy' ? '#1FBA66' : '#FF6161'};
color: #ffffff;
`;

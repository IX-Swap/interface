import React from 'react'
import styled from 'styled-components'

import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import { text12, text5 } from 'components/LaunchpadMisc/typography'
import { CloseIcon, MEDIA_WIDTHS } from 'theme'
import { InvestmentTypeInfo } from './InvestmentTypeInfo'
import { OfferGeneralInfo } from 'components/LaunchpadOffer/OfferSidebar/OfferDetails'
import { OfferSaleAllocation, OfferPreSaleInfo } from 'components/LaunchpadOffer/OfferSidebar/OfferSaleAllocation'
import { OfferStage } from 'components/LaunchpadOffer/OfferSidebar/OfferStage'
import { isMobile } from 'react-device-detect'
import { OfferTerms } from 'components/LaunchpadOffer/OfferSidebar/OfferTerms'
import { PinnedContentButton } from 'components/Button'

interface Props {
  isModalOpen: boolean
  closeModal: () => void
  offer: any
}

const handleRedirect = () => {
    window.location.href = '/#/kyc';
  };

export const PreviewModal = ({ isModalOpen, closeModal, offer }: Props) => {
  return (
    <RedesignedWideModal maxHeight={'100vh'} isOpen={isModalOpen} onDismiss={closeModal}>
      <ModalContainer style={{ width: '100%' }}>
        <CloseIcon
          style={{ position: 'absolute', right: '30px', color: '#B8B8CC', top: isMobile ? '30px' : '' }}
          data-testid="cross"
          onClick={closeModal}
        />
        <ModalContent style={{ width: '100%' }}>
          <SummaryContainer>
            <TitleRow>
              <div>
                <ProfilePicture src={offer?.profilePicture?.public} />
              </div>
              <div>
                <SummaryTitle>{offer?.title}</SummaryTitle>
                <SummaryDescription>{offer?.shortDescription}</SummaryDescription>
                <InvestmentTypeInfo industry={offer?.industry} type={offer?.type} status={offer?.status} />
              </div>
            </TitleRow>
          </SummaryContainer>
          <OverviewContainer>
            <OverviewTitle>Overview</OverviewTitle>
            <OverviewContent>{offer?.longDescription}</OverviewContent>
          </OverviewContainer>
          <div style={{ display: isMobile ? 'block' : 'flex' }}>
            <div style={{ marginRight: '30px' }}>
              <div style={{ marginTop: '0px', border: '1px solid #E6E6FF', padding: isMobile ? '20px 0px' : '20px' }}>
                <SaleAllocationTitle style={{marginLeft: '20px', marginBottom: '20px'}}>Main Information</SaleAllocationTitle>
                <OfferGeneralInfo {...offer} />
              </div>
              <div style={{ marginTop: '15px', border: '1px solid #E6E6FF', padding: isMobile ? '20px 0px ' : '20px' }}>
                <OfferStage frames={offer.timeframe} />
              </div>
            </div>
            <div>
              <div style={{ marginBottom: '10px', marginTop: isMobile ? '15px' : '' }}>
                <OfferSaleAllocation {...offer} />
              </div>
              <div style={{ marginTop: '15px', border: '1px solid #E6E6FF', padding: isMobile ? '20px 0px ' : '20px' }}>
                <OfferTerms terms={offer?.terms} />
              </div>

              {offer.hasPresale && (
                <div style={{ marginTop: '10px' }}>
                  <OfferPreSaleInfo {...offer} />
                </div>
              )}
            </div>
          </div>
          <div
            style={{
              width: '100%',
              padding: '16px',
              background: '#F7F7F8',
              border: '1px solid #E6E6FF',
              marginTop: '20px',
              borderRadius: '8px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '16px', fontWeight: '800', color: '#292933',  width: isMobile ? '100%' : '60%' }}>
                This deal is only available to KYC-ed users
              </span>
             {!isMobile && <PinnedContentButton onClick={handleRedirect} style={{ width: '190px' }}>Complete KYC</PinnedContentButton>} 
            </div>
            <div>
              <span style={{ color: '#666680', fontSize: '13px', fontWeight: '600' }}>
                Become a KYC-ed user by connecting your wallet and completing your KYC.
              </span>

            </div>
            {isMobile && <PinnedContentButton onClick={handleRedirect} style={{ marginTop: '18px' }}>Complete KYC</PinnedContentButton>} 
          </div>
        </ModalContent>
      </ModalContainer>
    </RedesignedWideModal>
  )
}

const SaleAllocationTitle = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 14px;
  color: #292933;
`

const OverviewContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 5px;
  margin: 10px 0;
  white-space: pre-line;
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    padding: 0px 20px;
  }
`

const OverviewTitle = styled.div`
  font-weight: 800;
  font-size: 20px;
  line-height: 120%;

  color: ${(props) => props.theme.launchpad.colors.text.title};
`

const OverviewContent = styled.div`
  font-weight: 400;
  font-size: 16px;

  color: ${(props) => props.theme.launchpad.colors.text.body};
`

const SummaryContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 1rem;
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    margin: 20px 20px 0px 20px;
  }
`

const SummaryTitle = styled.div`
  font-weight: 800;
  font-size: 20px;
  line-height: 110%;
  color: ${(props) => props.theme.launchpad.colors.text.title};
  width: 700px;
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    width: 300px;
  }
`

const SummaryDescription = styled.div`
  ${text12}
  color: #666680;
  margin-top: 5px;
  width: 600px;
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    width: 300px;
  }
`

const TitleRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1.5rem;

  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    display: grid;
  }
`

const ProfilePicture = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 6px;
`

const ModalContainer = styled.div`
  background: white;
  padding: 35px 35px 20px 35px;
  border-radius: 6px;
  backdrop-filter: blur(20px);
  @media (max-width: 768px) {
    width: calc(100% - 24px);
    padding: 0px;
    border-radius: 12px;
    margin: 0 auto;
  }
`

const ModalContent = styled.div`
  width: 450px;
  overflow-y: auto;
  max-height: 90vh;
  border-radius: 20px;
  @media (max-width: 768px) {
    width: 100%;
    padding: 12px;
    border-radius: 12px;
    background: white;
  }
`

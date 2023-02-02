import React from 'react'
import styled, { useTheme } from 'styled-components'

import { useHistory } from 'react-router-dom'
import { useGetOffer } from 'state/launchpad/hooks'

import { Loader } from 'components/LaunchpadOffer/util/Loader'
import { LoaderContainer } from 'components/LaunchpadMisc/styled'

import { Asset, Offer, OfferFile, OfferFileType } from 'state/launchpad/types'

import { OfferStage } from 'components/LaunchpadOffer/OfferSidebar/OfferStage'
import { OfferTerms } from 'components/LaunchpadOffer/OfferSidebar/OfferTerms'
import { OfferContact } from 'components/LaunchpadOffer/OfferSidebar/OfferContact'
import { OfferGeneralInfo } from 'components/LaunchpadOffer/OfferSidebar/OfferDetails'
import { OfferAdditionalDocs } from 'components/LaunchpadOffer/OfferSidebar/OfferAdditionalDocs'
import { OfferPreSaleInfo, OfferSaleAllocation } from 'components/LaunchpadOffer/OfferSidebar/OfferSaleAllocation'

import { InformationFormValues } from '../Information/types'
import { ArrowLeft } from 'react-feather'
import { OutlineButton } from 'components/LaunchpadMisc/buttons'
import { ReviewSidebar } from './Sidebar'

interface Props {
  values: InformationFormValues
  onSubmit: (draft: boolean) => void
  onClose: () => void
}

export const OfferReview: React.FC<Props> = (props) => {
  const theme = useTheme()

  return (
    <ReviewModalContainer>
      <ReviewContainer>
        <Sidebar>
          <ReviewSidebar offer={props.values} onSubmit={props.onClose} onClose={props.onClose} />
        </Sidebar>

        <Title>
          <OutlineButton background={theme.launchpad.colors.background} onClick={props.onClose} padding="1rem 0.75rem">
            <ArrowLeft color={theme.launchpad.colors.primary} />
          </OutlineButton>
          Review
        </Title>
        
        <Container area="stages">
          <OfferStage frames={props.values.timeframe} />
        </Container>

        <Container area="company-information">
          <OfferGeneralInfo 
            minInvestment={props.values.minInvestment}
            maxInvestment={props.values.maxInvestment}
            country={props.values.country}
            tokenPrice={props.values.tokenPrice?.toString()}
            tokenSymbol={props.values.tokenTicker}
            investmentType={props.values.investmentType}
            investingTokenSymbol={props.values.tokenType}
          />
        </Container>


        <Container area="total-funding-size">
          <OfferSaleAllocation 
            hardCap={props.values.hardCap}
            softCap={props.values.softCap}
            investingTokenSymbol={props.values.tokenType}
            presaleAlocated={props.values.presaleAlocated}
            borderless
          />
        </Container>

        <Container area="presale-size">
          <OfferPreSaleInfo 
            investingTokenSymbol={props.values.tokenType}
            presaleMaxInvestment={props.values.presaleMaxInvestment}
            presaleMinInvestment={props.values.presaleMinInvestment}
            borderless
          />
        </Container>
        
        <Container area="terms">
          <OfferTerms terms={props.values.terms} />
        </Container>
        <Container area="additional-documents">
          <OfferAdditionalDocs 
            files={props.values.additionalDocuments
              .filter(x => x.file)
              .map(x => ({ file: { id: x.file?.id, name: x.name } as Asset, type: OfferFileType.document, videoUrl: '' }))
            } 
          />
        </Container>
        <Container area="contact">
          <OfferContact email={props.values.email} />
        </Container>
      </ReviewContainer>
    </ReviewModalContainer>
  )
}

const ReviewModalContainer = styled.div`
  position: fixed;
  top: 0; bottom: 0;
  left: 0; right: 0;

  z-index: 40;

  background: ${props => props.theme.launchpad.colors.background};

  overflow: auto;
`

const ReviewContainer = styled.div`
  display: grid;

  grid-template-columns: 3fr 3fr 2fr;
  grid-template-rows: repeat(5, auto);
  grid-template-areas:
    "title title title"
    "stages company-information sidebar"
    "total-funding-size presale-size ."
    "terms additional-documents ."
    "terms contact .";

  gap: 1.25rem;


  max-width: 1180px;
  margin: 3rem auto;

`

const Title = styled.div`
  grid-area: title;

  display: flex;
  align-items: center;
  gap: 1rem;

  font-style: normal;
  font-weight: 800;
  font-size: 32px;

  line-height: 120%;
  letter-spacing: -0.03em;

  color: ${props => props.theme.launchpad.colors.text.title};
`

const Sidebar = styled.aside`
  grid-area: sidebar;

  padding: 1.5rem 2rem;

  border: 1px solid ${props => props.theme.launchpad.colors.border.default};
  border-radius: 6px;
`

const Container = styled.div<{ area: string }>`
  grid-area: ${props => props.area};

  padding: 1.5rem 2rem;

  border: 1px solid ${props => props.theme.launchpad.colors.border.default};
  border-radius: 6px;
`

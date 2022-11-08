import React from 'react'
import moment from 'moment'
import styled from 'styled-components'

import { InvestmentOffer } from './utils'


interface Props {
  offer: InvestmentOffer
}

export const Pinned: React.FC<Props> = (props) => {
  return (
    <PinnedWrapper>
      <PinnedContainer>
        <PinnedImageContainer>
          <PinnedImage src={props.offer.image}/>
          <PinnerCategory>{props.offer.category}</PinnerCategory>
        </PinnedImageContainer>

        <PinnedContent>
          <PinnedContentDate>{moment(props.offer.date).format('MMMM D, YYYY')}</PinnedContentDate>
          <PinnedContentTitle>{props.offer.title}</PinnedContentTitle>
          <PinnedContentBody>{props.offer.description}</PinnedContentBody>
          <PinnedContentButton>Invest</PinnedContentButton>
        </PinnedContent>
      </PinnedContainer>
    </PinnedWrapper>
  )
}

const PinnedWrapper = styled.div`
  width: 100vw;
  height: 500px;

  background-color: ${props => props.theme.launchpad.colors.foreground};

  padding: 2rem;
  margin: 2rem 0;
`

const PinnedContainer = styled.div`
  display: flex;

  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;

  gap: 2rem;

  margin: 0 10%;
`

const PinnedImageContainer = styled.div`
  position: relative;
`

const PinnerCategory = styled.div`
  position: absolute;

  top: 1rem;
  right: 1rem;

  color: ${props => props.theme.launchpad.colors.text.light}
`

const PinnedImage = styled.img`
  border-radius: 8px;
`

const PinnedContent = styled.div`
  display: flex;

  flex-flow: column nowrap;
  justify-content: center;
  align-items: flex-start;

  gap: 1rem;

  max-width: 500px;
`

const PinnedContentDate = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 13px;

  line-height: 16px;
  letter-spacing: -0.02em;

  color: ${props => props.theme.launchpad.colors.text.caption};
`

const PinnedContentTitle = styled.div`
  font-style: normal;
  font-weight: 800;
  font-size: 40px;

  line-height: 110%;
  letter-spacing: -0.03em;

  color: ${props => props.theme.launchpad.colors.text.title};
`
const PinnedContentBody = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;

  line-height: 140%;
  letter-spacing: -0.02em;

  color: ${props => props.theme.launchpad.colors.text.body};
`

const PinnedContentButton = styled.button`
  color: ${props => props.theme.launchpad.colors.text.light};
  background-color: ${props => props.theme.launchpad.colors.primary};
  border-radius: 6px;

  text-align: center;

  padding: 0.75rem 3rem;

  border: unset;

  max-width: fit-content;
`

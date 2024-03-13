import React from 'react'
import styled from 'styled-components'
import { OfferPresaleStatistics } from 'state/launchpad/types'
import { text10, text51 } from 'components/LaunchpadMisc/typography'
import { MEDIA_WIDTHS } from 'theme'

interface Props {
  data: OfferPresaleStatistics
}
interface RowProps {
  title: string
  mainValue: string
  subValue?: string
  small?: boolean
}

const InfoRow = (item: RowProps) => {
  return (
    <FlexRows>
      <RowTitle>{item.title}</RowTitle>
      <MainValue small={!!item.small}>{item.mainValue}</MainValue>
      {item.subValue && <SubValue small={!!item.small}>{item.subValue}</SubValue>}
      {/* <FlexColumns>
      </FlexColumns> */}
    </FlexRows>
  )
}

export const OfferWhitelistInfo = ({ data }: Props) => {
  if (!data) {
    return <></>
  }
  return (
    <Container>
      <Title>Whitelisting for Register To invest</Title>
      <GridContainer>
        <GridItem gridArea="row1">
          <InfoRow title="Applicants" mainValue={data.applicants.toLocaleString()} />
        </GridItem>
        <GridItem gridArea="separator1">
          <VerticalLine />
        </GridItem>
        <GridItem gridArea="row2">
          <InfoRow
            title="Do you wish to invest in this deal?"
            mainValue={data.agreedToInvest.toLocaleString()}
            subValue={data.applicants.toLocaleString()}
          />
        </GridItem>
        <GridItem gridArea="separator2">
          <VerticalLine />
        </GridItem>
        <GridItem gridArea="row3">
          <InfoRow
            title="How much will be your estimated investment?"
            mainValue={data.wishInvestmentAvg.toLocaleString() + ' on Average'}
            subValue={data.wishInvestmentTotal.toLocaleString() + ' total'}
            small
          />
        </GridItem>
      </GridContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
`
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1px 1fr 1px 1fr;
  grid-template-rows: auto;
  grid-template-areas: 'row1 separator1 row2 separator2 row3';
  gap: 32px;

  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    display: block;
    // justify-content: space-between;
  }
`
const GridItem = styled.div<{ gridArea: string }>`
  grid-area: ${(props) => props.gridArea};
`
const Title = styled.div`
  ${text51}
  color: ${(props) => props.theme.launchpad.colors.text.title};
  margin-bottom: 17px;
`
const FlexRows = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
const VerticalLine = styled.div`
  width: 1px;
  background: ${(props) => props.theme.launchpad.colors.accent};
  opacity: 0;
  height: 100%;
`
const RowTitle = styled.div`
  ${text10}
  color: ${(props) => props.theme.launchpad.colors.text.bodyAlt};
  opacity: 0.8;
  max-width: 100%;
`
const FlexColumns = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
`
const MainValue = styled.div<{ small: boolean }>`
  font-weight: 700;
  line-height: 120%;
  letter-spacing: -0.03em;
  color: ${(props) => props.theme.launchpad.colors.text.title};
  font-size: ${(props) => (props.small ? '16px' : '17px')};
`
const SubValue = styled.div<{ small: boolean }>`
  line-height: 150%;
  letter-spacing: -0.02em;
  color: ${(props) => props.theme.launchpad.colors.text.bodyAlt};
  opacity: 0.8;

  font-size: ${(props) => (props.small ? '16px' : '13px')};
  margin-top: ${(props) => (props.small ? 'none' : '8px')};
  font-weight: ${(props) => (props.small ? '700' : '500')};
`

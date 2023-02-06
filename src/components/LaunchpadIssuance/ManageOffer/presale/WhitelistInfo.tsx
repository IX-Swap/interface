import React from 'react'
import styled from 'styled-components'
import { OfferPresaleStatistics } from 'state/launchpad/types'

interface Props {
  data: OfferPresaleStatistics;
}
interface RowProps {
  title: string;
  mainValue: string;
  subValue?: string;
  small?: boolean;
  isMiddle?: boolean;
}

const InfoRow = (item: RowProps) => {
  return (
    <FlexRows>
      {item.isMiddle && <VerticalLine />}
      <RowTitle>{item.title}</RowTitle>
      <FlexColumns>
        <MainValue small={!!item.small}>{item.mainValue}</MainValue>
        {item.subValue && (
          <SubValue small={!!item.small}>{item.subValue}</SubValue>
        )}
      </FlexColumns>
      {item.isMiddle && <VerticalLine />}
    </FlexRows>
  );
}

export const OfferWhitelistInfo = ({ data }: Props) => {
  if (!data) {
    return (<></>);
  }
  return (
    <Container>
      <Title>Whitelisting for Register to invest</Title>
      <GridContainer>
        <GridItem>
          <InfoRow
            title="Applicants"
            mainValue={data.applicants.toLocaleString()}
          />
        </GridItem>
        <GridItem>
          <InfoRow
            title="Do you wish to invest in this investment?"
            mainValue={data.agreedToInvest.toLocaleString()}
            subValue={data.applicants.toLocaleString()}
            isMiddle
          />
        </GridItem>
        <GridItem>
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

// todo redo as proper grid
// todo colors
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const GridContainer = styled.div`
  display: grid; 
  grid-template-columns: 1fr 1fr 1fr; 
  grid-template-rows: auto; 
  grid-template-areas:
    "row1 row2 row3"
`;
const GridItem = styled.div`
  display: grid;  
`;
const Title = styled.div`
  font-weight: 700;
  font-size: 16px;
  line-height: 120%;
  letter-spacing: -0.03em;
  color: #292933;
  margin-bottom: 17px;
`;
const FlexRows = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const VerticalLine = styled.div`
  width: 1px;
  background: #E6E6FF;
  opacity: 0.8;
  height: 100%;
  margin: 0 32px;
`; // todo this is small, fix it
const RowTitle = styled.div`
  font-weight: 500;
  font-size: 13px;
  line-height: 150%;
  letter-spacing: -0.02em;
  color: #8F8FB2;
  opacity: 0.8;

  margin-right: 24px;
`;
const FlexColumns = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  // justify-content: center;
  justify-content: flex-start;
`;
const MainValue = styled.div<{ small: boolean }>`
  font-weight: 700;
  line-height: 120%;
  letter-spacing: -0.03em;
  color: #292933;
  font-size: ${props => props.small ? '16px' : '32px'};
`;
const SubValue = styled.div<{ small: boolean }>`
  line-height: 150%;
  letter-spacing: -0.02em;
  color: #8F8FB2;
  opacity: 0.8;

  font-size: ${props => props.small ? '16px' : '13px'};
  margin-top: ${props => props.small ? 'none' : '8px'};
  font-weight: ${props => props.small ? '700' : '500'};
`;
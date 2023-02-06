import React from 'react'
import styled, { useTheme } from 'styled-components'
import { ChevronRight, Info } from 'react-feather'
import { ManagedOffer, OfferStatus } from 'state/launchpad/types'
import { Tooltip } from 'components/Launchpad/InvestmentCard/Tooltip'
import { formatDates } from './utils'

interface IDateItem {
  title: string;
  subtitle: string;
  isCurrent: boolean;
  hideBottomBorder?: boolean;
}
const DateBlock = (item: IDateItem) => {
  const theme = useTheme();
  return (
    <DateBox hideBottomBorder={!!item.hideBottomBorder}>
      {item.isCurrent && (
        <CurrentTitleBlock>
          <ChevronRight fill={theme.launchpad.colors.primary} size="10" />
          <DateTitle isCurrent={true}>{item.title}</DateTitle>
        </CurrentTitleBlock>
      )}
      {!item.isCurrent && (
        <DateTitle isCurrent={false}>{item.title}</DateTitle>
      )}
      <DateSubtitle isCurrent={item.isCurrent}>{item.subtitle}</DateSubtitle>
    </DateBox>
  );
}

export const OfferStages = ({ offer }: { offer: ManagedOffer }) => {
  const theme = useTheme();
  const { timeframe } = offer as any; // todo fix
  // todo tooltip text
  return (
    <Container>
      <MainTitleBlock>
        <Title>Investment Stage</Title>
        <Tooltip title="Investments Stages" body="Stages are in chronological order. One step has to be done before the deal will move on to the next step. For further clarification, please reach out to your account manager.">
          <Info size="14" color={theme.launchpad.colors.text.caption} />
        </Tooltip>
      </MainTitleBlock>
      {offer.hasPresale && (
        <DateBlock
          title="Register to Invest"
          subtitle={formatDates(timeframe.whitelist, timeframe.preSale)}
          isCurrent={offer.status === OfferStatus.whitelist}
        />
      )}
      {offer.hasPresale && (
        <DateBlock
          title="Pre-Sale"
          subtitle={formatDates(timeframe.preSale, timeframe.sale)}
          isCurrent={offer.status === OfferStatus.preSale}
        />
      )}
      <DateBlock
        title="Public Sale"
        subtitle={formatDates(timeframe.sale, timeframe.closed)}
        isCurrent={offer.status === OfferStatus.sale}
      />
      <DateBlock
        title="Closed"
        subtitle={formatDates(timeframe.closed, timeframe.claim)}
        isCurrent={offer.status === OfferStatus.closed}
      />
      <DateBlock
        title="Token Claim"
        subtitle={formatDates(timeframe.claim)}
        isCurrent={offer.status === OfferStatus.claim}
        hideBottomBorder
      />
    </Container>
  )
}

// todo usetheme colors
const almostBlack = '#292933';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const Title = styled.span`
  color: ${almostBlack};
  font-weight: 600;
  font-size: 15px;
  margin-right: 8px;

  line-height: 120%;
  letter-spacing: -0.03em;
`;
const DateBox = styled.div<{ hideBottomBorder: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 11px 0;
  border-bottom: ${props => props.hideBottomBorder ? 'none' : '1px solid #E6E6FF'};
`;
const DateTitle = styled.span<{ isCurrent: boolean }>`
  font-size: 14px;
  line-height: 17px;
  letter-spacing: -0.02em;
  color: ${props => props.isCurrent ? '#6666FF' : '#666680'};
`;
const DateSubtitle = styled.span<{ isCurrent: boolean }>`
  font-size: 13px;
  line-height: 16px;
  letter-spacing: -0.02em;
  font-weight: ${props => props.isCurrent ? 500 : 400};
  color: ${props => props.isCurrent ? almostBlack : '#666680'};
`;
const CurrentTitleBlock = styled.div`
  display: flex;
  align-items: center;
`;
const MainTitleBlock = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 5px;
`;
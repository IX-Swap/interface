import React, { useMemo } from 'react'
import styled, { useTheme } from 'styled-components'
import { Info } from 'react-feather'
import { OfferStatus, ManagedOffer } from 'state/launchpad/types'
import { OfferFundRaiseIndicator } from 'components/LaunchpadOffer/OfferSidebar/OfferFundRaiseIndicator'
import { Tooltip } from 'components/Launchpad/InvestmentCard/Tooltip'
import { text55 } from 'components/LaunchpadMisc/typography'

interface ClosesIn {
  title?: string
  subtitle?: string
}

interface StatisticsItemType {
  title: string
  amountCurrent: number
  amountTotal: number
  participants: number
  maxInvestmentSize?: number
  minInvestmentSize?: number
  closesIn?: ClosesIn
  currency: string
  prefix: string
}

const StatisticsItem = (item: StatisticsItemType) => {
  const theme = useTheme()
  const {
    amountCurrent,
    amountTotal,
    currency,
    title,
    participants,
    maxInvestmentSize,
    minInvestmentSize,
    closesIn,
    prefix,
  } = item
  const offer = {
    totalInvestment: amountCurrent > amountTotal ? amountTotal : amountCurrent, // not show more than 100%
    hardCap: amountTotal,
  }
  return (
    <>
      <CustomGridArea area={`${prefix}-title`}>
        <Title>{title}</Title>
        <FlexVerticalCenter>
          <ChartBox>
            <OfferFundRaiseIndicator offer={offer} size={48} textSize={13} />
          </ChartBox>
          <FlexColumn>
            <AmountSubTitle>Amount Raised</AmountSubTitle>
            <AmountTitle>
              {amountCurrent.toLocaleString()}&nbsp;<GreyText>{currency}</GreyText>
            </AmountTitle>
            <AmountSubTitle>{amountTotal.toLocaleString() + ' ' + currency}</AmountSubTitle>
          </FlexColumn>
        </FlexVerticalCenter>
        <Line />
      </CustomGridArea>
      <CustomGridArea area={`${prefix}-participants`}>
        <FlexColumn>
          <TextWithIcon>
            <BlockLabel>Participants</BlockLabel>
            <Tooltip title="Participants" body="Number of investors that has participated in this deal">
              <Info size="14" color={theme.launchpad.colors.text.caption} />
            </Tooltip>
          </TextWithIcon>
          <BlockValue>{participants}</BlockValue>
        </FlexColumn>
        <Line />
      </CustomGridArea>
      {maxInvestmentSize && (
        <CustomGridArea area={`${prefix}-max`}>
          <FlexColumn>
            <BlockLabel>Max. Investment Size</BlockLabel>
            <BlockValue>{maxInvestmentSize.toLocaleString() + ' ' + currency}</BlockValue>
          </FlexColumn>
          <Line />
        </CustomGridArea>
      )}
      {minInvestmentSize && (
        <CustomGridArea area={`${prefix}-min`}>
          <FlexColumn>
            <BlockLabel>Min. Investment Size</BlockLabel>
            <BlockValue>{minInvestmentSize.toLocaleString() + ' ' + currency}</BlockValue>
          </FlexColumn>
        </CustomGridArea>
      )}
      {closesIn && (
        <CustomGridArea area={`${prefix}-closes`}>
          <FlexColumn>
            <BlockLabel>{closesIn.title}</BlockLabel>
            <ClosesSubtitle>{closesIn.subtitle}</ClosesSubtitle>
          </FlexColumn>
        </CustomGridArea>
      )}
    </>
  )
}

export const OfferStatistics = ({ offer }: { offer: ManagedOffer }) => {
  const {
    hasPresale,
    preSaleInvestment,
    presaleAlocated,
    preSaleParticipants,
    presaleMaxInvestment,
    presaleMinInvestment,
    saleInvestment,
    hardCap,
    saleParticipants,
    maxInvestment,
    minInvestment,
    totalInvestment,
    totalParticipants,
    daysTillClosed,
    investingTokenSymbol,
    status,
    hoursTillClosed,
  } = offer

  const closesIn = useMemo(() => {
    if ([OfferStatus.closed, OfferStatus.claim].includes(status)) {
      return { subtitle: 'The deal is closed' }
    } else {
      let subtitle = ''
      if (offer.daysTillClosed || offer.hoursTillClosed) {
        subtitle = daysTillClosed
          ? `${daysTillClosed} ${daysTillClosed > 1 ? 'Days' : 'Day'}`
          : `${hoursTillClosed > 1 ? `${hoursTillClosed} Hours` : 'Less than 1 Hour'}`
      }
      return {
        title: 'The deal closes in',
        subtitle,
      }
    }
  }, [status, hoursTillClosed, daysTillClosed])

  const Container = hasPresale ? PresaleContainer : NoPresaleContainer
  return (
    <Container>
      {hasPresale && (
        <StatisticsItem
          title="Pre-Sale"
          amountCurrent={preSaleInvestment}
          amountTotal={+presaleAlocated}
          participants={preSaleParticipants}
          maxInvestmentSize={+presaleMaxInvestment}
          minInvestmentSize={+presaleMinInvestment}
          currency={investingTokenSymbol}
          prefix="presale"
        />
      )}
      <StatisticsItem
        title="Public Sale"
        amountCurrent={saleInvestment}
        amountTotal={+hardCap - +presaleAlocated}
        participants={saleParticipants}
        maxInvestmentSize={+maxInvestment}
        minInvestmentSize={+minInvestment}
        currency={investingTokenSymbol}
        prefix="sale"
      />
      <StatisticsItem
        title="Total Funding"
        amountCurrent={totalInvestment}
        amountTotal={+hardCap}
        participants={totalParticipants}
        closesIn={closesIn}
        currency={investingTokenSymbol}
        prefix="total"
      />
    </Container>
  )
}

const PresaleContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: repeat(4, auto);
  gap: 16px 65px;
  grid-template-areas:
    'presale-title sale-title total-title'
    'presale-participants sale-participants total-participants'
    'presale-max sale-max .'
    'presale-min sale-min total-closes';
`
const NoPresaleContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(4, auto);
  gap: 16px 65px;
  grid-template-areas:
    'sale-title total-title'
    'sale-participants total-participants'
    'sale-max .'
    'sale-min total-closes';
`
const Title = styled.div`
  color: ${(props) => props.theme.launchpad.colors.text.title};
  ${text55}
  margin-bottom: 16px;
`
const AmountTitle = styled.span`
  font-weight: 700;
  font-size: 16px;
  color: ${(props) => props.theme.launchpad.colors.text.title};
  margin: 4px 0;
`
const AmountSubTitle = styled.span`
  color: ${(props) => props.theme.launchpad.colors.text.bodyAlt};
  opacity: 0.8;
  font-weight: 500;
  font-size: 13px;
`
const GreyText = styled.span`
  color: ${(props) => props.theme.launchpad.colors.text.bodyAlt};
  opacity: 0.8;
`
const FlexVerticalCenter = styled.div`
  display: flex;
  align-items: center;
`
const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`
const Line = styled.div`
  background: ${(props) => props.theme.launchpad.colors.accent};
  opacity: 0.8;
  height: 1px;
  width: 100%;
  margin-top: 16px;
`
const BlockLabel = styled.div`
  font-weight: 400;
  font-size: 13px;
  line-height: 16px;
  color: ${(props) => props.theme.launchpad.colors.text.caption};
`
const BlockValue = styled.div`
  font-weight: 700;
  font-size: 14px;
  color: ${(props) => props.theme.launchpad.colors.text.title};
`
const ClosesSubtitle = styled.div`
  font-weight: 700;
  font-size: 24px;
  color: ${(props) => props.theme.launchpad.colors.text.title};
`
const CustomGridArea = styled.div<{ area: string }>`
  grid-area: ${(props) => props.area};
`
const TextWithIcon = styled(FlexVerticalCenter)`
  display: flex;
  align-items: center;
  > div:first-child {
    margin-right: 8px;
  }
`
const ChartBox = styled(FlexColumn)`
  margin-right: 18px;
`

import React, { useMemo, useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { ChevronRight, Edit3, Info } from 'react-feather'
import { MiniOffer, OfferStatus } from 'state/launchpad/types'
import { Tooltip } from 'components/Launchpad/InvestmentCard/Tooltip'
import { formatDates } from './utils'
import { KEY_OFFER_STATUSES } from '../utils/constants'
import { useRole } from 'state/user/hooks'
import { EditTimeframeModal } from './edit'

interface Props {
  offer: MiniOffer
  refreshOffer: () => void
}
interface IDateItem {
  title: string
  subtitle: string
  isCurrent: boolean
  hideBottomBorder?: boolean
}
const DateBlock = (item: IDateItem) => {
  const theme = useTheme()
  return (
    <DateBox hideBottomBorder={!!item.hideBottomBorder}>
      {item.isCurrent && (
        <FlexVerticalCenter>
          <ChevronRight fill={theme.launchpad.colors.primary} size="10" />
          <DateTitle isCurrent={true}>{item.title}</DateTitle>
        </FlexVerticalCenter>
      )}
      {!item.isCurrent && <DateTitle isCurrent={false}>{item.title}</DateTitle>}
      <DateSubtitle isCurrent={item.isCurrent}>{item.subtitle}</DateSubtitle>
    </DateBox>
  )
}

export const OfferStages = ({ offer, refreshOffer }: Props) => {
  const { timeframe, status, hasPresale } = offer
  const theme = useTheme()
  const { isAdmin } = useRole()
  const [openEdit, setOpenEdit] = useState(false)

  const highlightedStatuses = useMemo(() => {
    const index = KEY_OFFER_STATUSES.findIndex((item) => item === status)
    if (index < 0) return []
    const allowedStatuses = KEY_OFFER_STATUSES.slice(0, index + 1)
    return allowedStatuses
  }, [status])
  const showEdit = isAdmin && status !== OfferStatus.claim

  const onEdit = () => {
    if (showEdit && !openEdit) {
      setOpenEdit(true)
    }
  }

  return (
    <Container>
      <EditTimeframeModal open={openEdit} setOpen={setOpenEdit} offer={offer} refreshOffer={refreshOffer} />
      <MainTitleBlock>
        <FlexVerticalCenter>
          <Title>Investment Stage</Title>
          <Tooltip
            title="Investments Stages"
            body="Stages are in chronological order. One step has to be done before the deal will move on to the next step. For further clarification, please reach out to your account manager."
          >
            <Info size="14" color={theme.launchpad.colors.text.caption} />
          </Tooltip>
        </FlexVerticalCenter>
        {showEdit && (
          <EditBox onClick={onEdit}>
            <Edit3 size="14" color={theme.launchpad.colors.text.bodyAlt} />
            <span>Edit</span>
          </EditBox>
        )}
      </MainTitleBlock>
      {hasPresale && (
        <DateBlock
          title="Register to Invest"
          subtitle={formatDates(timeframe.whitelist, timeframe.preSale)}
          isCurrent={highlightedStatuses.includes(OfferStatus.whitelist)}
        />
      )}
      {hasPresale && (
        <DateBlock
          title="Pre-Sale"
          subtitle={formatDates(timeframe.preSale, timeframe.sale)}
          isCurrent={highlightedStatuses.includes(OfferStatus.preSale)}
        />
      )}
      <DateBlock
        title="Public Sale"
        subtitle={formatDates(timeframe.sale, timeframe.closed)}
        isCurrent={highlightedStatuses.includes(OfferStatus.sale)}
      />
      <DateBlock
        title="Closed"
        subtitle={formatDates(timeframe.closed, timeframe.claim)}
        isCurrent={highlightedStatuses.includes(OfferStatus.closed)}
      />
      <DateBlock
        title="Token Claim"
        subtitle={formatDates(timeframe.claim)}
        isCurrent={highlightedStatuses.includes(OfferStatus.claim)}
        hideBottomBorder
      />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`
const Title = styled.span`
  color: ${(props) => props.theme.launchpad.colors.text.title};
  font-weight: 600;
  font-size: 15px;
  margin-right: 8px;

  line-height: 120%;
  letter-spacing: -0.03em;
`
const DateBox = styled.div<{ hideBottomBorder: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 11px 0;
  border-bottom: ${(props) => (props.hideBottomBorder ? 'none' : '1px solid #E6E6FF')};
`
const DateTitle = styled.span<{ isCurrent: boolean }>`
  font-size: 14px;
  line-height: 17px;
  letter-spacing: -0.02em;
  color: ${(props) =>
    props.isCurrent ? props.theme.launchpad.colors.primary : props.theme.launchpad.colors.text.body};
`
const DateSubtitle = styled.span<{ isCurrent: boolean }>`
  font-size: 13px;
  line-height: 16px;
  letter-spacing: -0.02em;
  font-weight: ${(props) => (props.isCurrent ? 500 : 400)};
  color: ${(props) =>
    props.isCurrent ? props.theme.launchpad.colors.text.title : props.theme.launchpad.colors.text.body};
  margin-top: 6px;
`
const FlexVerticalCenter = styled.div`
  display: flex;
  align-items: center;
`
const MainTitleBlock = styled(FlexVerticalCenter)`
  justify-content: space-between;
  padding-bottom: 5px;
`
const EditBox = styled(FlexVerticalCenter)`
  font-weight: 500;
  font-size: 13px;
  line-height: 16px;
  letter-spacing: -0.02em;
  color: ${(props) => props.theme.launchpad.colors.text.bodyAlt};

  cursor: pointer;
  svg {
    margin-right: 6px;
  }
`

import React, { useMemo, useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { ChevronRight, Edit3, Info } from 'react-feather'
import { MiniOffer, OfferStatus } from 'state/launchpad/types'
import { Tooltip } from 'components/Launchpad/InvestmentCard/Tooltip'
import { formatDateRange } from './utils'
import { KEY_OFFER_STATUSES } from '../utils/constants'
import { useRole } from 'state/user/hooks'
import { EditTimeframeModal } from './edit'
import { FlexVerticalCenter } from 'components/LaunchpadMisc/styled'
import { text49, text55, text8 } from 'components/LaunchpadMisc/typography'

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
  const [localTime, setLocalTime] = useState(new Date())

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

  const convertToLocalUTC = () => {
    const localTimestamp = localTime.getTime()
    const utcTimestamp = localTimestamp - localTime.getTimezoneOffset() * 60 * 1000
    const utcDate = new Date(utcTimestamp)
    const newString = utcDate.toString().split(' ')[5]
    return `${newString.slice(0, 6)}:${newString.slice(6, 8)}`
  }

  const utcTime = convertToLocalUTC()

  return (
    <Container>
      <EditTimeframeModal open={openEdit} setOpen={setOpenEdit} offer={offer} refreshOffer={refreshOffer} />
      <MainTitleBlock>
        <FlexVerticalCenter>
          <Title>Investment Stage</Title>
          <Tooltip
            title="Investments Stages"
            body={`Stages are in chronological order. One step has to be done before the deal will move on to the next step. For further clarification, please reach out to your account manager. The time provided is based on your local time at ${utcTime} time zone.`}
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
          title="Register To Invest"
          subtitle={formatDateRange(timeframe.whitelist, timeframe.preSale)}
          isCurrent={highlightedStatuses.includes(OfferStatus.whitelist)}
        />
      )}
      {hasPresale && (
        <DateBlock
          title="Pre-Sale"
          subtitle={formatDateRange(timeframe.preSale, timeframe.sale)}
          isCurrent={highlightedStatuses.includes(OfferStatus.preSale)}
        />
      )}
      <DateBlock
        title="Public Sale"
        subtitle={formatDateRange(timeframe.sale, timeframe.closed)}
        isCurrent={highlightedStatuses.includes(OfferStatus.sale)}
      />
      <DateBlock
        title="Closed"
        subtitle={formatDateRange(timeframe.closed, timeframe.claim)}
        isCurrent={highlightedStatuses.includes(OfferStatus.closed)}
      />
      <DateBlock
        title="Token Claim"
        subtitle={formatDateRange(timeframe.claim)}
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
  margin-right: 8px;

  ${text55}
`
const DateBox = styled.div<{ hideBottomBorder: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 11px 0;
  border-bottom: ${(props) => (props.hideBottomBorder ? 'none' : `1px solid ${props.theme.launchpad.colors.accent}`)};
`
const DateTitle = styled.span<{ isCurrent: boolean }>`
  ${text49}
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
const MainTitleBlock = styled(FlexVerticalCenter)`
  justify-content: space-between;
  padding-bottom: 5px;
`
const EditBox = styled(FlexVerticalCenter)`
  ${text8}
  color: ${(props) => props.theme.launchpad.colors.text.bodyAlt};

  cursor: pointer;
  svg {
    margin-right: 6px;
  }
`

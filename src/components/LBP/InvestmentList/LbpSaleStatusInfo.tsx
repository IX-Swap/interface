import { Tooltip } from 'components/Launchpad/InvestmentCard/Tooltip'
import { text2, text5 } from 'components/LaunchpadMisc/typography'
import React from 'react'
import styled from 'styled-components'
import { LbpStatus } from '../types'

interface Props {
  isClosed: boolean
  daysTillEnded?: number
  hoursTillEnded?: number
  allowOnlyAccredited: boolean
  status: string

  margin?: string
}

export const LbpSaleStatusInfo: React.FC<Props> = (props) => {
  const info = props.hoursTillEnded
    ? `${props.hoursTillEnded > 1 ? `${props.hoursTillEnded} Hours` : 'Less than 1 Hour'}`
    : props.daysTillEnded
    ? `${props.daysTillEnded} ${props.daysTillEnded > 1 ? 'Days' : 'Day'}`
    : null

  if ([LbpStatus.ended, LbpStatus.closed].includes(props.status as LbpStatus)) {
    let label: string = ''
    switch (props.status) {
      case LbpStatus.closed:
        label = 'Closed'
        break
      case LbpStatus.ended:
        label = 'Ended'
        break
    }
    return (
      <ActiveContainer status={props.status}>
        <span className="bold">{label}</span>
      </ActiveContainer>
    )
  }

  if (info) {
    return (
      <ActiveContainer status={props.status}>
        <span className="bold">{info} </span> until LBP ends
      </ActiveContainer>
    )
  }

  return null
}

const BaseContainer = styled.div<{ margin?: string; status?: string }>`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;

  margin: ${(props) => props.margin ?? '1rem 0'};
  padding: 0 1rem;
  height: 40px;

  border-radius: 6px;
`

const ActiveContainer = styled(BaseContainer)`
  color: ${(props) => {
    switch (props.status) {
      case LbpStatus.live:
      case LbpStatus.closed:
        return props.theme.lbp.colors.status.color.live

      case LbpStatus.pending:
        return props.theme.lbp.colors.status.color.pending

      case LbpStatus.paused:
      case LbpStatus.ended:
        return props.theme.lbp.colors.status.color.paused
    }
  }};
  background: ${(props) => {
    switch (props.status) {
      case LbpStatus.live:
      case LbpStatus.closed:
        return props.theme.lbp.colors.status.background.live

      case LbpStatus.pending:
        return props.theme.lbp.colors.status.background.pending

      case LbpStatus.paused:
      case LbpStatus.ended:
        return props.theme.lbp.colors.status.background.paused
    }
  }};
  border: ${(props) => {
    switch (props.status) {
      case LbpStatus.live:
      case LbpStatus.closed:
        return props.theme.lbp.colors.status.border.live

      case LbpStatus.pending:
        return props.theme.lbp.colors.status.border.pending

      case LbpStatus.paused:
      case LbpStatus.ended:
        return props.theme.lbp.colors.status.border.paused
    }
  }};
  justify-content: center;
  font-family: ${(props) => props.theme.launchpad.font};
  ${text5}
  .bold {
    font-weight: bold;
    padding: 0 0.25rem;
  }
`

const ClosedContainer = styled(BaseContainer)`
  background: rgba(184, 184, 204, 0.05);
  border: 1px solid rgba(184, 184, 204, 0.2);

  justify-content: space-between;
`

const ClosedLabel = styled.div`
  ${text2}
  color: ${(props) => props.theme.launchpad.colors.text.caption};
`

const ClosedStatusLabel = styled.div`
  font-family: ${(props) => props.theme.launchpad.font};
  ${text2}
`

const ClosedSuccessullyLabel = styled(ClosedStatusLabel)`
  color: #1fba66;
`

const ClosedUnsuccessfullyLabel = styled(ClosedStatusLabel)`
  color: ${(props) => props.theme.launchpad.colors.text.error};
`

import { text2, text5 } from 'components/LaunchpadMisc/typography'
import React from 'react'
import styled from 'styled-components'

import { Tooltip } from './Tooltip'

interface Props {
  isClosed: boolean
  isSuccesfull: boolean
  daysTillClosed?: number
  hoursTillClosed?: number
  allowOnlyAccredited: boolean

  margin?: string
}

export const InvestmentSaleStatusInfo: React.FC<Props> = (props) => {
  const info = props.hoursTillClosed
    ? `${props.hoursTillClosed > 1 ? `${props.hoursTillClosed} Hours` : 'Less than 1 Hour'}`
    : props.daysTillClosed
    ? `${props.daysTillClosed} ${props.daysTillClosed > 1 ? 'Days' : 'Day'}`
    : null

  if (props.isClosed) {
    return (
      <ClosedContainer margin={props.margin}>
        <ClosedLabel>Closed</ClosedLabel>

        {props.isSuccesfull && (
          <Tooltip
            title="Successful"
            body="This deal was successfully funded and reached above it’s soft cap funding goal."
          >
            <ClosedSuccessullyLabel>Successful</ClosedSuccessullyLabel>
          </Tooltip>
        )}

        {!props.isSuccesfull && (
          <Tooltip
            title="Unsuccessful"
            body="This deal was unsuccessfully funded and did not reach above it’s soft cap funding goal."
          >
            <ClosedUnsuccessfullyLabel>Unsuccessful</ClosedUnsuccessfullyLabel>
          </Tooltip>
        )}
      </ClosedContainer>
    )
  }

  if (info) {
    return (
      <ActiveContainer>
        <span className="bold">{info} </span> until the sale closes
      </ActiveContainer>
    )
  }

  return null
}

const BaseContainer = styled.div<{ margin?: string }>`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;

  margin: ${(props) => props.margin ?? '1rem 0'};
  padding: 0 1rem;
  height: 40px;

  border-radius: 6px;
`

const ActiveContainer = styled(BaseContainer)`
  color: #1fba66;
  background: rgba(31, 186, 102, 0.05);
  border: 1px solid rgba(31, 186, 102, 0.2);
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
  color: #ff6060;
`

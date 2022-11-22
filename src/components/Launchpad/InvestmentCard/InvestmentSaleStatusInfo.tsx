import React from 'react'
import moment from 'moment'
import styled from 'styled-components'

import { SaleStatus } from 'pages/Launchpad/utils'
import { Tooltip } from './Tooltip'

interface Props {
  isClosed: boolean
  isSuccesfull: boolean
  daysTillSale?: number
  allowOnlyAccredited: boolean
}


export const InvestmentSaleStatusInfo: React.FC<Props> = (props) => {
  if (props.isClosed) {
    return (
      <ClosedContainer>
        <ClosedLabel>Closed</ClosedLabel>

        {props.isSuccesfull && (
          <Tooltip title="Successful" body="This deal was successfully funded and reached above it’s soft cap funding goal.">
            <ClosedSuccessullyLabel>Successful</ClosedSuccessullyLabel>
          </Tooltip>
        )}

        {!props.isSuccesfull && (
          <Tooltip title="Unsuccessful" body="This deal was unsuccessfully funded and did not reach above it’s soft cap funding goal.">
            <ClosedUnsuccessfullyLabel>Unsuccessful</ClosedUnsuccessfullyLabel>
          </Tooltip>
        )}
      </ClosedContainer>
    )
  }

  if (props.daysTillSale) {
    return (
      <ActiveContainer>
        <span className="bold">{props.daysTillSale} Days </span> until the sale closes
      </ActiveContainer>
    )
  }

  return null
}


const BaseContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;

  margin: 1rem 0;
  padding: 0 1rem;
  height: 40px;

  border-radius: 6px;
`

const ActiveContainer = styled(BaseContainer)`
  color: #1FBA66;
  background: rgba(31, 186, 102, 0.05);
  border: 1px solid rgba(31, 186, 102, 0.2);

  justify-content: center;

  font-style: normal;
  font-weight: 400;
  font-size: 14px;

  line-height: 40px;
  letter-spacing: -0.02em;

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
  font-style: normal;
  font-weight: 600;
  font-size: 14px;

  line-height: 40px;
  letter-spacing: -0.02em;

  color: ${props => props.theme.launchpad.colors.text.caption};
`

const ClosedStatusLabel = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 14px;

  line-height: 40px;
  letter-spacing: -0.02em;
`

const ClosedSuccessullyLabel = styled(ClosedStatusLabel)`
  color: #1FBA66;
`

const ClosedUnsuccessfullyLabel = styled(ClosedStatusLabel)`
  color: #FF6060;
`

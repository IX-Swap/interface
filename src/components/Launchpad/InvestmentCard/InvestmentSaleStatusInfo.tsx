import React from 'react'
import moment from 'moment'
import styled from 'styled-components'

import { SaleStatus } from 'pages/Launchpad/utils'
import { Tooltip } from './Tooltip'

interface Props {
  status: SaleStatus
  endsAt: Date

  allowOnlyAccredited: boolean
}


export const InvestmentSaleStatusInfo: React.FC<Props> = (props) => {
  const daysLeft = React.useMemo(() => {
    return Math.floor(moment(props.endsAt).diff(moment()).valueOf() / (24 * 60 * 60 * 1000))
  }, [props.endsAt])

  const isClosed = React.useMemo(() => {
    return [SaleStatus.closedSuccesfully, SaleStatus.closedUnsuccessfully].includes(props.status)
  }, [props.status])
  

  if (isClosed) {
    return (
      <ClosedContainer>
        <ClosedLabel>Closed</ClosedLabel>

        {props.status === SaleStatus.closedSuccesfully && (
          <Tooltip title="Successful" body="This deal was successfully funded and reached above it’s soft cap funding goal.">
            <ClosedSuccessullyLabel>Successfully</ClosedSuccessullyLabel>
          </Tooltip>
        )}

        {props.status === SaleStatus.closedUnsuccessfully && (
          <Tooltip title="Unsuccessful" body="This deal was unsuccessfully funded and did not reach above it’s soft cap funding goal.">
            <ClosedUnsuccessfullyLabel>Unsuccessfully</ClosedUnsuccessfullyLabel>
          </Tooltip>
        )}
      </ClosedContainer>
    )
  }

  return (
    <ActiveContainer>
      <span className="bold">{daysLeft} Days </span> until the sale closes
    </ActiveContainer>
  )
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

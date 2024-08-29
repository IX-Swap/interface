import React, { useContext } from 'react'
import { Trans } from '@lingui/macro'
import dayjs from 'dayjs'
import { useHistory } from 'react-router-dom'

import CurrencyLogo from 'components/CurrencyLogo'
import { PayoutEvent } from 'state/token-manager/types'
import { PAYOUT_TYPE, PAYOUT_TYPE_LABEL } from 'components/TmPayoutEvents/constants'
import { routes } from 'utils/routes'
import { StatusCell } from 'components/TmPayoutEvents/StatusCell'

import {
  CardContainer,
  PayoutTitle,
  PayoutInfoContainer,
  PayoutLabel,
  PayoutValue,
  PaymentPeriod,
  PayoutType,
  PayoutHeader,
} from './styleds'
import { Divider } from '@material-ui/core'
import { ThemeContext } from 'styled-components'
import { useSafeCurrency } from 'hooks/Tokens'
import TokenNetwork from 'components/TokenNetwork'

interface Props {
  data: PayoutEvent
  secTokenWidth?: string
}

export const Card = ({
  secTokenWidth,
  data: { secToken, type, recordDate, payoutToken, startDate, endDate, status, id },
}: Props) => {
  const history = useHistory()
  const token = useSafeCurrency(payoutToken)
  const theme = useContext(ThemeContext)

  const dateFormat = 'MMM DD, YYYY'

  const redirect = () => {
    history.push(routes.payoutItem(id))
  }

  return (
    <CardContainer onClick={redirect}>
      <PayoutHeader>
        <PayoutTitle>
          {secToken ? (
            <TokenNetwork width={secTokenWidth} height={secTokenWidth} token={secToken} network={secToken?.network} />
          ) : null}
          <div>{`${secToken?.symbol}`}</div>
        </PayoutTitle>
        <PayoutType>{PAYOUT_TYPE_LABEL[type] || '-'}</PayoutType>
      </PayoutHeader>
      <Divider style={{ backgroundColor: theme.bg24 }} />
      <PayoutInfoContainer>
        {type !== PAYOUT_TYPE.AIRDROPS ? (
          <div>
            <PayoutLabel>
              <Trans>Record Date</Trans>
            </PayoutLabel>
            <PayoutValue>{dayjs(recordDate).format(dateFormat)}</PayoutValue>
          </div>
        ) : (
          ''
        )}

        <div>
          <PayoutLabel>
            <Trans>Paid With</Trans>
          </PayoutLabel>
          <PayoutValue>
            <CurrencyLogo currency={token} size="20px" style={{ marginRight: 4 }} />
            {token?.symbol || '-'}
          </PayoutValue>
        </div>
      </PayoutInfoContainer>
      <Divider style={{ backgroundColor: theme.bg24 }} />
      <PayoutInfoContainer>
        <PaymentPeriod>
          <PayoutLabel>
            <Trans>{endDate ? 'Payment Period' : 'Payment Start Date'}</Trans>
          </PayoutLabel>
          <PayoutValue>{startDate ? dayjs(startDate).format(dateFormat) : '-'}</PayoutValue>
          {endDate && <PayoutValue>{' - ' + dayjs(endDate).format(dateFormat)}</PayoutValue>}
        </PaymentPeriod>
        <div>
          <StatusCell status={status} />
        </div>
      </PayoutInfoContainer>
    </CardContainer>
  )
}

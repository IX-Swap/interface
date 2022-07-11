import React from 'react'
import { Trans } from '@lingui/macro'
import dayjs from 'dayjs'
import { useHistory } from 'react-router-dom'

import CurrencyLogo from 'components/CurrencyLogo'
import { WrappedTokenInfo } from 'state/lists/wrappedTokenInfo'
import { PayoutEvent } from 'state/token-manager/types'
import { PAYOUT_TYPE_LABEL } from 'components/TmPayoutEvents/constants'
import { useCurrency } from 'hooks/Tokens'
import { routes } from 'utils/routes'
import { StatusCell } from 'components/TmPayoutEvents/StatusCell'

import { CardContainer, PayoutTitle, PayoutInfoContainer, PayoutLabel, PayoutValue } from './styleds'

interface Props {
  data: PayoutEvent
}

export const Card = ({ data: { secToken, type, recordDate, payoutToken, startDate, endDate, status, id } }: Props) => {
  const history = useHistory()
  const token = useCurrency(payoutToken)

  const secCurrency = new WrappedTokenInfo(secToken)

  const dateFormat = 'MMM DD, YYYY'

  const redirect = () => {
    history.push(routes.payoutItem(id))
  }

  return (
    <CardContainer onClick={redirect}>
      <PayoutTitle>
        <CurrencyLogo currency={secCurrency} size="40px" />
        <div>{`${PAYOUT_TYPE_LABEL[type] || '-'} - ${secToken.symbol}`}</div>
      </PayoutTitle>
      <PayoutInfoContainer>
        <div>
          <PayoutLabel>
            <Trans>Record Date:</Trans>
          </PayoutLabel>
          <PayoutValue>{dayjs(recordDate).format(dateFormat)}</PayoutValue>
        </div>
        <div>
          <PayoutLabel>
            <Trans>Payout Token:</Trans>
          </PayoutLabel>
          <PayoutValue>
            <CurrencyLogo currency={token} size="20px" style={{ marginRight: 4 }} />
            {token?.symbol || '-'}
          </PayoutValue>
        </div>
        <div>
          <PayoutLabel>
            <Trans>{endDate ? 'Payment Period:' : 'Payment Start Date:'}</Trans>
          </PayoutLabel>
          <PayoutValue>
            {dayjs(startDate).format(dateFormat)}
            {endDate && (
              <>
                &nbsp;-
                <br />
                {dayjs(endDate).format(dateFormat)}
              </>
            )}
          </PayoutValue>
        </div>
        <div>
          <StatusCell status={status} />
        </div>
      </PayoutInfoContainer>
    </CardContainer>
  )
}

import React from 'react'
import { useDSOById } from 'app/pages/invest/hooks/useDSOById'
import { abbreviateNumber } from 'helpers/numbers'
import { ChartWrapper } from './ChartWrapper'
import { InsightValue } from './InsightValue'
import { useIssuanceRouter } from 'app/pages/issuance/router'
import { LOADING_TEXT } from 'components/form/renderUtils'

export const AmountRaised = () => {
  const {
    params: { dsoId }
  } = useIssuanceRouter()
  const { data, isSuccess } = useDSOById(dsoId)

  let value = LOADING_TEXT
  if (isSuccess && data !== undefined) {
    value = abbreviateNumber(data.insight.raisedTotal, data.currency.symbol)
  }

  return (
    <ChartWrapper title='Amount Raised' small>
      <InsightValue value={value} />
    </ChartWrapper>
  )
}

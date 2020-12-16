import React from 'react'
import { useDSOById } from 'app/pages/invest/hooks/useDSOById'
import { abbreviateNumber } from 'helpers/numbers'
import { ChartWrapper } from 'app/pages/issuance/components/IssuanceLanding/ChartWrapper'
import { InsightValue } from 'app/pages/issuance/components/IssuanceLanding/InsightValue'
import { useIssuanceRouter } from 'app/pages/issuance/router'
import { LOADING_TEXT } from 'components/form/renderUtils'

export const TargetFundraise = () => {
  const {
    params: { dsoId }
  } = useIssuanceRouter()
  const { data, isSuccess } = useDSOById(dsoId)

  let value = LOADING_TEXT
  if (isSuccess && data !== undefined) {
    value = abbreviateNumber(data.totalFundraisingAmount, data.currency.symbol)
  }

  return (
    <ChartWrapper title='Target Fundraise' small>
      <InsightValue value={value} />
    </ChartWrapper>
  )
}

import React from 'react'
import { useDSOById } from 'app/pages/invest/hooks/useDSOById'
import { abbreviateNumber } from 'helpers/numbers'
import { ChartWrapper } from 'app/pages/issuance/components/IssuanceLanding/ChartWrapper'
import { InsightValue } from 'app/pages/issuance/components/IssuanceLanding/InsightValue'
import { LOADING_TEXT } from 'components/form/renderUtils'
import { useParams } from 'react-router-dom'

export const TargetFundraise = () => {
  const params = useParams<{ dsoId: string }>()
  const { data, isSuccess } = useDSOById(params.dsoId)

  let value = LOADING_TEXT

  if (data === undefined) {
    value = abbreviateNumber(0)
  }

  if (isSuccess && data !== undefined) {
    value = abbreviateNumber(data.totalFundraisingAmount, data.currency.symbol)
  }

  return (
    <ChartWrapper title='Target Fundraise' small>
      <InsightValue value={value} />
    </ChartWrapper>
  )
}

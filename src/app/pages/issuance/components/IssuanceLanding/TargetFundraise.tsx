import React from 'react'
import { useDSOById } from 'app/pages/invest/hooks/useDSOById'
import { abbreviateNumber } from 'helpers/numbers'
import { ChartWrapper } from 'app/pages/issuance/components/IssuanceLanding/ChartWrapper'
import { InsightValue } from 'app/pages/issuance/components/IssuanceLanding/InsightValue'
import { LOADING_TEXT } from 'components/form/renderUtils'
import { useParams } from 'react-router-dom'

export const TargetFundraise = () => {
  const { dsoId, issuerId } = useParams<{ dsoId: string; issuerId: string }>()
  const { data, isSuccess } = useDSOById(dsoId, issuerId)

  let value = LOADING_TEXT

  if (data === undefined || data.status === 'Draft') {
    value = abbreviateNumber(0)
  }

  if (isSuccess && data !== undefined && data.status !== 'Draft') {
    value = abbreviateNumber(data.totalFundraisingAmount, data.currency.symbol)
  }

  return (
    <ChartWrapper title='Target Fundraise' small>
      <InsightValue value={value} />
    </ChartWrapper>
  )
}

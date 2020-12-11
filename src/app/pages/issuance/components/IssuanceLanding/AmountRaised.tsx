import React from 'react'
import { useFormContext } from 'react-hook-form'
import { useDSOById } from 'app/pages/invest/hooks/useDSOById'
import { abbreviateNumber } from 'helpers/numbers'
import { ChartWrapper } from './ChartWrapper'
import { InsightValue } from './InsightValue'

export const AmountRaised = () => {
  const { watch } = useFormContext()
  const { dso } = watch(['dso'])
  const { data, isLoading, isIdle } = useDSOById(dso)

  if (isLoading || isIdle || data === undefined) {
    return null
  }

  return (
    <ChartWrapper title='Amount Raised' small>
      <InsightValue
        value={abbreviateNumber(data.insight.raisedTotal, data.currency.symbol)}
      />
    </ChartWrapper>
  )
}

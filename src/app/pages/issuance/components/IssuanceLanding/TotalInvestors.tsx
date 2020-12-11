import React from 'react'
import { useFormContext } from 'react-hook-form'
import { useSetPageTitle } from 'app/hooks/useSetPageTitle'
import { useDSOById } from 'app/pages/invest/hooks/useDSOById'
import { ChartWrapper } from './ChartWrapper'
import { InsightValue } from './InsightValue'

export const TotalInvestors = () => {
  const { watch } = useFormContext()
  const { dso } = watch(['dso'])
  const { data, isLoading, isIdle } = useDSOById(dso)

  useSetPageTitle(data?.tokenName)

  if (isLoading || isIdle || data === undefined) {
    return null
  }

  return (
    <ChartWrapper title='Total Investors' small>
      <InsightValue value={data.insight.investorCount} />
    </ChartWrapper>
  )
}

import React from 'react'
import { useSetPageTitle } from 'app/hooks/useSetPageTitle'
import { useDSOById } from 'app/pages/invest/hooks/useDSOById'
import { ChartWrapper } from './ChartWrapper'
import { InsightValue } from './InsightValue'
import { useIssuanceRouter } from 'app/pages/issuance/router'
import { LOADING_TEXT } from 'components/form/renderUtils'

export const TotalInvestors = () => {
  const {
    params: { dsoId }
  } = useIssuanceRouter()
  const { data, isSuccess } = useDSOById(dsoId)

  useSetPageTitle(data?.tokenName)

  let value = LOADING_TEXT
  if (isSuccess && data !== undefined) {
    value = `${data.insight.investorCount}`
  }

  return (
    <ChartWrapper title='Total Investors' small>
      <InsightValue value={value} />
    </ChartWrapper>
  )
}

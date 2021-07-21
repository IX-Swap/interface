import { SecurityDetails } from 'app/pages/home/components/SecurityDetails/SecurityDetails'
import { useSecurities } from 'app/pages/home/hooks/useSecurities'
import React from 'react'
import { useParams } from 'react-router-dom'
import { RootContainer } from 'ui/RootContainer'

export const SecurityView = () => {
  const { data } = useSecurities()
  const { ticker } = useParams<{ ticker: string }>()
  const security = data?.find(item => item.ticker === ticker)

  if (data === undefined || security === undefined) {
    return null
  }

  const comparableSecurities = data.filter(
    item =>
      item.industry === security.industry &&
      item.assetClass === security.assetClass &&
      item.ticker !== security.ticker
  )

  return (
    <RootContainer>
      <SecurityDetails
        security={security}
        comparableSecurities={comparableSecurities}
      />
    </RootContainer>
  )
}

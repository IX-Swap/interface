import { InvestRoute } from 'v2/app/pages/invest/router'
import { AppRouterLink } from 'v2/components/AppRouterLink'
import React from 'react'
import { DigitalSecurityOffering } from 'v2/types/dso'

export interface DSOLinkProps {
  dso: DigitalSecurityOffering
}

export const DSOLink = (props: DSOLinkProps) => {
  const { dso } = props
  const { _id, createdBy, tokenSymbol, tokenName } = dso

  return (
    <AppRouterLink
      to={InvestRoute.offeringView}
      params={{
        dsoId: _id,
        issuerId: createdBy
      }}
      color='primary'
      underline='always'
      replace
    >
      {tokenName} ({tokenSymbol})
    </AppRouterLink>
  )
}

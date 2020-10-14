import { AppRouterLink } from 'v2/components/AppRouterLink'
import React from 'react'
import { DigitalSecurityOffering } from 'v2/types/dso'
import { OfferingRoute } from 'v2/app/pages/invest/routers/offeringsRouter'

export interface DSOLinkProps {
  dso: DigitalSecurityOffering
}

export const DSOLink = (props: DSOLinkProps) => {
  const { dso } = props
  const { _id, createdBy, tokenSymbol, tokenName } = dso

  return (
    <AppRouterLink
      to={OfferingRoute.view}
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

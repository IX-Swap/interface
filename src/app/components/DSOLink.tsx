import { AppRouterLink } from 'components/AppRouterLink'
import React from 'react'
import { DigitalSecurityOffering } from 'types/dso'
import { OfferingRoute } from 'app/pages/invest/routers/offeringsRouter'

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

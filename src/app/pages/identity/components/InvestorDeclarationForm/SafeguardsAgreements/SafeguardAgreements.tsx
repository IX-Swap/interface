import { SafeguardInfoDialog } from 'app/pages/identity/components/InvestorDeclarationForm/SafeguardInfoDialog/SafeguardInfoDialog'
import React, { Fragment } from 'react'

export const SafeguardAgreements = () => {
  return (
    <Fragment>
      I have been informed of and understand the consequences of my
      qualification as an Accredited Investor, in particular the reduced
      regulatory investor <SafeguardInfoDialog /> for Accredited Investors.
    </Fragment>
  )
}

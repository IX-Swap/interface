import { OptOutInfoDialog } from 'app/pages/identity/components/InvestorDeclarationForm/OptOutInfoDialog/OptOutDialog'
import React, { Fragment } from 'react'

export interface OptInAgreementsProps {
  showOptOutDialog?: boolean
}

export const OptInAgreements = ({
  showOptOutDialog = false
}: OptInAgreementsProps) => {
  return (
    <Fragment>
      I have been informed of and understand my right to{' '}
      {showOptOutDialog ? <OptOutInfoDialog /> : 'opt out'} of the Accredited
      Investors status
    </Fragment>
  )
}

import React from 'react'
import { Grid } from '@mui/material'
import { CorporateIdentity } from 'app/pages/identity/types/forms'
import { CountryTaxDeclaration } from 'app/pages/identity/components/CountryTaxDeclarations/CountryTaxDeclaration'
import { InvestorDeclarationView } from 'app/pages/identity/components/CorporateAccreditationView/InvestorDeclarationView'
import { OptInView } from 'app/pages/identity/components/CorporateAccreditationView/OptInView'
import { DocumentsView } from 'app/pages/identity/components/CorporateAccreditationView/DocumentsView'
import { InstitutionalInvestorDeclarationView } from 'app/pages/identity/components/CorporateAccreditationView/InstitutionalInvestorDeclarationView'

export interface CorporateAccreditationViewProps {
  data: CorporateIdentity
  showReview?: boolean
}

export const CorporateAccreditationView = ({
  data,
  showReview = false
}: CorporateAccreditationViewProps) => {
  return (
    <Grid container spacing={2} direction='column'>
      <Grid item>
        <CountryTaxDeclaration
          taxResidencies={data.taxResidencies}
          showReview={showReview}
        />
      </Grid>

      <Grid item>
        <InvestorDeclarationView data={data} />
      </Grid>

      <Grid item>
        <OptInView data={data} />
      </Grid>

      <Grid item>
        <InstitutionalInvestorDeclarationView data={data} />
      </Grid>

      <Grid item>
        <DocumentsView data={data.documents} />
      </Grid>
    </Grid>
  )
}

import React from 'react'
import { Grid } from '@mui/material'
import { CorporateIdentity } from 'app/pages/identity/types/forms'
import { InvestorDeclarationView } from 'app/pages/identity/components/CorporateAccreditationView/InvestorDeclarationView'
import { OptInView } from 'app/pages/identity/components/CorporateAccreditationView/OptInView'
import { DocumentsView } from 'app/pages/identity/components/CorporateAccreditationView/DocumentsView'
import { InstitutionalInvestorDeclarationView } from 'app/pages/identity/components/CorporateAccreditationView/InstitutionalInvestorDeclarationView'

export interface CorporateAccreditationViewProps {
  data: CorporateIdentity
}

export const CorporateAccreditationView = ({
  data
}: CorporateAccreditationViewProps) => {
  const { applyingAs } = data
  return (
    <Grid container spacing={2} direction='column'>
      <Grid item>
        <InvestorDeclarationView data={data} />
      </Grid>

      {data.applyingAs[0] === 'institutional' ? (
        <Grid item>
          <InstitutionalInvestorDeclarationView data={data} />
        </Grid>
      ) : (
        <>
          <Grid item>
            <OptInView data={data} />
          </Grid>
          <Grid item>
            <DocumentsView
              data={data.documents}
              investorRole={
                typeof applyingAs !== 'undefined' ? applyingAs[0] : 'accredited'
              }
            />
          </Grid>
        </>
      )}
    </Grid>
  )
}

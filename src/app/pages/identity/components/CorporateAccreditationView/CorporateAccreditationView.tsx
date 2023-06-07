import React from 'react'
import { Grid } from '@mui/material'
import { CorporateIdentity } from 'app/pages/identity/types/forms'
import { InvestorDeclarationView } from 'app/pages/identity/components/CorporateAccreditationView/InvestorDeclarationView'
import { OptInView } from 'app/pages/identity/components/CorporateAccreditationView/OptInView'
import { DocumentsView } from 'app/pages/identity/components/CorporateAccreditationView/DocumentsView'
import { InstitutionalInvestorDeclarationView } from 'app/pages/identity/components/CorporateAccreditationView/InstitutionalInvestorDeclarationView'
import { Element } from 'react-scroll'

export enum CorporateAccreditationSections {
  'Investor Role Declaration' = 'investor-role-declaration',
  'Opt-In Requirement' = 'opt-in-requirement',
  'Corporate Documents' = 'corporate-documents'
}

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
        <Element
          name={CorporateAccreditationSections['Investor Role Declaration']}
        >
          <InvestorDeclarationView data={data} />
        </Element>
      </Grid>

      {typeof data.applyingAs !== 'undefined' &&
      data.applyingAs[0] === 'institutional' ? (
        <Grid item>
          <InstitutionalInvestorDeclarationView data={data} />
        </Grid>
      ) : (
        <>
          <Grid item>
            <Element
              name={CorporateAccreditationSections['Opt-In Requirement']}
            >
              <OptInView data={data} />
            </Element>
          </Grid>
          <Grid item>
            <Element
              name={CorporateAccreditationSections['Corporate Documents']}
            >
              <DocumentsView
                data={data.documents}
                investorRole={
                  typeof applyingAs !== 'undefined'
                    ? applyingAs[0]
                    : 'accredited'
                }
              />
            </Element>
          </Grid>
        </>
      )}
    </Grid>
  )
}

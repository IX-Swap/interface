import React from 'react'
import { CorporateIdentity } from 'app/pages/identity/types/forms'
import { DeclarationsListItem } from 'app/pages/identity/components/DeclarationsListItem/DeclarationsListItem'
import { FieldContainer } from 'ui/FieldContainer/FieldContainer'
import { Grid } from '@mui/material'
import { FormSectionHeader } from 'ui/FormSectionHeader/FormSectionHeader'
import { Documents } from 'app/pages/identity/components/CorporateIdentityView/Documents'

export interface InstitutionalInvestorDeclarationViewProps {
  data: CorporateIdentity
}

export const InstitutionalInvestorDeclarationView: React.FC<
  InstitutionalInvestorDeclarationViewProps
> = ({ data }) => {
  const { isInstitutionalInvestor, documents } = data

  const institutionalInvestorDocuments = documents.filter(
    doc =>
      Object.values(doc).length > 0 &&
      doc.type === 'Institutional Investor Documents'
  )

  return (
    <FieldContainer>
      <Grid container direction={'column'} spacing={5}>
        <Grid item>
          <FormSectionHeader title='Institutional Investor Status Declaration' />
        </Grid>

        <Grid item container direction={'column'} spacing={3}>
          <DeclarationsListItem
            label={'I declare that I am "Corporate Accredited Investor"'}
            value={isInstitutionalInvestor}
          />

          <Grid item>
            <Documents documents={institutionalInvestorDocuments} />
          </Grid>
        </Grid>
      </Grid>
    </FieldContainer>
  )
}

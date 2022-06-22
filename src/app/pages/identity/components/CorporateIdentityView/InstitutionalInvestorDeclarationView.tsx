import React from 'react'
import { CorporateIdentity } from 'app/pages/identity/types/forms'
import { DeclarationsListItem } from 'app/pages/identity/components/DeclarationsListItem/DeclarationsListItem'
import { FieldContainer } from 'app/pages/identity/components/FieldContainer/FieldContainer'
import { Grid } from '@mui/material'
import { FormSectionHeader } from 'app/pages/identity/components/FormSectionHeader'
import { DocumentsSection } from 'app/pages/identity/components/CorporateIdentityView/DocumentsSection'

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
      <Grid container direction={'column'} spacing={3}>
        <Grid item>
          <FormSectionHeader title='Institutional Investor Status Declaration' />
        </Grid>

        <DeclarationsListItem
          label={'I declare that I am "Corporate Accredited Investor"'}
          value={isInstitutionalInvestor}
        />

        <Grid item>
          <DocumentsSection documents={institutionalInvestorDocuments} />
        </Grid>
      </Grid>
    </FieldContainer>
  )
}

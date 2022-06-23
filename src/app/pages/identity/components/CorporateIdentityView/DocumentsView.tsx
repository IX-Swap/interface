import React from 'react'
import { Grid } from '@mui/material'
import { DataroomFile } from 'types/dataroomFile'
import { FormSectionHeader } from 'app/pages/identity/components/FormSectionHeader'
import { FieldContainer } from 'app/pages/identity/components/FieldContainer/FieldContainer'
import { Documents } from 'app/pages/identity/components/CorporateIdentityView/Documents'

export interface DocumentsViewProps {
  data: DataroomFile[]
}

export const DocumentsView = (props: DocumentsViewProps) => {
  const { data: documents } = props

  const corporateDocuments = documents.filter(
    doc => Object.values(doc).length > 0 && doc.type === 'Corporate Documents'
  )
  const financialDocuments = documents.filter(
    doc => Object.values(doc).length > 0 && doc.type === 'Financial Documents'
  )
  const evidenceDocuments = documents.filter(
    doc =>
      Object.values(doc).length > 0 && doc.type === 'Evidence of Accreditation'
  )

  return (
    <FieldContainer>
      <Grid item container direction={'column'} spacing={5}>
        <Grid item container direction={'column'} spacing={3}>
          <Grid item>
            <FormSectionHeader title='Corporate Documents' />
          </Grid>

          <Grid item container direction={'column'} spacing={2}>
            <Documents documents={corporateDocuments} />
          </Grid>
        </Grid>

        <Grid item container direction={'column'} spacing={3}>
          <Grid item>
            <FormSectionHeader title='Financial Documents' />
          </Grid>

          <Grid item container direction={'column'} spacing={2}>
            <Documents documents={financialDocuments} />
          </Grid>
        </Grid>

        <Grid item container direction={'column'} spacing={3}>
          <Grid item>
            <FormSectionHeader title='Evidence of Accreditation' />
          </Grid>

          <Grid item container direction={'column'} spacing={2}>
            <Documents documents={evidenceDocuments} />
          </Grid>
        </Grid>
      </Grid>
    </FieldContainer>
  )
}

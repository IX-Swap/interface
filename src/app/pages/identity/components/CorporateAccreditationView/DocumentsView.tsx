import React from 'react'
import { Grid, Typography } from '@mui/material'
import { DataroomFile } from 'types/dataroomFile'
import { FormSectionHeader } from 'ui/FormSectionHeader/FormSectionHeader'
import { FieldContainer } from 'ui/FieldContainer/FieldContainer'
import { Documents } from 'app/pages/identity/components/CorporateIdentityView/Documents'

export interface DocumentsViewProps {
  data: DataroomFile[]
  investorRole?: string
}

export const DocumentsView = (props: DocumentsViewProps) => {
  const { data: documents, investorRole = 'accredited' } = props

  //   const financialDocuments = documents.filter(
  //     doc => Object.values(doc).length > 0 && doc.type === 'Financial Documents'
  //   )
  const evidenceDocuments = documents.filter(
    doc => Object.values(doc).length > 0 && doc.type.startsWith('Evidence of ')
  )

  return (
    <FieldContainer>
      <Grid item container direction={'column'} spacing={5}>
        {/* <Grid item container direction={'column'} spacing={3}>
          <Grid item>
            <FormSectionHeader title='Financial Documents' />
          </Grid>

          <Grid item container direction={'column'} spacing={2}>
            <Documents documents={financialDocuments} />
          </Grid>
        </Grid> */}

        <Grid item container direction={'column'} spacing={3}>
          <Grid item>
            <FormSectionHeader title={'Accreditation Documents'} />
          </Grid>

          <Grid item>
            <Typography>{`Evidence of ${
              investorRole !== 'expert' ? 'Accreditation' : 'Expertise'
            }`}</Typography>
          </Grid>

          <Grid item container direction={'column'} spacing={2}>
            <Documents documents={evidenceDocuments} />
          </Grid>
        </Grid>
      </Grid>
    </FieldContainer>
  )
}

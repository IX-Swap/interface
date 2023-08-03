import React from 'react'
import { Grid } from '@mui/material'
import { DataroomFile } from 'types/dataroomFile'
import { FormSectionHeader } from 'ui/FormSectionHeader/FormSectionHeader'
import { FieldContainer } from 'ui/FieldContainer/FieldContainer'
import { Documents } from 'app/pages/identity/components/CorporateIdentityView/Documents'

export interface CorporateDocumentsProps {
  data: DataroomFile[]
  investorRole?: string
}

export const CorporateDocuments = (props: CorporateDocumentsProps) => {
  const { data: documents } = props

  const corporateDocuments = documents.filter(
    doc => Object.values(doc).length > 0 && doc.type === 'Corporate Documents'
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
      </Grid>
    </FieldContainer>
  )
}

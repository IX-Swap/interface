import React from 'react'
import { Grid, Typography } from '@mui/material'
import { DataroomFile } from 'types/dataroomFile'
import { IdentityType } from 'app/pages/identity/utils/shared'
import { Documents } from 'app/pages/identity/components/CorporateIdentityView/Documents'

export interface DocumentsViewProps {
  data: DataroomFile[]
  investorRole?: string
  type?: IdentityType
}

export const IndividualAccreditationDocuments = (props: DocumentsViewProps) => {
  const { data: documents, investorRole = 'accredited' } = props

  const evidenceDocs = documents.filter(
    doc => Object.values(doc).length > 0 && doc.type.startsWith('Evidence of ')
  )

  return (
    <Grid container spacing={3} direction='column'>
      <Grid item container spacing={2} direction='column'>
        <Grid item>
          <Typography>
            Evidence of{' '}
            {investorRole !== 'expert' ? 'Accreditation' : 'Expertise'}
          </Typography>
        </Grid>
        <Grid item>
          <Documents documents={evidenceDocs} />
        </Grid>
      </Grid>
    </Grid>
  )
}

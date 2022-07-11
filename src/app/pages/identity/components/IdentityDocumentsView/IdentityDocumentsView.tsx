import React from 'react'
import { Grid, Typography } from '@mui/material'
import { DataroomFile } from 'types/dataroomFile'
import { IdentityType } from 'app/pages/identity/utils/shared'
import { Documents } from 'app/pages/identity/components/CorporateIdentityView/Documents'

export interface DocumentsViewProps {
  data: DataroomFile[]
  type?: IdentityType
}

export const IdentityDocumentsView = (props: DocumentsViewProps) => {
  const { data: documents } = props

  const proofOfIdentityDocs = documents.filter(
    doc => Object.values(doc).length > 0 && doc.type === 'Proof of Identity'
  )
  const proofOfAddressDocs = documents.filter(
    doc => Object.values(doc).length > 0 && doc.type === 'Proof of Address'
  )
  const evidenceDocs = documents.filter(
    doc =>
      Object.values(doc).length > 0 && doc.type === 'Evidence of Accreditation'
  )

  return (
    <Grid container spacing={3} direction='column'>
      <Grid item container spacing={2} direction='column'>
        <Grid item>
          <Typography>Proof of Identity</Typography>
        </Grid>
        <Grid item>
          <Documents documents={proofOfIdentityDocs} />
        </Grid>
      </Grid>

      <Grid item container spacing={2} direction='column'>
        <Grid item>
          <Typography>Proof of Address</Typography>
        </Grid>
        <Grid item>
          <Documents documents={proofOfAddressDocs} />
        </Grid>
      </Grid>

      <Grid item container spacing={2} direction='column'>
        <Grid item>
          <Typography>Evidence of Accreditation</Typography>
        </Grid>
        <Grid item>
          <Documents documents={evidenceDocs} />
        </Grid>
      </Grid>
    </Grid>
  )
}

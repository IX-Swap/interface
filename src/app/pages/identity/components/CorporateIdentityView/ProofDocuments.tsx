import React from 'react'
import { Grid, Typography } from '@mui/material'
import { DataroomFile } from 'types/dataroomFile'
import { Documents } from 'app/pages/identity/components/CorporateIdentityView/Documents'

export interface ProofDocumentsProps {
  documents: DataroomFile[]
}

export const ProofDocuments = ({ documents }: ProofDocumentsProps) => {
  const filteredProofOfIdentityDocuments = documents.filter(
    item => Object.values(item).length > 0 && item.type === 'Proof of Identity'
  )

  const filteredProofOfAddressDocuments = documents.filter(
    item => Object.values(item).length > 0 && item.type === 'Proof of Address'
  )

  return (
    <>
      <Grid item container direction={'column'} spacing={2}>
        <Grid item>
          <Typography>Proof of Identity</Typography>
        </Grid>

        <Grid item container direction={'column'} spacing={2}>
          <Documents documents={filteredProofOfIdentityDocuments} />
        </Grid>
      </Grid>

      <Grid item container direction={'column'} spacing={2}>
        <Grid item>
          <Typography>Proof of Address</Typography>
        </Grid>

        <Grid item container direction={'column'} spacing={2}>
          <Documents documents={filteredProofOfAddressDocuments} />
        </Grid>
      </Grid>
    </>
  )
}

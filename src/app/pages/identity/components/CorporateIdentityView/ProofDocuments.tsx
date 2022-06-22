import React from 'react'
import { Grid, Typography } from '@mui/material'
import { File } from 'ui/FileUpload/File'
import { DataroomFile } from 'types/dataroomFile'

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
          {filteredProofOfIdentityDocuments.length > 0 ? (
            filteredProofOfIdentityDocuments.map(file => {
              if (file.type === 'Proof of Identity') {
                return (
                  <Grid item>
                    <File label={file.title} value={file} readonly />
                  </Grid>
                )
              }
            })
          ) : (
            <Grid item>
              <File
                hasError
                isFileMissed
                label={undefined}
                value={undefined}
                readonly
              />
            </Grid>
          )}
        </Grid>
      </Grid>

      <Grid item container direction={'column'} spacing={2}>
        <Grid item>
          <Typography>Proof of Address</Typography>
        </Grid>

        <Grid item container direction={'column'} spacing={2}>
          {filteredProofOfAddressDocuments.length > 0 ? (
            filteredProofOfAddressDocuments.map(file => {
              if (file.type === 'Proof of Address') {
                return (
                  <Grid item>
                    <File label={file.title} value={file} readonly />
                  </Grid>
                )
              }
            })
          ) : (
            <Grid item>
              <File
                hasError
                isFileMissed
                label={undefined}
                value={undefined}
                readonly
              />
            </Grid>
          )}
        </Grid>
      </Grid>
    </>
  )
}

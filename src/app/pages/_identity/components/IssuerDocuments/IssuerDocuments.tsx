import { Grid, Typography } from '@material-ui/core'
import { UploadDocumentField } from 'app/pages/_identity/components/UploadDocumentsForm/UploadDocumentField/UploadDocumentField'
import React from 'react'

export const IssuerDocuments = () => {
  return (
    <Grid container spacing={6} direction='column'>
      <Grid item>
        <UploadDocumentField
          name='companyRelated'
          label='Company-Related Documents'
          helperElement={
            <Typography variant='body1'>
              Certificate of Incorporation, Memorandum and Article Association,
              Corporate Registry Profile, Company Organization Chart and
              Register of Shareholders and Directors.
            </Typography>
          }
        />
      </Grid>
      <Grid item>
        <UploadDocumentField
          name='issuanceRelated'
          label='Issuance-Related Documents'
          helperElement={
            <Typography variant='body1'>
              Offering memorandum, One pager / Teaser of the issuance and Any
              other marketing materials.
            </Typography>
          }
        />
      </Grid>
      <Grid item>
        <UploadDocumentField
          name='financial'
          label='Financial Documents'
          helperElement={
            <Typography variant='body1'>
              Please upload your balance sheet , P&amp;L statement or Annual
              Returns
            </Typography>
          }
        />
      </Grid>
    </Grid>
  )
}

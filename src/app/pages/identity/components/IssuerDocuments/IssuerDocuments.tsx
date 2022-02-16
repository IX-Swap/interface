import { Grid, Typography } from '@mui/material'
import { UploadDocumentField } from 'app/pages/identity/components/UploadDocumentsForm/UploadDocumentField/UploadDocumentField'
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
              company registry profile, certificate of incorporation, memorandum
              and articles of association, company organization chart, register
              of shareholders and directors, partnership deed and trust deed
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
              offering memorandum, one pager of the issuance or any other
              marketing material
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
              balance sheet, profit &amp; loss statement or annual returns
            </Typography>
          }
        />
      </Grid>
    </Grid>
  )
}

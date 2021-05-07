import { Grid, Typography } from '@material-ui/core'
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
              and articles of association, company organisation chart, register
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

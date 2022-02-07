import React, { Fragment } from 'react'
import { Grid, Typography } from '@mui/material'
import { FormSectionHeader } from 'app/components/DSO/components/FormSectionHeader'
import { UploadDocumentField } from 'app/pages/identity/components/UploadDocumentsForm/UploadDocumentField/UploadDocumentField'
import { VSpacer } from 'components/VSpacer'

export const ListingDataroom = () => {
  return (
    <Fragment>
      <FormSectionHeader title='Upload Documents' />

      <Grid container direction='column' spacing={3}>
        <UploadDocumentField
          name='incomeStatement'
          label='Income Statement'
          helperElement={
            <Typography variant='body1'>
              Please upload the cash income statements of multiple year
            </Typography>
          }
        />
        <VSpacer size={'medium'} />
        <UploadDocumentField
          name='cashFlow'
          label='Cash Flow'
          helperElement={
            <Typography variant='body1'>
              Please upload the cash flow statements of multiple year
            </Typography>
          }
        />
        <VSpacer size={'medium'} />
        <UploadDocumentField
          name='balanceSheet'
          label='Balance Sheet'
          helperElement={
            <Typography variant='body1'>
              Please upload the balance sheet statements of multiple year
            </Typography>
          }
        />
      </Grid>
    </Fragment>
  )
}

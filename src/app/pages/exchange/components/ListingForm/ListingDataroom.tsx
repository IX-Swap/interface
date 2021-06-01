import React, { Fragment } from 'react'
import { Grid } from '@material-ui/core'
import { FormSectionHeader } from 'app/components/DSO/components/FormSectionHeader'
import { ListingDocumentUploader } from 'app/pages/exchange/components/ListingForm/ListingDocumentUploader'

export const ListingDataroom = () => {
  return (
    <Fragment>
      <FormSectionHeader title='Upload Documents' />

      <Grid container direction='column' spacing={3}>
        <ListingDocumentUploader
          name={'incomeStatement'}
          label={'Income Statement'}
          helperText={
            'Please upload the cash income statements of multiple year'
          }
        />
        <ListingDocumentUploader
          name={'cashFlow'}
          label={'Cash Flow'}
          helperText={'Please upload the cash flow statements of multiple year'}
        />
        <ListingDocumentUploader
          name={'balanceSheet'}
          label={'Balance Sheet'}
          helperText={
            'Please upload the balance sheet statements of multiple year'
          }
        />
      </Grid>
    </Fragment>
  )
}

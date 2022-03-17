import { Grid } from '@mui/material'
import { UploadDocumentField } from 'app/pages/identity/components/UploadDocumentsForm/UploadDocumentField/UploadDocumentField'
import { DownloadTemplate } from 'app/pages/issuance/components/UploadReportForm/DownloadTemplate'
import { FinancialReportDSOSelect } from 'app/pages/issuance/components/UploadReportForm/FinancialReportDSOSelect'
import { ReportDetails } from 'app/pages/issuance/components/UploadReportForm/ReportDetails'
import { SaveReportButton } from 'app/pages/issuance/components/UploadReportForm/SaveReportButton'
import React from 'react'

export const UploadReportFormFields = () => {
  return (
    <Grid container alignItems='flex-end' spacing={5}>
      <Grid item xs={12} md={4}>
        <FinancialReportDSOSelect />
      </Grid>
      <Grid item container xs={12} md={8} justifyContent='flex-end'>
        <SaveReportButton />
      </Grid>
      <Grid item xs={12}>
        <DownloadTemplate />
      </Grid>
      <Grid item xs={12}>
        <ReportDetails />
      </Grid>
      <Grid item xs={12}>
        <UploadDocumentField name='reportDocuments' label='Documents' />
      </Grid>
    </Grid>
  )
}

import React from 'react'
import { Grid } from '@mui/material'
import { ReportDocuments } from 'app/pages/issuance/components/ReportDetails/ReportDocuments'
import { useReport } from 'app/pages/issuance/hooks/useReport'
import { FormSectionHeader } from 'app/pages/identity/components/FormSectionHeader'
import { useParams } from 'react-router-dom'
import { ReportInfo } from 'app/pages/issuance/components/ReportDetails/ReportInfo'

export const ReportDetails = () => {
  const params = useParams<{ reportId: string }>()
  const { data, isLoading } = useReport(params.reportId)

  if (data === undefined || isLoading) {
    return null
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormSectionHeader title={data.dso.tokenName} />
      </Grid>
      <Grid item xs={12} md={5}>
        <ReportInfo report={data} />
      </Grid>
      <Grid item xs={12} md={7}>
        <ReportDocuments report={data} />
      </Grid>
    </Grid>
  )
}

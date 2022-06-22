import React from 'react'
import { Grid, Paper } from '@mui/material'
import { EmploymentField } from 'app/pages/identity/components/FinancialInformationForm/EmploymentFields'
import { NoticeOfAssesment } from 'app/pages/identity/components/FinancialInformationForm/NoticeOfAssesment/NoticeOfAssesment'
import { useIsSingPass } from 'app/pages/identity/hooks/useIsSingPass'
import { FormSectionHeader } from 'app/pages/identity/components/FormSectionHeader'

export const FinancialInformationForm = () => {
  const { isSingPass, singPassData } = useIsSingPass()

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Paper sx={{ borderRadius: 2, p: 5 }}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <FormSectionHeader title='Financial Information' />
            </Grid>
            <Grid item xs={12}>
              <EmploymentField />
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      {isSingPass && singPassData?.noahistory !== undefined && (
        <Grid item xs={12}>
          <Paper sx={{ borderRadius: 2, p: 5 }}>
            <NoticeOfAssesment />
          </Paper>
        </Grid>
      )}
    </Grid>
  )
}

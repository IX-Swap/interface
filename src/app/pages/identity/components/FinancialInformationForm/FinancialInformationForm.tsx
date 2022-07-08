import React from 'react'
import { Grid } from '@mui/material'
import { EmploymentField } from 'app/pages/identity/components/FinancialInformationForm/EmploymentFields'
import { NoticeOfAssesment } from 'app/pages/identity/components/FinancialInformationForm/NoticeOfAssesment/NoticeOfAssesment'
import { useIsSingPass } from 'app/pages/identity/hooks/useIsSingPass'
import { FormSectionHeader } from 'app/pages/identity/components/FormSectionHeader'
import { FieldContainer } from 'app/pages/identity/components/FieldContainer/FieldContainer'

export const FinancialInformationForm = () => {
  const { isSingPass, singPassData } = useIsSingPass()

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <FieldContainer>
          <Grid container direction={'column'} spacing={5}>
            <Grid item>
              <FormSectionHeader title='Financial Information' />
            </Grid>
            <Grid item>
              <EmploymentField />
            </Grid>
          </Grid>
        </FieldContainer>
      </Grid>

      {isSingPass && singPassData?.noahistory !== undefined && (
        <Grid item xs={12}>
          <FieldContainer>
            <NoticeOfAssesment />
          </FieldContainer>
        </Grid>
      )}
    </Grid>
  )
}

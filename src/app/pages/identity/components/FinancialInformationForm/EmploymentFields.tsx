import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Grid, MenuItem, TextField, Typography } from '@mui/material'
import { VSpacer } from 'components/VSpacer'
import { TypedField } from 'components/form/TypedField'
import { AnnualIncomeSelect } from 'components/form/AnnualIncomeSelect'
import { EmploymentStatusSelect } from 'app/pages/identity/components/FinancialInformationForm/EmploymentStatusSelect'
import { OccupationSelect } from './OccupationSelect'
import { useIsSingPass } from 'app/pages/identity/hooks/useIsSingPass'
import { hasValue } from 'helpers/forms'

export const EmploymentField = () => {
  const { control } = useFormContext()
  const { isSingPass, singPassData, individualIdentity } = useIsSingPass()

  const occupationIsSingPass =
    isSingPass && hasValue(singPassData?.employmentsector)

  return (
    <Grid container direction='column'>
      <Grid item>
        <Grid container spacing={6}>
          <Grid item xs={12} md={4}>
            <TypedField
              component={occupationIsSingPass ? TextField : OccupationSelect}
              control={control}
              variant='outlined'
              name='occupation'
              label='Occupation'
              data-testid='Occupation-select'
              fullWidth
              disabled={occupationIsSingPass}
              select={occupationIsSingPass}
            >
              {occupationIsSingPass ? (
                <MenuItem value={individualIdentity?.occupation}>
                  {individualIdentity?.occupation}
                </MenuItem>
              ) : null}
            </TypedField>
          </Grid>
          <Grid item xs={12} md={4}>
            <TypedField
              component={EmploymentStatusSelect}
              control={control}
              variant='outlined'
              name='employmentStatus'
              label='Employment Status'
              data-testid='Employment-select'
              fullWidth
              disabled={isSingPass && hasValue(singPassData?.employmentstatus)}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TypedField
              component={TextField}
              control={control}
              variant='outlined'
              name='employer'
              label='Employer'
              helperText='Name of the company you own or you are employed'
              fullWidth
              disabled={isSingPass && hasValue(singPassData?.employment)}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Typography variant='subtitle1'>
          Income in SGD in preceding 12 months:
        </Typography>
        <VSpacer size='small' />
        <Grid container spacing={6}>
          <Grid item xs={12} md={4}>
            <TypedField
              component={AnnualIncomeSelect}
              control={control}
              variant='outlined'
              name='annualIncome'
              label='Please select one'
              fullWidth
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

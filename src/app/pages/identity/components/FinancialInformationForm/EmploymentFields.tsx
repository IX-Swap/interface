import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Grid, MenuItem, TextField } from '@mui/material'
import { TypedField } from 'components/form/TypedField'
import { EmploymentStatusSelect } from 'app/pages/identity/components/FinancialInformationForm/EmploymentStatusSelect'
import { OccupationSelect } from './OccupationSelect'
import { useIsSingPass } from 'app/pages/identity/hooks/useIsSingPass'
import { hasValue } from 'helpers/forms'
import { TextInput } from 'ui/TextInput/TextInput'
import { FundSourceSelect } from 'components/form/FundSourceSelect'
import { OptionalLabel } from 'components/form/OptionalLabel'
import { AnnualIncomeSelect } from 'components/form/AnnualIncomeSelect'

export const EmploymentField = () => {
  const { control } = useFormContext()
  const { isSingPass, singPassData, individualIdentity } = useIsSingPass()

  const occupationIsSingPass =
    isSingPass && hasValue(singPassData?.employmentsector)

  const statusIsSingPass =
    isSingPass && hasValue(singPassData?.employmentstatus)

  return (
    <Grid container direction='column'>
      <Grid item>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TypedField
              component={occupationIsSingPass ? TextField : OccupationSelect}
              control={control}
              variant='outlined'
              name='occupation'
              label={<OptionalLabel label='Occupation' />}
              placeholder='Occupation'
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
          <Grid item xs={12} md={6}>
            <TypedField
              component={statusIsSingPass ? TextField : EmploymentStatusSelect}
              control={control}
              variant='outlined'
              name='employmentStatus'
              label='Employment Sector'
              data-testid='Employment-select'
              fullWidth
              disabled={statusIsSingPass}
              select={statusIsSingPass}
              placeholder='Select Employment Status'
            >
              {statusIsSingPass ? (
                <MenuItem value={individualIdentity?.employmentStatus}>
                  {individualIdentity?.employmentStatus}
                </MenuItem>
              ) : null}
            </TypedField>
          </Grid>
          <Grid item xs={12} md={6}>
            <TypedField
              component={TextInput}
              control={control}
              variant='outlined'
              name='employer'
              label='Employer'
              placeholder='Name of the company'
              fullWidth
              disabled={isSingPass && hasValue(singPassData?.employment)}
            />
          </Grid>
          {!isSingPass && (
            <Grid item xs={12} md={6}>
              <TypedField
                component={AnnualIncomeSelect}
                control={control}
                variant='outlined'
                name='annualIncome'
                label='Income in SGD in preceding 12 months'
                placeholder='Please select one'
                fullWidth
              />
            </Grid>
          )}
          <Grid item xs={12} md={6}>
            <TypedField
              component={FundSourceSelect}
              control={control}
              variant='outlined'
              name='sourceOfFund'
              label='Source of funds'
              placeholder='Select Source Of Funds'
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

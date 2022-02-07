import React from 'react'
import { Grid, FormControlLabel, Radio } from '@mui/material'
import { TaxResidencyFieldArray } from 'app/pages/identity/components/TaxDeclarationForm/TaxResidencyFields/TaxRecidencyFieldArray'
import { useFormContext } from 'react-hook-form'

export const InternationalFields = () => {
  const { control } = useFormContext()
  const { singaporeOnly } = control.getValues()

  return (
    <Grid container direction='column' spacing={3}>
      <Grid item>
        <FormControlLabel
          label='NO, I’m currently tax resident in the following list of jurisdictions (including Singapore, if applicable):'
          value='no'
          control={<Radio />}
        />
      </Grid>
      {singaporeOnly === 'no' ? (
        <Grid item>
          <TaxResidencyFieldArray />
        </Grid>
      ) : null}
    </Grid>
  )
}

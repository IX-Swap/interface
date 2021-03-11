import React from 'react'
import { Grid, FormControlLabel, Radio } from '@material-ui/core'
import { useTaxResidencies } from 'app/pages/_identity/components/TaxDeclarationForm/hooks/useTaxResidencies'
import { TaxResidencyFieldArray } from 'app/pages/_identity/components/TaxDeclarationForm/TaxResidencyFields/TaxRecidencyFieldArray'

export const InternationalFields = () => {
  const { singaporeOnly } = useTaxResidencies()

  return (
    <Grid container direction='column' spacing={3}>
      <Grid item>
        <FormControlLabel
          label='NO, I’m currently tax resident in the following list of countries/ jurisdictions (including Singapore, if applicable):'
          value='no'
          control={<Radio />}
        />
      </Grid>
      {!singaporeOnly && (
        <Grid item>
          <TaxResidencyFieldArray />
        </Grid>
      )}
    </Grid>
  )
}

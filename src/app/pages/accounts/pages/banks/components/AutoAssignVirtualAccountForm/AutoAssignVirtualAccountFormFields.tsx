import { FormControlLabel, Grid, Radio, Typography } from '@material-ui/core'
import { RadioGroup } from 'components/form/RadioGroup'
import { TypedField } from 'components/form/TypedField'
import React from 'react'
import { useFormContext } from 'react-hook-form'

export const AutoAssignVirtualAccountFormFields = () => {
  const { control } = useFormContext()

  return (
    <>
      {/* @ts-ignore */}
      <TypedField
        customRenderer
        component={RadioGroup}
        name='currency'
        label=''
        control={control}
      >
        <Grid container spacing={2} alignContent='center'>
          <Grid item xs={12}>
            <Typography variant='subtitle1'>
              To begin investing, please select the currency to pre-fund your
              account.
            </Typography>
          </Grid>
          <Grid item>
            <FormControlLabel label='SGD' value='SGD' control={<Radio />} />
          </Grid>
          <Grid item>
            <FormControlLabel label='USD' value='USD' control={<Radio />} />
          </Grid>
        </Grid>
      </TypedField>
    </>
  )
}

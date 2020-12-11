import React from 'react'
import { Grid } from '@material-ui/core'
import { useFormContext } from 'react-hook-form'
import { TypedField } from 'components/form/TypedField'
import { DSOSelect } from './DSOSelect'

export const DSOFilter = () => {
  const { control } = useFormContext()

  return (
    <Grid container justify='center' style={{ marginBottom: 20 }}>
      <Grid item xs={3} justify='center' container>
        <TypedField
          control={control}
          component={DSOSelect}
          name='dso'
          label='My DSO(s)'
        />
      </Grid>
    </Grid>
  )
}

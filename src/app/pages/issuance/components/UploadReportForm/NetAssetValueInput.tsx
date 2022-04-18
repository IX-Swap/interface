import { Grid, Typography } from '@mui/material'
import { TypedField } from 'components/form/TypedField'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { TextInput } from 'ui/TextInput/TextInput'

export const NetAssetValueInput = () => {
  const { control } = useFormContext()
  return (
    <Grid
      container
      spacing={2}
      alignItems='center'
      wrap='nowrap'
      justifyContent='space-between'
    >
      <Grid item>
        <Typography variant='subtitle2' noWrap>
          Net Asset Value, $(NAV)*:
        </Typography>
      </Grid>
      <Grid item xs>
        <TypedField
          component={TextInput}
          name='nav'
          control={control}
          variant='outlined'
          size='small'
        />
      </Grid>
    </Grid>
  )
}

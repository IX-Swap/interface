import React from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import { TypedField } from 'components/form/TypedField'
import { useFormContext } from 'react-hook-form'
import { TokenSelect } from 'app/pages/accounts/components/TokenSelect'

export const TokensField = () => {
  const { control } = useFormContext()

  return (
    <Grid container alignItems='flex-start' spacing={2}>
      <Grid item xs={3}>
        <Typography variant='body1' align='right'>
          <Box component='span' fontWeight='bold'>
            Select Tokens:
          </Box>
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <TypedField
          control={control}
          component={TokenSelect}
          name='token'
          label='Tokens'
          variant='outlined'
          fullWidth
        />
      </Grid>
    </Grid>
  )
}

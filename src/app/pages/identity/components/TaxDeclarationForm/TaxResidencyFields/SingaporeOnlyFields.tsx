import { Box, FormControlLabel, Grid, Radio, Typography } from '@mui/material'
import { TypedField } from 'components/form/TypedField'
import { VSpacer } from 'components/VSpacer'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { TextInput } from 'ui/TextInput/TextInput'

export const SingaporeOnlyFields = () => {
  const { control } = useFormContext()
  const { singaporeOnly } = control.getValues()

  return (
    <Grid container direction='column' spacing={3}>
      <Grid item>
        <Typography>
          Are you currently solely a tax resident of Singapore?
        </Typography>
        <VSpacer size='small' />
        <FormControlLabel
          label='YES, I’m currently only tax resident in Singapore and do not have a foreign tax residency.'
          value='yes'
          control={<Radio />}
        />
      </Grid>
      {singaporeOnly === 'yes' && (
        <Grid item xs={12} md={4} style={{ paddingBottom: 50 }}>
          <Typography>
            <Box fontWeight='bold' component='span'>
              My Singapore NRIC/FIN is:
            </Box>
          </Typography>

          <VSpacer size='small' />
          <TypedField
            component={TextInput}
            variant='outlined'
            control={control}
            name={['taxResidencies', 0, 'taxIdentificationNumber']}
            label='NRIC/FIN'
          />
        </Grid>
      )}
    </Grid>
  )
}

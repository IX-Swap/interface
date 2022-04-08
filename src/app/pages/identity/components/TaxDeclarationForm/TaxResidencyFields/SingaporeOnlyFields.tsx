import React from 'react'
import {
  Box,
  Grid,
  Typography,
  FormControlLabel,
  TextField
} from '@mui/material'
import { TypedField } from 'components/form/TypedField'
import { useFormContext } from 'react-hook-form'
import { VSpacer } from 'components/VSpacer'
import { UIRadio } from 'components/UIRadio/UIRadio'

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
          control={<UIRadio />}
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
            component={TextField}
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

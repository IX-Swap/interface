import React from 'react'
import { Box, FormControlLabel, Grid, Typography } from '@mui/material'
import { TypedField } from 'components/form/TypedField'
import { VSpacer } from 'components/VSpacer'
import { useIsSingPass } from 'app/pages/identity/hooks/useIsSingPass'
import { UIRadio } from 'components/UIRadio/UIRadio'
import { useFormContext } from 'react-hook-form'
import { TextInput } from 'ui/TextInput/TextInput'

export const SingaporeOnlyFields = () => {
  const { control } = useFormContext()
  const { singaporeOnly } = control.getValues()
  const { isSingPass } = useIsSingPass()

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
            component={TextInput}
            variant='outlined'
            control={control}
            name={['taxResidencies', 0, 'taxIdentificationNumber']}
            label='NRIC/FIN'
            disabled={isSingPass}
          />
        </Grid>
      )}
    </Grid>
  )
}

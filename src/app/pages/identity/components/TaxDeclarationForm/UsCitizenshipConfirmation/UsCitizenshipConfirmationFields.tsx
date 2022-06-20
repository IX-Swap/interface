import { FormControlLabel, Grid, useTheme, Typography } from '@mui/material'
import { RadioGroup } from 'components/form/RadioGroup'
import { TypedField } from 'components/form/TypedField'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { UIRadio } from 'components/UIRadio/UIRadio'
import { TextInput } from 'ui/TextInput/TextInput'

export const UsCitizenshipConfirmationFields = () => {
  const { control, watch } = useFormContext()
  const fatca = watch('fatca')
  const theme = useTheme()
  return (
    <>
      <TypedField
        customRenderer
        component={RadioGroup}
        name={'fatca'}
        label=''
        control={control}
      >
        <FormControlLabel
          label={
            <Typography
              fontWeight={fatca !== 'yes' ? 500 : 400}
              color={fatca !== 'yes' ? theme.palette.text.secondary : ''}
              lineHeight='150%'
              letterSpacing='-0.01em'
            >
              I confirm that I am a US citizen and/or resident in the US for tax
              purposes and my U.S. federal
            </Typography>
          }
          value='yes'
          control={<UIRadio />}
        />
        {fatca === 'yes' ? (
          <Grid pl={2} container spacing={2} direction='column'>
            <Grid item />
            <Grid item xs={12} sm={4}>
              <TypedField
                control={control}
                component={TextInput}
                label='US TIN'
                defaultValue=''
                name='usTin'
                variant='outlined'
                placeholder='Enter US TIN'
              />
            </Grid>
            <Grid item />
          </Grid>
        ) : null}
        <FormControlLabel
          label={
            <Typography
              fontWeight={fatca !== 'no' ? 500 : 400}
              color={fatca !== 'no' ? theme.palette.text.secondary : ''}
              lineHeight='150%'
              letterSpacing='-0.01em'
            >
              I confirm that I am not a US citizen or resident in the US for tax
              purposes.
            </Typography>
          }
          value='no'
          control={<UIRadio />}
        />
      </TypedField>
    </>
  )
}

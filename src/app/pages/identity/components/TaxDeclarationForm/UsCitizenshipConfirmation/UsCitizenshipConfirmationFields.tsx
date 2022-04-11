import { FormControlLabel, Grid } from '@mui/material'
import { RadioGroup } from 'components/form/RadioGroup'
import { TypedField } from 'components/form/TypedField'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { UIRadio } from 'components/UIRadio/UIRadio'
import { TextInput } from 'ui/TextInput/TextInput'

export const UsCitizenshipConfirmationFields = () => {
  const { control, watch } = useFormContext()
  const fatca = watch('fatca')
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
          label='I confirm that I am a US citizen and/or resident in the US for tax purposes and my U.S. federal Taxpayer Identifying Number (US TIN) is as follows:'
          value='yes'
          control={<UIRadio />}
        />
        {fatca === 'yes' ? (
          <Grid container spacing={2} direction='column'>
            <Grid item />
            <Grid item xs={12} sm={4}>
              <TypedField
                control={control}
                component={TextInput}
                label='US TIN'
                defaultValue=''
                name='usTin'
                variant='outlined'
                fullWidth
              />
            </Grid>
            <Grid item />
          </Grid>
        ) : null}
        <FormControlLabel
          label='I confirm that I am not a US citizen or resident in the US for tax purposes.'
          value='no'
          control={<UIRadio />}
        />
      </TypedField>
    </>
  )
}

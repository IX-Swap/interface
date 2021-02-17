import React from 'react'
import { RadioGroup } from 'components/form/RadioGroup'
import { TypedField } from 'components/form/TypedField'
import { useFormContext } from 'react-hook-form'
import { FormControlLabel, Radio } from '@material-ui/core'

export const UsCitizenshipConfirmationFields = () => {
  const { control } = useFormContext()

  return (
    <>
      {/* @ts-ignore */}
      <TypedField
        customRenderer
        component={RadioGroup}
        name='declarations.tax.isUsCitizen'
        label=''
        control={control}
      >
        <FormControlLabel
          label='I confirm that I am a US citizen* and/or resident in the US for tax purposes and my U.S. federal Taxpayer Identifying Number (US TIN) is as follows:'
          value='yes'
          control={<Radio />}
        />
        <FormControlLabel
          label='I confirm that I am not a US citizen or resident in the US for tax purposes.'
          value='no'
          control={<Radio />}
        />
      </TypedField>
    </>
  )
}

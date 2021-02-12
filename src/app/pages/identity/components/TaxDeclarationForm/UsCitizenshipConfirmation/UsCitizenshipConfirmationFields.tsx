import React from 'react'
import { RadioGroup } from 'components/form/RadioGroup'
import { TypedField } from 'components/form/TypedField'
import { useFormContext } from 'react-hook-form'
import { FormControlLabel } from '@material-ui/core'
import { SquareRadio } from 'components/form/SquareRadio'

export const UsCitizenshipConfirmationFields = () => {
  const { control, watch } = useFormContext()
  const isUSCitizen = watch('declarations.tax.isUsCitizen', '')
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
          control={<SquareRadio checked={isUSCitizen === 'yes'} />}
        />
        <FormControlLabel
          label='I confirm that I am not a US citizen or resident in the US for tax purposes.'
          value='no'
          control={<SquareRadio checked={isUSCitizen === 'no'} />}
        />
      </TypedField>
    </>
  )
}

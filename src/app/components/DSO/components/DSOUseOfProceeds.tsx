import React from 'react'
import { TypedField } from 'components/form/TypedField'
import { RichTextEditor } from 'components/form/RichTextEditor'
import { wysiwygValueExtractor } from 'helpers/forms'
import { DSOContainer } from 'app/components/DSO/components/DSOContainer'
import { useFormContext } from 'react-hook-form'
import { DSOFormValues } from 'types/dso'
import { FormError } from 'components/form/FormError'
import { TextError } from 'components/TextError'

export const DSOUseOfProceeds = () => {
  const { control } = useFormContext<DSOFormValues>()

  return (
    <DSOContainer
      title='Use of Proceeds'
      subtitle='A short description that summarizes how a company that aims to secure additional capital is going to spend the funds'
      item
      xs={12}
    >
      <TypedField
        control={control}
        component={RichTextEditor}
        customRenderer
        label='Use of Proceeds'
        name='useOfProceeds'
        valueExtractor={wysiwygValueExtractor}
      />

      <FormError name='useOfProceeds' render={TextError} />
    </DSOContainer>
  )
}

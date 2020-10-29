import React from 'react'
import { TypedField } from 'v2/components/form/TypedField'
import { RichTextEditor } from 'v2/components/form/RichTextEditor'
import { wysiwygValueExtractor } from 'v2/helpers/forms'
import { DSOContainer } from 'v2/app/components/DSO/components/DSOContainer'
import { useFormContext } from 'react-hook-form'
import { DSOFormValues } from 'v2/types/dso'

export const DSOUseOfProceeds = () => {
  const { control } = useFormContext<DSOFormValues>()

  return (
    <DSOContainer title='Use of Proceeds' item xs={12}>
      {/* @ts-ignore */}
      <TypedField
        control={control}
        component={RichTextEditor}
        customRenderer
        label='Use of Proceeds'
        name='useOfProceeds'
        valueExtractor={wysiwygValueExtractor}
      />
    </DSOContainer>
  )
}

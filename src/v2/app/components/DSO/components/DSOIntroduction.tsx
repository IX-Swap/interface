import React from 'react'
import { TypedField } from 'v2/components/form/TypedField'
import { RichTextEditor } from 'v2/components/form/RichTextEditor'
import { wysiwygValueExtractor } from 'v2/helpers/forms'
import { DSOContainer } from 'v2/app/components/DSO/components/DSOContainer'
import { useFormContext } from 'react-hook-form'
import { DSOFormValues } from 'v2/types/dso'

export const DSOIntroduction = () => {
  const { control } = useFormContext<DSOFormValues>()

  return (
    <DSOContainer title='Introduction' item xs={8}>
      {/* @ts-ignore */}
      <TypedField
        component={RichTextEditor}
        customRenderer
        label='Introduction'
        name='introduction'
        control={control}
        valueExtractor={wysiwygValueExtractor}
      />
    </DSOContainer>
  )
}

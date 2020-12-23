import React from 'react'
import { TypedField } from 'components/form/TypedField'
import { RichTextEditor } from 'components/form/RichTextEditor'
import { wysiwygValueExtractor } from 'helpers/forms'
import { DSOContainer } from 'app/components/DSO/components/DSOContainer'
import { useFormContext } from 'react-hook-form'
import { DSOFormValues } from 'types/dso'

export const DSOIntroduction = () => {
  const { control } = useFormContext<DSOFormValues>()

  return (
    <DSOContainer title='Introduction' item xs={12} md={8}>
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

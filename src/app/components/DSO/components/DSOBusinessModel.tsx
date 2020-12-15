import React from 'react'
import { TypedField } from 'components/form/TypedField'
import { RichTextEditor } from 'components/form/RichTextEditor'
import { wysiwygValueExtractor } from 'helpers/forms'
import { DSOContainer } from 'app/components/DSO/components/DSOContainer'
import { useFormContext } from 'react-hook-form'
import { DSOFormValues } from 'types/dso'

export const DSOBusinessModel = () => {
  const { control } = useFormContext<DSOFormValues>()

  return (
    <DSOContainer title='Business Model' item xs={12}>
      {/* @ts-ignore */}
      <TypedField
        control={control}
        component={RichTextEditor}
        customRenderer
        label='Business Model'
        name='businessModel'
        valueExtractor={wysiwygValueExtractor}
      />
    </DSOContainer>
  )
}

import React from 'react'
import { EditableField } from 'v2/components/form/EditableField'
import { RichTextEditor } from 'v2/components/form/RichTextEditor'
import { plainValueExtractor } from 'v2/components/form/createTypedForm'
import { DSOContainer } from 'v2/app/components/DSO/components/DSOContainer'
import { useFormContext } from 'react-hook-form'
import { DSOFormValues } from 'v2/types/dso'

export const DSOIntroduction = () => {
  const { control } = useFormContext<DSOFormValues>()

  return (
    <DSOContainer title='Introduction' item xs={8}>
      {/* @ts-ignore */}
      <EditableField
        component={RichTextEditor}
        label='Introduction'
        name='introduction'
        control={control}
        valueExtractor={plainValueExtractor}
      />
    </DSOContainer>
  )
}

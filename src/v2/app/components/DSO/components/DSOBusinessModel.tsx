import React from 'react'
import { EditableField } from 'v2/components/form/EditableField'
import { RichTextEditor } from 'v2/components/form/RichTextEditor'
import { plainValueExtractor } from 'v2/components/form/createTypedForm'
import { DSOContainer } from 'v2/app/components/DSO/components/DSOContainer'
import { useFormContext } from 'react-hook-form'
import { DSOFormValues } from 'v2/types/dso'

export const DSOBusinessModel = () => {
  const { control } = useFormContext<DSOFormValues>()

  return (
    <DSOContainer title='Business Model' item xs={12}>
      {/* @ts-ignore */}
      <EditableField
        control={control}
        component={RichTextEditor}
        label='Business Model'
        name='businessModel'
        valueExtractor={plainValueExtractor}
      />
    </DSOContainer>
  )
}

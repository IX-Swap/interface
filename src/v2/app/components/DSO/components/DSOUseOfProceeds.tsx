import React from 'react'
import { EditableField } from 'v2/components/form/EditableField'
import { RichTextEditor } from 'v2/components/form/RichTextEditor'
import { plainValueExtractor } from 'v2/components/form/createTypedForm'
import { DSOContainer } from 'v2/app/components/DSO/components/DSOContainer'
import { useFormContext } from 'react-hook-form'
import { DSOFormValues } from 'v2/types/dso'

export const DSOUseOfProceeds = () => {
  const { control } = useFormContext<DSOFormValues>()

  return (
    <DSOContainer title='Use of Proceeds' item xs={12}>
      {/* @ts-ignore */}
      <EditableField
        control={control}
        component={RichTextEditor}
        label='Use of Proceeds'
        name='useOfProceeds'
        valueExtractor={plainValueExtractor}
      />
    </DSOContainer>
  )
}

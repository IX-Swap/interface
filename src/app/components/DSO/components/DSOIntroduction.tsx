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
    <DSOContainer
      title='Company Information'
      subtitle='A short description of the company helps investors know more about your company.'
      item
      xs={12}
      md={12}
    >
      <TypedField
        component={RichTextEditor}
        customRenderer
        label='Company Information'
        name='introduction'
        control={control}
        valueExtractor={wysiwygValueExtractor}
      />
    </DSOContainer>
  )
}

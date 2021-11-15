import React from 'react'
import { TypedField } from 'components/form/TypedField'
import { RichTextEditor } from 'components/form/RichTextEditor'
import { wysiwygValueExtractor } from 'helpers/forms'
import { DSOContainer } from 'app/components/DSO/components/DSOContainer'
import { useFormContext } from 'react-hook-form'
import { DSOFormValues } from 'types/dso'

export const DSOFundRaisingMilestone = () => {
  const { control } = useFormContext<DSOFormValues>()

  return (
    <DSOContainer
      title='Fund Raising Milestone'
      subtitle='A short description of fundraising milestones.'
      item
      xs={12}
    >
      <TypedField
        control={control}
        component={RichTextEditor}
        customRenderer
        label='Fund Raising Milestone'
        name='fundraisingMilestone'
        valueExtractor={wysiwygValueExtractor}
      />
    </DSOContainer>
  )
}

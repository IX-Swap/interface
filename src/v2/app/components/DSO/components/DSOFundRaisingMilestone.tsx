import React from 'react'
import { TypedField } from 'v2/components/form/TypedField'
import { RichTextEditor } from 'v2/components/form/RichTextEditor'
import { plainValueExtractor } from 'v2/helpers/forms'
import { DSOContainer } from 'v2/app/components/DSO/components/DSOContainer'
import { useFormContext } from 'react-hook-form'
import { DSOFormValues } from 'v2/types/dso'

export const DSOFundRaisingMilestone = () => {
  const { control } = useFormContext<DSOFormValues>()

  return (
    <DSOContainer title='Fund Raising Milestone' item xs={12}>
      {/* @ts-ignore */}
      <TypedField
        control={control}
        component={RichTextEditor}
        customRenderer
        label='Fund Raising Milestone'
        name='fundraisingMilestone'
        valueExtractor={plainValueExtractor}
      />
    </DSOContainer>
  )
}

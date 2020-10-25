import React from 'react'
import { TypedField } from 'v2/components/form/TypedField'
import { plainValueExtractor } from 'v2/helpers/forms'
import { DSOContainer } from 'v2/app/components/DSO/components/DSOContainer'
import { useFormContext } from 'react-hook-form'
import { DSOFormValues } from 'v2/types/dso'
import { DefaultDataroomUploader } from 'v2/components/dataroom/DefaultDataroomUploader'

export const DSOSubscriptionDocument = () => {
  const { control } = useFormContext<DSOFormValues>()

  return (
    <DSOContainer title='Subscription Document' item xs={12}>
      {/* @ts-ignore */}
      <TypedField
        customRenderer
        control={control}
        component={DefaultDataroomUploader}
        label='Subscription Document'
        name='subscriptionDocument'
        valueExtractor={plainValueExtractor}
        documentInfo={{
          type: 'Subscription Document',
          title: 'Subscription Document'
        }}
        onDelete={() => {
          control.setValue('subscriptionDocument', null as any)
        }}
      />
    </DSOContainer>
  )
}

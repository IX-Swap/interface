import React from 'react'
import { EditableField } from 'v2/components/form/EditableField'
import { plainValueExtractor } from 'v2/components/form/createTypedForm'
import { DSOContainer } from 'v2/app/components/DSO/components/DSOContainer'
import { useFormContext } from 'react-hook-form'
import { DSOFormValues } from 'v2/types/dso'
import { NewDataroomUploader } from 'v2/components/form/NewDataroomUploader'
import { DataroomFileRow } from 'v2/components/form/DataroomFileRow'

export const DSOSubscriptionDocument = () => {
  const { control } = useFormContext<DSOFormValues>()

  return (
    <DSOContainer title='Subscription Document' item xs={12}>
      {/* @ts-ignore */}
      <EditableField
        control={control}
        component={NewDataroomUploader}
        label='Subscription Document'
        name='subscriptionDocument'
        valueExtractor={plainValueExtractor}
        render={DataroomFileRow}
        documentInfo={{
          type: 'Subscription Document'
        }}
      />
    </DSOContainer>
  )
}

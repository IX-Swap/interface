import React from 'react'
import { useDSOForm } from 'v2/app/components/DSO/DSOForm'
import { DataroomEditRow } from 'v2/app/pages/identity/components/dataroom/DataroomEditRow'
import { DataroomViewRow } from 'v2/app/pages/identity/components/dataroom/DataroomViewRow'

export interface DSOSubscriptionAndDocumentsProps {
  isEditing: boolean
  dsoOwnerId: string
  dsoId: string
}

export const DSOSubscriptionDocument = (
  props: DSOSubscriptionAndDocumentsProps
) => {
  const { isEditing } = props
  const { EditableField, FormValue } = useDSOForm()

  return (
    <EditableField
      fieldType='DataroomDocument'
      isEditing={isEditing}
      label='Subscription & Documents'
      name='subscriptionDocument'
      documentInfo={{
        title: 'Subscription Document',
        type: 'Subscription Document'
      }}
      canDelete={false}
      editRenderer={input => (
        <FormValue name='subscriptionDocument'>
          {value => (
            <DataroomEditRow
              input={input}
              title='Subscription Document'
              document={value}
            />
          )}
        </FormValue>
      )}
      viewRenderer={
        <FormValue name='subscriptionDocument'>
          {value => (
            <DataroomViewRow title='Subscription Document' document={value} />
          )}
        </FormValue>
      }
    />
  )
}

import React from 'react'
import { documentValueExtractor } from 'v2/app/components/DSO/utils'
import { useDSOForm } from 'v2/app/components/DSO/DSOForm'
import { DSOSubscriptionDocumentView } from 'v2/app/components/DSO/components/DSOSubscriptionDocumentView'

export interface DSOSubscriptionAndDocumentsProps {
  isEditing: boolean
  dsoOwnerId: string
  dsoId: string
}

export const DSOSubscriptionAndDocuments = (
  props: DSOSubscriptionAndDocumentsProps
) => {
  const { dsoId, dsoOwnerId, isEditing } = props
  const { EditableField } = useDSOForm()

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
      valueExtractor={documentValueExtractor}
      viewRenderer={
        <DSOSubscriptionDocumentView dsoId={dsoId} dsoOwnerId={dsoOwnerId} />
      }
    />
  )
}

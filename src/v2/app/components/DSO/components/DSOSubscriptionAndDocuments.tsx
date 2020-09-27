import React from 'react'
import { documentValueExtractor } from 'v2/app/components/DSO/utils'
import { DownloadDocument } from 'v2/app/pages/identity/components/dataroom/DownloadDocument'
import { useDSOForm } from 'v2/app/components/DSO/DSOForm'

interface DSOSubscriptionAndDocumentsProps {
  isEditing: boolean
  dsoOwnerId: string
  dsoId: string
}

export const DSOSubscriptionAndDocuments = (
  props: DSOSubscriptionAndDocumentsProps
) => {
  const { dsoId, dsoOwnerId, isEditing } = props
  const { EditableField, FormValue } = useDSOForm()

  return (
    <EditableField
      fieldType='DocumentUploader'
      isEditing={isEditing}
      label='Subscription & Documents'
      name='subscriptionDocument'
      title='Subscription Document'
      canDelete={false}
      valueExtractor={documentValueExtractor}
      viewRenderer={
        <FormValue name='subscriptionDocument'>
          {documentId =>
            dsoId === undefined ? null : (
              <DownloadDocument documentId={documentId} ownerId={dsoOwnerId} />
            )
          }
        </FormValue>
      }
    />
  )
}

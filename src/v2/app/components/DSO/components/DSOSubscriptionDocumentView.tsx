import React from 'react'
import { DownloadDocument } from 'v2/app/pages/identity/components/dataroom/DownloadDocument'
import { useDSOForm } from 'v2/app/components/DSO/DSOForm'

export interface DSOSubscriptionDocumentViewProps {
  dsoOwnerId: string
  dsoId?: string
}

export const DSOSubscriptionDocumentView: React.FC<DSOSubscriptionDocumentViewProps> = ({
  dsoId,
  dsoOwnerId
}) => {
  const { FormValue } = useDSOForm()

  return (
    <FormValue name='subscriptionDocument'>
      {document =>
        dsoId === undefined || document === undefined ? null : (
          <DownloadDocument documentId={document._id} ownerId={dsoOwnerId} />
        )
      }
    </FormValue>
  )
}

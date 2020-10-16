import React from 'react'
import { DownloadDocument } from 'v2/app/pages/identity/components/dataroom/DownloadDocument'
import { DigitalSecurityOffering } from 'v2/types/dso'
import { DownloadSubscriptionDocumentButton } from './DownloadSubscriptionDocumentButton'

export interface DownloadSubscriptionDocumentProps {
  dso: DigitalSecurityOffering
}

export const DownloadSubscriptionDocument = (
  props: DownloadSubscriptionDocumentProps
) => {
  const { dso } = props

  return (
    <DownloadDocument documentId={dso.subscriptionDocument} ownerId={dso.user}>
      {download => <DownloadSubscriptionDocumentButton download={download} />}
    </DownloadDocument>
  )
}

import React from 'react'
import { DownloadDocument } from 'v2/app/pages/identity/components/dataroom/DownloadDocument'
import { DigitalSecurityOffering } from 'v2/types/dso'
import { Button } from '@material-ui/core'

export interface DownloadSubscriptionDocumentProps {
  dso: DigitalSecurityOffering
}

export const DownloadSubscriptionDocument = (
  props: DownloadSubscriptionDocumentProps
) => {
  const { dso } = props

  return (
    <DownloadDocument documentId={dso.subscriptionDocument} ownerId={dso.user}>
      {download => (
        <Button
          onClick={download}
          color='primary'
          variant='contained'
          fullWidth
        >
          Download Subscription Document
        </Button>
      )}
    </DownloadDocument>
  )
}

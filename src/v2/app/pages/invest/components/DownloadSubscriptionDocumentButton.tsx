import React from 'react'
import { Button } from '@material-ui/core'

export interface DownloadSubscriptionDocumentButtonProps {
  download: any
}

export const DownloadSubscriptionDocumentButton: React.FC<DownloadSubscriptionDocumentButtonProps> = ({
  download
}) => {
  return (
    <Button onClick={download} color='primary' variant='contained' fullWidth>
      Download Subscription Document
    </Button>
  )
}

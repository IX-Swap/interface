import React from 'react'
import { Button } from '@material-ui/core'
import { DownloadDocumentRendererProps } from 'v2/components/dataroom/DownloadDocument'

export interface DownloadSubscriptionDocumentButtonProps
  extends DownloadDocumentRendererProps {}

export const DownloadSubscriptionDocumentButton: React.FC<DownloadSubscriptionDocumentButtonProps> = ({
  download
}) => {
  return (
    <Button onClick={download} color='primary' variant='contained' fullWidth>
      Download Subscription Document
    </Button>
  )
}

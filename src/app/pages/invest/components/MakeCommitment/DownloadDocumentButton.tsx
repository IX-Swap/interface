import { DownloadDSOSubscriptionDocument } from 'app/components/DSO/components/DownloadDSOSubscriptionDocument'
import React from 'react'
import { DigitalSecurityOffering } from 'types/dso'
import { Icon } from 'ui/Icons/Icon'

export interface DownloadDocumentButtonProps {
  dso: DigitalSecurityOffering
}

export const DownloadDocumentButton = ({
  dso
}: DownloadDocumentButtonProps) => {
  const isCampaign = dso.isCampaign === true
  const downloadButton = isCampaign
    ? 'Download Investment Agreement'
    : 'Download Subscription Document'

  return (
    <DownloadDSOSubscriptionDocument
      dsoId={dso._id}
      name={dso.subscriptionDocument?.originalFileName}
      fullWidth
      variant='outlined'
      startIcon={<Icon name='download' />}
      sx={{
        borderStyle: 'dashed'
      }}
    >
      {downloadButton}
    </DownloadDSOSubscriptionDocument>
  )
}

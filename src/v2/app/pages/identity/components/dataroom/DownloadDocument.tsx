import React from 'react'
import { Button, Typography } from '@material-ui/core'
import { useDownloadRawDocument } from 'v2/hooks/useDownloadRawDocument'
import { convertBlobToFile, openFileInNewTab } from 'v2/hooks/utils'

export interface DownloadDocumentProps {
  documentId: string | undefined
  ownerId: string | undefined
}

export const DownloadDocument: React.FC<DownloadDocumentProps> = props => {
  const { documentId, ownerId } = props
  const [downloadDocument] = useDownloadRawDocument(
    { documentId: documentId ?? '', ownerId: ownerId ?? '' },
    {
      onSuccess: ({ data }) => {
        const file = convertBlobToFile(data, '') // TODO: fix name
        openFileInNewTab(file)
      }
    }
  )
  const handleClick = async () => await downloadDocument()

  if (documentId === undefined || ownerId === undefined) {
    return <Typography>No file uploaded</Typography>
  }

  return <Button onClick={handleClick}>Download</Button>
}

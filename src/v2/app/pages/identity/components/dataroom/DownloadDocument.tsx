import React from 'react'
import { Button, Typography } from '@material-ui/core'
import { useDownloadRawDocument } from 'v2/hooks/useDownloadRawDocument'
import { convertBlobToFile, openFileInNewTab } from 'v2/hooks/utils'

export interface DownloadDocumentProps {
  documentId: string
  ownerId: string
  children?: (download: () => any) => JSX.Element
}

export const DownloadDocument: React.FC<DownloadDocumentProps> = props => {
  const { documentId, ownerId, children } = props
  const [downloadDocument] = useDownloadRawDocument(
    { documentId, ownerId },
    {
      onSuccess: ({ data }) => {
        const file = convertBlobToFile(data, '') // TODO: fix name
        openFileInNewTab(file)
      }
    }
  )
  const handleClick = async () => await downloadDocument()

  if (documentId === undefined || documentId === '') {
    return <Typography>No file uploaded</Typography>
  }

  if (children !== undefined) {
    return children(downloadDocument)
  }

  return <Button onClick={handleClick}>Download</Button>
}

import React from 'react'
import { Button, Typography } from '@material-ui/core'
import { useDownloadRawDocument } from 'v2/hooks/useDownloadRawDocument'
import { convertBlobToFile, openFileInNewTab } from 'v2/hooks/utils'

export interface DownloadDocumentRendererProps {
  download: () => any
  isLoading: boolean
}

export interface DownloadDocumentProps {
  documentId: string
  ownerId: string
  children?: (props: DownloadDocumentRendererProps) => JSX.Element
}

export const DownloadDocument: React.FC<DownloadDocumentProps> = props => {
  const { documentId, ownerId, children } = props
  const [downloadDocument, { isLoading }] = useDownloadRawDocument(
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
    return children({ download: downloadDocument, isLoading })
  }

  return (
    <Button
      size='small'
      variant='outlined'
      onClick={handleClick}
      disabled={isLoading}
    >
      {isLoading ? 'Downloading...' : 'Download'}
    </Button>
  )
}

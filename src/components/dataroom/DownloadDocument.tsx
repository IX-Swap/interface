import React from 'react'
import { IconButton, Tooltip, Typography } from '@mui/material'
import { useDownloadRawDocument } from 'hooks/useDownloadRawDocument'
import {
  convertBlobToFile,
  downloadByFile,
  openFileInNewTab
} from 'hooks/utils'
import { Launch } from '@mui/icons-material'

export interface DownloadDocumentRendererProps {
  download: () => any
  isLoading: boolean
}

export interface DownloadDocumentProps {
  documentId: string
  ownerId: string
  name?: string
  action?: 'view' | 'download'
  children?: (props: DownloadDocumentRendererProps) => JSX.Element
}

export const DownloadDocument: React.FC<DownloadDocumentProps> = props => {
  const {
    documentId,
    action = 'download',
    ownerId,
    name = 'file.txt',
    children
  } = props
  const [downloadDocument, { isLoading }] = useDownloadRawDocument(
    { documentId, ownerId },
    {
      onSuccess: ({ data }) => {
        const file = convertBlobToFile(data, '')
        if (action === 'download') {
          downloadByFile(file, name)
        } else {
          openFileInNewTab(file)
        }
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
    <Tooltip title='Download File'>
      <IconButton onClick={handleClick} disabled={isLoading} size='large'>
        <Launch color='disabled' style={{ width: 23, height: 23 }} />
      </IconButton>
    </Tooltip>
  )
}

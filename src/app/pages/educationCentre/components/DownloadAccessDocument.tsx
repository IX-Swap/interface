import { Tooltip, IconButton } from '@mui/material'
import { Launch } from '@mui/icons-material'
import { documentsURL } from 'config/apiURL'
import { useDownloadRawDocument } from 'hooks/useDownloadRawDocument'
import { convertBlobToFile, openFileInNewTab } from 'hooks/utils'
import React from 'react'

export interface DownloadAccessDocumentProps {
  documentId: string
}

export const DownloadAccessDocument = (props: DownloadAccessDocumentProps) => {
  const { documentId } = props
  const [downloadDocument, { isLoading }] = useDownloadRawDocument(
    { documentId, uri: documentsURL.getAccessReport(documentId) },
    {
      onSuccess: ({ data }) => {
        const file = convertBlobToFile(data, '')
        openFileInNewTab(file)
      }
    }
  )
  const handleClick = async () => await downloadDocument()

  return (
    <Tooltip title='Download File'>
      <IconButton onClick={handleClick} disabled={isLoading} size="large">
        <Launch color='disabled' style={{ width: 23, height: 23 }} />
      </IconButton>
    </Tooltip>
  );
}

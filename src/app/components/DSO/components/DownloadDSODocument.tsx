import React from 'react'
import { useDownloadRawFile } from 'hooks/useDownloadRawFile'
import { IconButton, Tooltip } from '@mui/material'
import { convertBlobToFile, openFileInNewTab } from 'hooks/utils'
import { Launch } from '@mui/icons-material'

export interface DownloadDSODocumentProps {
  dsoId: string
  documentId: string
  type?: 'document' | 'subscriptionDocument'
}

export const DownloadDSODocument = (props: DownloadDSODocumentProps) => {
  const { dsoId, documentId, type = 'document' } = props
  const uri =
    type === 'document'
      ? `/issuance/dso/dataroom/documents/raw/${dsoId}/${documentId}`
      : `/issuance/dso/dataroom/subscription/raw/${dsoId}`
  const [download, { isLoading }] = useDownloadRawFile(uri, {
    onSuccess: ({ data }) => {
      const file = convertBlobToFile(data, '')
      openFileInNewTab(file)
    }
  })
  const handleDownload = async () => await download()

  return (
    <Tooltip title='Download File'>
      <IconButton disabled={isLoading} onClick={handleDownload} size="large">
        <Launch color='disabled' style={{ width: 23, height: 23 }} />
      </IconButton>
    </Tooltip>
  );
}

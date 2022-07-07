import React from 'react'
import {
  useDownloadRawFile,
  useOldDownloadRawFile
} from 'hooks/useDownloadRawFile'
import { IconButton, Tooltip } from '@mui/material'
import {
  convertBlobToFile,
  downloadByAnchor,
  openFileInNewTab
} from 'hooks/utils'
import { Launch } from '@mui/icons-material'

export interface DownloadDSODocumentProps {
  dsoId: string
  documentId: string
  type?: 'document' | 'subscriptionDocument'
}

export const DownloadDSODocument = (props: DownloadDSODocumentProps) => {
  const { dsoId, documentId, type = 'document' } = props
  const isDocument = type === 'document'
  const uri = isDocument
    ? `/issuance/dso/dataroom/documents/raw/${dsoId}/${documentId}`
    : `/issuance/dso/dataroom/subscription/raw/${dsoId}`
  const [download, { isLoading }] = useOldDownloadRawFile(uri, {
    onSuccess: ({ data }) => {
      const file = convertBlobToFile(data, '')
      openFileInNewTab(file)
    }
  })
  const [downloadNew, { isLoading: isLoadingNew }] = useDownloadRawFile(uri, {
    onSuccess: data => {
      downloadByAnchor(data, dsoId)
    }
  })
  const handleDownload = async () => {
    if (isDocument) {
      await download()
    } else {
      await downloadNew()
    }
  }

  return (
    <Tooltip title='Download File'>
      <IconButton
        disabled={isLoading || isLoadingNew}
        onClick={handleDownload}
        size='large'
      >
        <Launch color='disabled' style={{ width: 23, height: 23 }} />
      </IconButton>
    </Tooltip>
  )
}

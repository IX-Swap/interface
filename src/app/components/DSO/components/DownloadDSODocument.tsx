import { Launch } from '@mui/icons-material'
import { IconButton, Tooltip } from '@mui/material'
import {
  useDownloadRawFile,
  useOldDownloadRawFile
} from 'hooks/useDownloadRawFile'
import {
  convertBlobToFile,
  downloadByAnchor,
  downloadByFile
} from 'hooks/utils'
import React from 'react'

export interface DownloadDSODocumentProps {
  dsoId: string
  documentId: string
  type?: 'document' | 'subscriptionDocument'
  name?: string
}

export const DownloadDSODocument = (props: DownloadDSODocumentProps) => {
  const { dsoId, documentId, name = 'file.txt', type = 'document' } = props
  const isDocument = type === 'document'
  const uri = isDocument
    ? `/issuance/dso/dataroom/documents/raw/${dsoId}/${documentId}`
    : `/issuance/dso/dataroom/subscription/raw/${dsoId}`
  const [download, { isLoading }] = useOldDownloadRawFile(uri, {
    onSuccess: ({ data }) => {
      const file = convertBlobToFile(data, '')
      downloadByFile(file, name)
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

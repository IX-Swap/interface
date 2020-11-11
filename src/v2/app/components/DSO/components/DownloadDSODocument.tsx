import React from 'react'
import { useDownloadRawFile } from 'v2/hooks/useDownloadRawFile'
import { Button } from '@material-ui/core'
import { convertBlobToFile, openFileInNewTab } from 'v2/hooks/utils'

export interface DownloadDSODocumentProps {
  dsoId: string
  documentId: string
}

export const DownloadDSODocument = (props: DownloadDSODocumentProps) => {
  const { dsoId, documentId } = props
  const uri = `/issuance/dso/dataroom/documents/raw/${dsoId}/${documentId}`
  const [download, { isLoading }] = useDownloadRawFile(uri, {
    onSuccess: ({ data }) => {
      const file = convertBlobToFile(data, '')
      openFileInNewTab(file)
    }
  })
  const handleDownload = async () => await download()

  return (
    <Button size='small' variant='outlined' onClick={handleDownload}>
      {isLoading ? 'Downloading...' : 'Download'}
    </Button>
  )
}

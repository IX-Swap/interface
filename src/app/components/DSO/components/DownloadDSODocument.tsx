import React from 'react'
import { useDownloadRawFile } from 'hooks/useDownloadRawFile'
import { IconButton, Tooltip } from '@material-ui/core'
import { convertBlobToFile, openFileInNewTab } from 'hooks/utils'
import { CloudDownload } from '@material-ui/icons'

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
    <Tooltip title='Download File'>
      <IconButton disabled={isLoading} onClick={handleDownload}>
        <CloudDownload />
      </IconButton>
    </Tooltip>
  )
}

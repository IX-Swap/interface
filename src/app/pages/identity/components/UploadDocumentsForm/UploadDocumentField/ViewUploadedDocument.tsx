import { IconButton } from '@material-ui/core'
import { Launch } from '@material-ui/icons'
import { documentsURL } from 'config/apiURL'
import { getIdFromObj } from 'helpers/strings'
import { useAuth } from 'hooks/auth/useAuth'
import { useDownloadRawDocument } from 'hooks/useDownloadRawDocument'
import { convertBlobToFile, openFileInNewTab } from 'hooks/utils'
import React from 'react'

export interface ViewUploadedDocumentProps {
  documentId: string
}

export const ViewUploadedDocument = ({
  documentId
}: ViewUploadedDocumentProps) => {
  const { user } = useAuth()
  const [downloadDocument, { isLoading }] = useDownloadRawDocument(
    { documentId, uri: documentsURL.getById(getIdFromObj(user), documentId) },
    {
      onSuccess: ({ data }) => {
        const file = convertBlobToFile(data, '')
        openFileInNewTab(file)
      }
    }
  )
  const handleClick = async () => await downloadDocument()

  return (
    <IconButton onClick={handleClick} disabled={isLoading}>
      <Launch color='disabled' style={{ width: 23, height: 23 }} />
    </IconButton>
  )
}

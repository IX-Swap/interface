import { IconButton } from '@mui/material'
import { documentsURL } from 'config/apiURL'
import { getIdFromObj } from 'helpers/strings'
import { useAuth } from 'hooks/auth/useAuth'
import { useDownloadRawDocument } from 'hooks/useDownloadRawDocument'
import { convertBlobToFile, downloadByFile } from 'hooks/utils'
import React from 'react'
import { Icon } from 'ui/Icons/Icon'

export interface DownloadProps {
  documentId: string
  name?: string
}

export const Download = ({ documentId, name = 'file.txt' }: DownloadProps) => {
  const { user } = useAuth()

  const [downloadDocument, { isLoading }] = useDownloadRawDocument(
    { documentId, uri: documentsURL.getById(getIdFromObj(user), documentId) },
    {
      onSuccess: ({ data }) => {
        const file = convertBlobToFile(data, '')
        downloadByFile(file, name)
      }
    }
  )

  const handleClick = async () => await downloadDocument()

  return (
    <IconButton onClick={handleClick} disabled={isLoading} size='large'>
      <Icon name='eye' />
    </IconButton>
  )
}

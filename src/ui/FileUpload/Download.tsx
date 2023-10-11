import { IconButton } from '@mui/material'
import { documentsURL } from 'config/apiURL'
import { getIdFromObj } from 'helpers/strings'
import { useAuth } from 'hooks/auth/useAuth'
import { useDownloadRawDocument } from 'hooks/useDownloadRawDocument'
import { convertBlobToFile, downloadByFile } from 'hooks/utils'
import React, { FunctionComponent, createElement } from 'react'
import { Icon } from 'ui/Icons/Icon'

export interface DownloadProps {
  documentId: string
  name?: string
  component: FunctionComponent
}

export const Download = ({
  documentId,
  name = 'file.txt',
  component
}: DownloadProps) => {
  const { user } = useAuth()
  const isAuthorizer = user?.roles.includes('authorizer') ?? false

  const [downloadDocument, { isLoading }] = useDownloadRawDocument(
    {
      documentId,
      uri: isAuthorizer
        ? documentsURL.getBySuperUser(documentId)
        : documentsURL.getById(getIdFromObj(user), documentId)
    },
    {
      onSuccess: ({ data }) => {
        const file = convertBlobToFile(data, '')
        downloadByFile(file, name)
      }
    }
  )

  const handleClick = async () => await downloadDocument()

  if (typeof component !== 'undefined') {
    return createElement(component, {
      onClick: handleClick,
      disabled: isLoading
    })
  }

  return (
    <IconButton onClick={handleClick} disabled={isLoading} size='large'>
      <Icon name='eye' />
    </IconButton>
  )
}

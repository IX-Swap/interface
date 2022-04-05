import React from 'react'
import { useDownloadRawFile } from 'hooks/useDownloadRawFile'
import { IconButton } from '@mui/material'
import { convertBlobToFile, openFileInNewTab } from 'hooks/utils'
import { Icon } from 'ui/Icons/Icon'

export interface DownloadProps {
  uri: string
}

export const Download = ({ uri }: DownloadProps) => {
  const [download, { isLoading }] = useDownloadRawFile(uri, {
    onSuccess: ({ data }) => {
      const file = convertBlobToFile(data, '')
      openFileInNewTab(file)
    }
  })

  const handleDownload = async () => await download()
  return (
    <IconButton disabled={isLoading} onClick={handleDownload} size='large'>
      <Icon name='eye' />
    </IconButton>
  )
}

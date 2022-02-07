import React from 'react'
import { useDownloadRawFile } from 'hooks/useDownloadRawFile'
import { Button, ButtonProps } from '@mui/material'
import { convertBlobToFile, openFileInNewTab } from 'hooks/utils'

export interface DownloadDSOSubscriptionDocumentProps extends ButtonProps {
  dsoId: string
}

export const DownloadDSOSubscriptionDocument = (
  props: DownloadDSOSubscriptionDocumentProps
) => {
  const { dsoId, children = 'Download', ...rest } = props
  const uri = `/issuance/dso/dataroom/subscription/raw/${dsoId}`
  const [download, { isLoading }] = useDownloadRawFile(uri, {
    onSuccess: ({ data }) => {
      const file = convertBlobToFile(data, '')
      openFileInNewTab(file)
    }
  })
  const handleDownload = async () => await download()

  return (
    <Button {...rest} onClick={handleDownload} disabled={isLoading}>
      {children}
    </Button>
  )
}

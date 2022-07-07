import { Button, ButtonProps } from '@mui/material'
import { useDownloadRawFile } from 'hooks/useDownloadRawFile'
import { downloadByAnchor } from 'hooks/utils'
import React from 'react'

export interface DownloadDSOSubscriptionDocumentProps extends ButtonProps {
  dsoId: string
  name?: string
}

export const DownloadDSOSubscriptionDocument = (
  props: DownloadDSOSubscriptionDocumentProps
) => {
  const { dsoId, name, children = 'Download', ...rest } = props
  const uri = `/issuance/dso/dataroom/subscription/raw/${dsoId}`
  const [download, { isLoading }] = useDownloadRawFile(uri, {
    onSuccess: data => {
      downloadByAnchor(data, dsoId)
    }
  })
  const handleDownload = async () => await download()

  return (
    <Button {...rest} onClick={handleDownload} disabled={isLoading}>
      {children}
    </Button>
  )
}

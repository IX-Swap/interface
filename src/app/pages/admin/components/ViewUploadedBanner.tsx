import { IconButton } from '@mui/material'
import { Launch } from '@mui/icons-material'
import { convertBlobToFile, openFileInNewTab } from 'hooks/utils'
import React from 'react'
import { useDownloadRawBanner } from 'app/pages/admin/hooks/useDownloadRawBanner'

export interface ViewUploadedBannerProps {
  bannerId: string
}

export const ViewUploadedBanner = ({ bannerId }: ViewUploadedBannerProps) => {
  const [downloadBanner, { isLoading }] = useDownloadRawBanner(
    { bannerId },
    {
      onSuccess: ({ data }) => {
        const file = convertBlobToFile(data, '')
        openFileInNewTab(file)
      }
    }
  )

  const handleClick = async () => await downloadBanner()

  return (
    <IconButton onClick={handleClick} disabled={isLoading} size='large'>
      <Launch color='disabled' style={{ width: 23, height: 23 }} />
    </IconButton>
  )
}

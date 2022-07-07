import { Launch } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { useDownloadRawBanner } from 'app/pages/admin/hooks/useDownloadRawBanner'
import { convertBlobToFile, downloadByFile } from 'hooks/utils'
import React from 'react'

export interface ViewUploadedBannerProps {
  bannerId: string
  name?: string
}

export const ViewUploadedBanner = ({
  bannerId,
  name = 'file.txt'
}: ViewUploadedBannerProps) => {
  const [downloadBanner, { isLoading }] = useDownloadRawBanner(
    { bannerId },
    {
      onSuccess: ({ data }) => {
        const file = convertBlobToFile(data, name)
        downloadByFile(file, name)
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

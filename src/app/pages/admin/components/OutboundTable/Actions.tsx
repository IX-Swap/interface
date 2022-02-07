import { Box, IconButton } from '@mui/material'
import { Launch } from '@mui/icons-material'
import { openFileInNewTab } from 'hooks/utils'
import React from 'react'
import { VAAuditOutboundItem } from 'types/virtualAccount'
import { useDownloadRawOutboundACKFile } from 'app/pages/admin/hooks/useDownloadRawOutboundACKFile'
import { useDownloadRawOutboundVAFile } from 'app/pages/admin/hooks/useDownloadRawOutboundVAFile'

export interface ActionsProps {
  item: VAAuditOutboundItem
  forVAFile?: boolean
}

export const Actions = ({ item, forVAFile = false }: ActionsProps) => {
  const apiHook = forVAFile
    ? useDownloadRawOutboundVAFile
    : useDownloadRawOutboundACKFile

  const [downloadFile, { isLoading }] = apiHook(
    { documentId: item._id },
    {
      onSuccess: ({ data }) => {
        const file = new Blob([data], { type: 'text' })
        openFileInNewTab(file as File)
      }
    }
  )

  const handleClick = async () => await downloadFile()

  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      justifyContent={forVAFile ? 'center' : 'flex-end'}
    >
      <Box>{forVAFile ? item.vaFileName : item.ackFileName}</Box>
      <IconButton
        onClick={handleClick}
        disabled={isLoading}
        data-testid='button'
        size='large'
      >
        <Launch color='disabled' style={{ width: 23, height: 23 }} />
      </IconButton>
    </Box>
  )
}

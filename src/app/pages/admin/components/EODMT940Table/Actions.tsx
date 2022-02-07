import { IconButton } from '@mui/material'
import { Launch } from '@mui/icons-material'
import { openFileInNewTab } from 'hooks/utils'
import React from 'react'
import { useDownloadRawMT940File } from 'app/pages/admin/hooks/useDownloadRawMT940File'
import { VirtualAccountAuditItem } from 'types/virtualAccount'

export interface ActionsProps {
  item: VirtualAccountAuditItem
}

export const Actions = ({ item }: ActionsProps) => {
  const [downloadFile, { isLoading }] = useDownloadRawMT940File(
    { documentId: item._id },
    {
      onSuccess: async ({ data }) => {
        const file = new Blob([data], { type: 'text' })
        openFileInNewTab(file as File)
      }
    }
  )

  const handleClick = async () => await downloadFile()

  return (
    <IconButton
      onClick={handleClick}
      disabled={isLoading}
      data-testid='button'
      size='large'
    >
      <Launch color='disabled' style={{ width: 23, height: 23 }} />
    </IconButton>
  )
}

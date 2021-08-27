import { IconButton } from '@material-ui/core'
import { Launch } from '@material-ui/icons'
import { openFileInNewTab } from 'hooks/utils'
import React from 'react'
import { VAAuditOutboundItem } from 'types/virtualAccount'
import { useDownloadRawOutboundFile } from 'app/pages/admin/hooks/useDownloadRawOutboundFile'

export interface ActionsProps {
  item: VAAuditOutboundItem
}

export const Actions = ({ item }: ActionsProps) => {
  const [downloadFile, { isLoading }] = useDownloadRawOutboundFile(
    { documentId: item._id },
    {
      onSuccess: ({ data }) => {
        const file = new Blob([data], { type: 'text' })
        openFileInNewTab(file)
      }
    }
  )

  const handleClick = async () => await downloadFile()

  return (
    <IconButton onClick={handleClick} disabled={isLoading} data-testid='button'>
      <Launch color='disabled' style={{ width: 23, height: 23 }} />
    </IconButton>
  )
}

import { IconButton } from '@material-ui/core'
import { Launch } from '@material-ui/icons'
import { convertBlobToFile, openFileInNewTab } from 'hooks/utils'
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
      onSuccess: ({ data }) => {
        const file = convertBlobToFile(data, '')
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

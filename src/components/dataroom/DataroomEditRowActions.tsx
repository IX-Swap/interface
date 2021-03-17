import React from 'react'
import { IconButton, Tooltip } from '@material-ui/core'
import { DeleteOutline, Launch } from '@material-ui/icons'

export interface DataroomEditRowActionsProps {
  onDownload: () => any
  onDelete: () => any
  isDownloading: boolean
  isDeleting: boolean
}

export const DataroomEditRowActions = (props: DataroomEditRowActionsProps) => {
  const { onDelete, onDownload, isDownloading, isDeleting } = props

  return (
    <>
      <Tooltip title='Download File'>
        <IconButton onClick={onDownload} disabled={isDownloading}>
          <Launch color='disabled' style={{ width: 23, height: 23 }} />
        </IconButton>
      </Tooltip>
      <Tooltip title='Delete File'>
        <IconButton onClick={onDelete} disabled={isDeleting}>
          <DeleteOutline color='disabled' style={{ width: 24, height: 24 }} />
        </IconButton>
      </Tooltip>
    </>
  )
}

import React from 'react'
import { IconButton, Tooltip } from '@mui/material'
import { DeleteOutline, Launch } from '@mui/icons-material'

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
        <IconButton onClick={onDownload} disabled={isDownloading} size='large'>
          <Launch color='disabled' style={{ width: 23, height: 23 }} />
        </IconButton>
      </Tooltip>
      <Tooltip title='Delete File'>
        <IconButton onClick={onDelete} disabled={isDeleting} size='large'>
          <DeleteOutline color='disabled' style={{ width: 24, height: 24 }} />
        </IconButton>
      </Tooltip>
    </>
  )
}

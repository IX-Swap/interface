import React from 'react'
import { IconButton, Tooltip } from '@material-ui/core'
import { CloudDownload, Delete } from '@material-ui/icons'

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
          <CloudDownload />
        </IconButton>
      </Tooltip>
      <Tooltip title='Delete File'>
        <IconButton onClick={onDelete} disabled={isDeleting}>
          <Delete />
        </IconButton>
      </Tooltip>
    </>
  )
}

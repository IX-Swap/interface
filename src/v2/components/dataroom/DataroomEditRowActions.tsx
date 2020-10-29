import React from 'react'
import { Button, ButtonGroup } from '@material-ui/core'

export interface DataroomEditRowActionsProps {
  onDownload: () => any
  onDelete: () => any
  isDownloading: boolean
  isDeleting: boolean
}

export const DataroomEditRowActions = (props: DataroomEditRowActionsProps) => {
  const { onDelete, onDownload, isDownloading, isDeleting } = props

  return (
    <ButtonGroup size='small' variant='outlined'>
      <Button onClick={onDownload} disabled={isDownloading}>
        {isDownloading ? 'Downloading...' : 'Download'}
      </Button>
      <Button onClick={onDelete} disabled={isDeleting}>
        {isDeleting ? 'Deleting...' : 'Delete'}
      </Button>
    </ButtonGroup>
  )
}

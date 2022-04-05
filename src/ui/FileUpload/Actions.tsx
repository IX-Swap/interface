import { Box, IconButton } from '@mui/material'
import React from 'react'
import { DataroomFile } from 'types/dataroomFile'
import { Icon } from 'ui/Icons/Icon'
import { useFormContext } from 'react-hook-form'
import { ViewDocument } from 'app/components/DSO/components/ViewDocument'
import { Download } from 'ui/FileUpload/Download'

export interface ActionsProps {
  name: string
  document: DataroomFile
  readonly?: boolean
  setCompleted: (completed: number) => void
  multiple?: boolean
  remove?: () => void
}

export const Actions = ({
  name,
  document,
  readonly = false,
  remove,
  setCompleted
}: ActionsProps) => {
  const { setValue } = useFormContext()
  const handleDelete = () => {
    if (remove !== undefined) {
      remove()
      return
    }

    setValue(name, undefined)
    setCompleted(0)
  }

  return (
    <Box>
      {!readonly && (
        <IconButton onClick={handleDelete} size='large'>
          <Icon name='trash' />
        </IconButton>
      )}

      <ViewDocument documentId={document._id}>
        {file => <Download uri={file} />}
      </ViewDocument>
    </Box>
  )
}

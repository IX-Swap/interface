import { Box } from '@mui/material'
import React from 'react'
import { DataroomFile } from 'types/dataroomFile'
import { Download } from 'ui/FileUpload/Download'
import { RemoveButton } from 'ui/FileUpload/RemoveButton'

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
  return (
    <Box display={'flex'} ml={1}>
      {!readonly && (
        <RemoveButton name={name} setCompleted={setCompleted} remove={remove} />
      )}

      <Download documentId={document._id} />
    </Box>
  )
}

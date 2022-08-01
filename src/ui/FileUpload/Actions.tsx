import { Box } from '@mui/material'
import React from 'react'
import { DataroomFile } from 'types/dataroomFile'
import { RemoveButton } from 'ui/FileUpload/RemoveButton'

export interface ActionsProps {
  name: string
  document: DataroomFile
  readonly?: boolean
  originalName?: string
  setCompleted: (completed: number) => void
  multiple?: boolean
  remove?: () => void
}

export const Actions = ({
  name,
  document,
  readonly = false,
  remove,
  setCompleted,
  originalName
}: ActionsProps) => {
  return (
    <Box display={'flex'} ml={1}>
      {!readonly && (
        <RemoveButton name={name} setCompleted={setCompleted} remove={remove} />
      )}
    </Box>
  )
}

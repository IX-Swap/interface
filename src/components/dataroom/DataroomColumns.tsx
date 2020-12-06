import React from 'react'
import { TableCell, Typography } from '@material-ui/core'
import { formatDateAndTime } from 'helpers/dates'
import { DataroomFile } from 'types/dataroomFile'
import { Maybe } from 'types/util'

export interface DataroomColumnsProps {
  title: string
  document: Maybe<DataroomFile>
}

export const DataroomColumns: React.FC<DataroomColumnsProps> = props => {
  const { title, document } = props

  if (document?._id === undefined || document?._id === '') {
    return (
      <TableCell colSpan={3}>
        <Typography>{title}</Typography>
      </TableCell>
    )
  }

  return (
    <>
      <TableCell>
        <Typography>{document.originalFileName}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{document.title === '' ? '–' : document.title}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{formatDateAndTime(document.createdAt, true)}</Typography>
      </TableCell>
    </>
  )
}

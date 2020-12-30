import React from 'react'
import {
  TableCell,
  TableHead,
  TableHeadProps,
  TableRow
} from '@material-ui/core'

export interface DataroomHeaderProps extends TableHeadProps {
  hasSelected?: boolean
}

export const DataroomHeader = (props: DataroomHeaderProps) => {
  const { hasSelected = false, ...rest } = props

  return (
    <TableHead {...rest}>
      <TableRow>
        {hasSelected && <TableCell width={50} />}
        <TableCell>File Name</TableCell>
        <TableCell>Type</TableCell>
        <TableCell>Uploaded At</TableCell>
        <TableCell> </TableCell>
      </TableRow>
    </TableHead>
  )
}

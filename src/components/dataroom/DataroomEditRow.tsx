import React from 'react'
import { TableCell } from '@material-ui/core'
import { DataroomColumns } from 'components/dataroom/DataroomColumns'
import { Maybe } from 'types/util'
import { DataroomFile } from 'types/dataroomFile'

export interface DataroomEditRowProps {
  title: string
  document: Maybe<DataroomFile>
  actions: Maybe<JSX.Element>
}

export const DataroomEditRow = (props: DataroomEditRowProps) => {
  const { title, document, actions } = props

  return (
    <>
      <DataroomColumns title={title} document={document} />
      {actions !== null && (
        <TableCell align='right' onClick={e => e.stopPropagation()}>
          {actions}
        </TableCell>
      )}
    </>
  )
}

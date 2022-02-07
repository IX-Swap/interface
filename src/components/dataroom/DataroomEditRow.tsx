import React, { Fragment } from 'react'
import { Box } from '@mui/material'
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
    <Fragment>
      <DataroomColumns title={title} document={document} />
      {actions !== null && (
        <Box
          display='flex'
          flex='1 1 20%'
          flexWrap='nowrap'
          justifyContent='flex-end'
          onClick={e => e.stopPropagation()}
        >
          {actions}
        </Box>
      )}
    </Fragment>
  )
}

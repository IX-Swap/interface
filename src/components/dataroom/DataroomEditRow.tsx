import React from 'react'
import { Grid } from '@material-ui/core'
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
    <Grid container alignItems='center'>
      <DataroomColumns title={title} document={document} />
      {actions !== null && (
        <Grid
          container
          item
          xs={2}
          justify='flex-end'
          onClick={e => e.stopPropagation()}
        >
          {actions}
        </Grid>
      )}
    </Grid>
  )
}

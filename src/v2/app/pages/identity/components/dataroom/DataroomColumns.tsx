import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { formatDateToMMDDYY } from 'v2/helpers/dates'
import { DataroomFile } from 'v2/types/dataroomFile'
import { Maybe } from 'v2/types/util'

export interface DataroomColumnsProps {
  title: string
  document: Maybe<DataroomFile>
}

export const DataroomColumns: React.FC<DataroomColumnsProps> = props => {
  const { title, document } = props

  if (document === null || document === undefined) {
    return (
      <Grid container item xs={10}>
        <Typography>{title}</Typography>
      </Grid>
    )
  }

  return (
    <>
      <Grid container item xs={4} alignItems='center'>
        <Typography>{document.originalFileName}</Typography>
      </Grid>
      <Grid container item xs={3} alignItems='center' justify='center'>
        <Typography>{document.type === '' ? '–' : document.type}</Typography>
      </Grid>
      <Grid container item xs={3} alignItems='center' justify='center'>
        <Typography>{formatDateToMMDDYY(document.createdAt)}</Typography>
      </Grid>
    </>
  )
}

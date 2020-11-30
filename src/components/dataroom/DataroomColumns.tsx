import React from 'react'
import { Grid, Typography } from '@material-ui/core'
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
      <Grid container item xs={3} alignItems='center' justify='flex-start'>
        <Typography>{document.title === '' ? '–' : document.title}</Typography>
      </Grid>
      <Grid container item xs={3} alignItems='center' justify='center'>
        <Typography>{formatDateAndTime(document.createdAt, true)}</Typography>
      </Grid>
    </>
  )
}

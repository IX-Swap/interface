import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { formatDateToMMDDYY } from 'v2/helpers/dates'
import { Document } from 'v2/types/document'
import { Maybe } from 'v2/types/util'

export interface DataroomColumnsProps {
  title: string
  document: Maybe<Document>
}

export const DataroomColumns: React.FC<DataroomColumnsProps> = props => {
  const { title, document } = props

  if (document === null) {
    return (
      <Grid container item xs={11}>
        <Typography>{title}</Typography>
      </Grid>
    )
  }

  return (
    <>
      <Grid container item xs={3} alignItems='center'>
        <Typography>{document.originalFileName}</Typography>
      </Grid>
      <Grid container item xs={2} alignItems='center' justify='center'>
        <Typography>{formatDateToMMDDYY(document.createdAt)}</Typography>
      </Grid>
      <Grid container item xs={3} alignItems='center' justify='center'>
        <Typography>{document.title}</Typography>
      </Grid>
      <Grid container item xs={3} alignItems='center' justify='center'>
        <Typography>{document.type}</Typography>
      </Grid>
    </>
  )
}

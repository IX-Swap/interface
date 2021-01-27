import React, { Fragment } from 'react'
import { Box, Typography } from '@material-ui/core'
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
      <Box flex='1 1 auto'>
        <Typography variant='subtitle1'>{title}</Typography>
      </Box>
    )
  }

  return (
    <Fragment>
      <Box flex='1 0 40%'>
        <Typography>{document.originalFileName}</Typography>
      </Box>
      <Box flex='1 0 20%'>
        <Typography>{document.type === '' ? '–' : document.type}</Typography>
      </Box>
      <Box flex='1 0 20%'>
        <Typography>{formatDateAndTime(document.createdAt, true)}</Typography>
      </Box>
    </Fragment>
  )
}

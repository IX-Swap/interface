import React from 'react'
import { Paper, Grid, Typography, IconButton } from '@mui/material'
import { DataroomFile } from 'types/dataroomFile'
import { formatDateAndTime } from 'helpers/dates'
import { useFormContext } from 'react-hook-form'
import { Icon } from 'ui/Icons/Icon'
import { useStyles } from './Document.styles'

export interface DocumentProps {
  document: DataroomFile
  name: string
}

export const Document = ({ document, name }: DocumentProps) => {
  const { control } = useFormContext()
  const { root } = useStyles()

  const removeDocument = () => {
    const values: DataroomFile[] = control.getValues(name)
    control.setValue(
      name,
      values.filter(value => value._id !== document._id)
    )
  }

  if (document === undefined || document._id === undefined) {
    return null
  }

  return (
    <Paper elevation={0} variant='outlined' className={root}>
      <Grid container alignItems='center' justifyContent='space-between'>
        <Grid item xs={8} container spacing={1} alignItems='center'>
          <Grid item sx={{ display: 'flex' }}>
            <Icon name='file' />
          </Grid>
          <Grid item>
            <Typography>{document.originalFileName}</Typography>
          </Grid>
        </Grid>
        <Grid
          item
          xs={4}
          container
          alignItems='center'
          justifyContent='flex-end'
          spacing={4}
        >
          <Grid item>
            <Typography>
              {document.createdAt !== undefined
                ? formatDateAndTime(document.createdAt)
                : null}
            </Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={removeDocument} size='large'>
              <Icon name='trash' />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}

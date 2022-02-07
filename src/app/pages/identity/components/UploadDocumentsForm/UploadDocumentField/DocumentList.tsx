import React from 'react'
import { Divider, Grid, Typography } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { DocumentTable } from 'app/pages/identity/components/UploadDocumentsForm/UploadDocumentField/DocumentTable'
import { pathToString } from 'helpers/forms'

export interface DocumentListProps {
  name: any
  title?: string
}

export const DocumentList = ({ title, name }: DocumentListProps) => {
  const { watch } = useFormContext()
  const stringName = pathToString(name)
  const documents = watch(stringName)

  if (documents === undefined || documents.length < 1) {
    return null
  }

  return (
    <Grid item>
      <Grid container direction='column' spacing={3}>
        {title !== undefined ? (
          <Grid item>
            <Typography variant='subtitle1'>{title}</Typography>
            <Divider />
          </Grid>
        ) : null}
        <Grid item>
          <DocumentTable name={stringName} documents={documents} />
        </Grid>
      </Grid>
    </Grid>
  )
}

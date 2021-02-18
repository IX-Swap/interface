import React from 'react'
import { Divider, Grid, Typography } from '@material-ui/core'
import { useFormContext } from 'react-hook-form'
import { DocumentTable } from 'app/pages/identity/components/UploadDocumentsForm/UploadDocumentField/DocumentTable'

export interface DocumentListProps {
  name: any
  title?: string
}

export const DocumentList = ({ title, name }: DocumentListProps) => {
  const { watch } = useFormContext()
  const documents = watch(name)

  if (documents === undefined || documents.length < 1) {
    return null
  }

  return (
    <Grid item>
      <Grid container direction='column' spacing={3}>
        <Grid item>
          <Typography variant='subtitle1'>
            {title !== undefined ? title : 'Documents'}
          </Typography>
          <Divider />
        </Grid>
        <Grid item>
          <DocumentTable name={name} documents={documents} />
        </Grid>
      </Grid>
    </Grid>
  )
}

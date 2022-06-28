import React from 'react'
import { Grid } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { pathToString } from 'helpers/forms'
import { Document } from 'app/pages/identity/components/UploadDocumentsForm/UploadDocumentField/Document'
import { DataroomFile } from 'types/dataroomFile'

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
    <Grid item xs={12}>
      {documents.map((document: DataroomFile) => (
        <Document name={stringName} document={document} />
      ))}
    </Grid>
  )
}

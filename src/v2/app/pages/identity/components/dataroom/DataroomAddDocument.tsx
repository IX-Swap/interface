import React from 'react'
import { DocumentWithGuide, Document } from 'v2/types/document'
import { DocumentUploader } from 'v2/components/form/DocumentUploader'
import { Maybe } from 'v2/types/util'
import { Button, Grid } from '@material-ui/core'

export interface DataroomAddDocumentProps {
  append: (document: DocumentWithGuide) => void
}

export const DataroomAddDocument: React.FC<DataroomAddDocumentProps> = props => {
  const { append } = props
  const handleChange = (document: Maybe<Document>) => {
    if (document !== null && document !== undefined) {
      append({ title: 'TITLE', label: 'LABEL', type: 'TYPE', document })
    }
  }

  return (
    <Grid container item justify='flex-end'>
      <DocumentUploader
        title='TITLE'
        name='NAME'
        onChange={handleChange}
        uploadComponent={
          <Button variant='contained' color='primary' component='span'>
            Upload Document
          </Button>
        }
      />
    </Grid>
  )
}

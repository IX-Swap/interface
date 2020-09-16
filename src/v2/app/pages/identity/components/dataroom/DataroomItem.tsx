import React from 'react'
import useStyles from 'v2/app/pages/identity/components/dataroom/styles'
import { useTypedForm } from 'v2/components/form/useTypedForm'
import { DocumentWithGuide } from 'v2/types/document'
import { Button, Typography, Grid, ListItem } from '@material-ui/core'
import { DataroomColumns } from 'v2/app/pages/identity/components/dataroom/DataroomColumns'
import { DownloadDocument } from 'v2/app/pages/identity/components/dataroom/DownloadDocument'

export interface DataroomItemProps {
  title: string
  isEditing: boolean
  index: number
}

export const DataroomItem: React.FC<DataroomItemProps> = props => {
  const { index, title, isEditing } = props
  const classes = useStyles()
  const { EditableField, FormValue } = useTypedForm<{
    documents: DocumentWithGuide[]
  }>()
  const documentPath = ['documents', index, 'document'] as const

  return (
    <EditableField
      isEditing={isEditing}
      fieldType='DocumentUploader'
      title={title}
      label='Upload'
      name={documentPath as any}
      uploadComponent={<Button component='span'>Upload</Button>}
      deleteComponent={<Button component='span'>Delete</Button>}
      viewRenderer={
        <FormValue name={documentPath}>
          {value => (
            <ListItem className={classes.listItem}>
              <Grid container>
                <DataroomColumns title={title} document={value} />
                <Grid container item xs={1} justify='flex-end'>
                  {value === null ? (
                    <Typography>No file uploaded</Typography>
                  ) : (
                    <DownloadDocument document={value} />
                  )}
                </Grid>
              </Grid>
            </ListItem>
          )}
        </FormValue>
      }
      editRenderer={input => (
        <FormValue name={documentPath}>
          {value => (
            <ListItem className={classes.listItem}>
              <Grid container>
                <DataroomColumns title={title} document={value} />
                <Grid container item xs={1} justify='flex-end'>
                  {input}
                </Grid>
              </Grid>
            </ListItem>
          )}
        </FormValue>
      )}
    />
  )
}

import React from 'react'
import { ListItem, Grid } from '@material-ui/core'
import useStyles from './styles'
import { DataroomColumns } from './DataroomColumns'
import { DownloadDocument } from './DownloadDocument'
import { Document } from 'v2/types/document'
import { Maybe } from 'v2/types/util'

export interface DataroomRowProps {
  title: string
  document: Maybe<Document>
}

export const DataroomViewRow = (props: DataroomRowProps) => {
  const { document, title } = props
  const classes = useStyles()

  if (document === null) {
    return null
  }

  return (
    <ListItem className={classes.listItem}>
      <Grid container>
        <DataroomColumns title={title} document={document} />
        <Grid container item xs={2} justify='space-evenly'>
          <DownloadDocument
            documentId={document?._id}
            ownerId={document?.user}
          />
        </Grid>
      </Grid>
    </ListItem>
  )
}

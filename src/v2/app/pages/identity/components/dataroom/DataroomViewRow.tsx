import React from 'react'
import { ListItem, Grid } from '@material-ui/core'
import useStyles from './styles'
import { DataroomColumns } from './DataroomColumns'
import { DownloadDocument } from './DownloadDocument'
import { DataroomFile } from 'v2/types/dataroomFile'
import { Maybe } from 'v2/types/util'

export interface DataroomViewRowProps {
  title: string
  document: Maybe<DataroomFile>
}

export const DataroomViewRow = (props: DataroomViewRowProps) => {
  const { document, title } = props
  const classes = useStyles()

  if (document === null) {
    return null
  }

  return (
    <ListItem className={classes.listItem}>
      <Grid container>
        <DataroomColumns title={title} document={document} />
        <Grid container item xs={1} justify='space-evenly'>
          <DownloadDocument
            documentId={document?._id}
            ownerId={document?.user}
          />
        </Grid>
      </Grid>
    </ListItem>
  )
}

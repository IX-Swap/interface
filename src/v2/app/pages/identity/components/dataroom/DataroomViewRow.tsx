import React from 'react'
import { ListItem, Grid } from '@material-ui/core'
import useStyles from './styles'
import { DataroomColumns } from './DataroomColumns'
import { DownloadDocument } from './DownloadDocument'
import { DataroomFile } from 'v2/types/dataroomFile'
import { Maybe } from 'v2/types/util'
import classNames from 'classnames'

export interface DataroomViewRowProps {
  title: string
  document: Maybe<DataroomFile>
  disableBorder?: boolean
}

export const DataroomViewRow = (props: DataroomViewRowProps) => {
  const { document, title, disableBorder = false } = props
  const classes = useStyles()

  if (document === null) {
    return null
  }

  return (
    <ListItem className={classNames({ [classes.listItem]: !disableBorder })}>
      <Grid container>
        <DataroomColumns title={title} document={document} />
        <Grid container item xs={1} justify='flex-end'>
          <DownloadDocument
            documentId={document?._id}
            ownerId={document?.user}
          />
        </Grid>
      </Grid>
    </ListItem>
  )
}

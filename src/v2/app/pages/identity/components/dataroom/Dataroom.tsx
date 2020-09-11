import React from 'react'
import { Typography, List, ListSubheader, Grid } from '@material-ui/core'
import { findIndex } from 'lodash'
import { DataroomItem } from 'v2/app/pages/identity/components/dataroom/DataroomItem'
import { DataroomUploader } from 'v2/app/pages/identity/components/dataroom/DataroomUploader'
import useStyles from 'v2/app/pages/identity/components/dataroom/styles'
import { DocumentGuide, Document } from 'v2/types/document'

interface DataRoomProps {
  documentsList: DocumentGuide[]
  dataroom: Document[]
  editMode: boolean
}

export const Dataroom = (props: DataRoomProps): JSX.Element => {
  const { documentsList, dataroom, editMode = false } = props
  const classes = useStyles()

  return (
    <List style={{ width: '100%' }}>
      <ListSubheader>
        <Grid container>
          <Grid container item xs={3}>
            <Typography className={classes.listItemHeader}>
              File Name
            </Typography>
          </Grid>
          <Grid container item xs={2} justify='center'>
            <Typography className={classes.listItemHeader}>Date</Typography>
          </Grid>
          <Grid container item xs={3} justify='center'>
            <Typography className={classes.listItemHeader}>Title</Typography>
          </Grid>
          <Grid container item xs={3} justify='center'>
            <Typography className={classes.listItemHeader}>Type</Typography>
          </Grid>
          <Grid container item xs={1}>
            &nbsp;
          </Grid>
        </Grid>
      </ListSubheader>
      {documentsList.map(document => {
        const idx = findIndex(dataroom, file => file.title === document.title)
        if (idx < 0) {
          return (
            <DataroomUploader
              key={document.title}
              document={document}
              editMode={editMode}
            />
          )
        }

        return (
          <DataroomItem
            key={document.title}
            document={dataroom[idx]}
            editMode={editMode}
          />
        )
      })}
    </List>
  )
}

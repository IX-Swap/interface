// @flow
import React from 'react'
import { Typography, List, ListSubheader, Grid } from '@material-ui/core'
import { findIndex } from 'lodash'
import DocumentItem from './item'
import useStyles from './styles'
import { DocumentGuide, Document } from '../../../../../../types/identity'
import Uploader from './uploader'

const DataRoom = ({
  documentsList,
  dataroom,
  editMode = false
}: {
  documentsList: DocumentGuide[]
  dataroom: Document[]
  editMode: boolean
}) => {
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
      {documentsList.map((document) => {
        const idx = findIndex(
          dataroom,
          (file) => file.title === document.title
        )
        if (idx < 0) {
          return <Uploader key={document.title} document={document} editMode={false} />
        }

        return <DocumentItem key={document.title} document={dataroom[idx]} editMode={editMode} />
      })}
    </List>
  )
}

export default DataRoom

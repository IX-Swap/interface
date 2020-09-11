import React, { useState } from 'react'
import moment from 'moment'
import { Typography, ListItem, Grid, Button } from '@material-ui/core'
import CloudDownloadIcon from '@material-ui/icons/CloudDownload'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import useStyles from 'v2/app/pages/identity/components/dataroom/styles'
import { Document } from 'v2/types/document'
import { downloadFile } from 'v2/helpers/httpRequests'

interface DataroomItemProps {
  document: Document
  editMode: boolean
}

export const DataroomItem = (props: DataroomItemProps): JSX.Element => {
  const { document, editMode } = props
  const classes = useStyles()
  const [isInAction, setIsInAction] = useState(false)

  return (
    <ListItem className={classes.listItem}>
      <Grid container>
        <Grid container item xs={3}>
          <Typography>{document.originalFileName}</Typography>
        </Grid>
        <Grid container item xs={2} justify='center'>
          <Typography>
            {moment(document.createdAt).format('DD/MM/YYYY')}
          </Typography>
        </Grid>
        <Grid container item xs={3} justify='center'>
          <Typography>{document.title}</Typography>
        </Grid>
        <Grid container item xs={3} justify='center'>
          <Typography>{document.type}</Typography>
        </Grid>
        <Grid container item xs={1} justify='flex-end'>
          {editMode ? (
            <Button disabled={isInAction}>
              <DeleteOutlineIcon />
            </Button>
          ) : (
            <Button
              onClick={async () => {
                setIsInAction(true)
                await downloadFile(
                  `/dataroom/raw/${document.user}/${document._id}`
                )
                setIsInAction(false)
              }}
              disabled={isInAction}
            >
              <CloudDownloadIcon />
            </Button>
          )}
        </Grid>
      </Grid>
    </ListItem>
  )
}

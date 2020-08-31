//
import React, { useRef } from 'react'
import { Button, Typography, ListItem, Grid } from '@material-ui/core'

import { useIdentityState, useIdentityDispatch } from '../../modules'
import { uploadFile } from '../../modules/actions'
import useStyles from './styles'

const Uploader = ({ document }) => {
  const classes = useStyles()
  const inputRef = useRef()
  const dispatch = useIdentityDispatch()
  const { status, editMode } = useIdentityState()

  const handleChange = () => {
    if (inputRef.current) {
      uploadFile(dispatch, {
        file: inputRef.current?.files?.[0],
        title: document.title,
        type: document.type
      })
    }
  }

  return (
    <ListItem className={classes.listItem}>
      <Grid container>
        <Grid container item xs={8}>
          <Typography>{document.title}</Typography>
        </Grid>

        <Grid container item xs={4} justify='flex-end'>
          {editMode ? (
            <>
              <input
                ref={inputRef}
                id={`${document.title}-file`}
                multiple
                hidden
                type='file'
                onChange={handleChange}
              />
              {/* eslint-disable-next-line */}
              <label htmlFor={`${document.title}-file`}>
                <Button
                  variant='contained'
                  component='span'
                  disabled={status === 'SAVING'}
                >
                  Upload
                </Button>
              </label>
            </>
          ) : (
            <Typography>No File Uploaded</Typography>
          )}
        </Grid>
      </Grid>
    </ListItem>
  )
}

export default Uploader

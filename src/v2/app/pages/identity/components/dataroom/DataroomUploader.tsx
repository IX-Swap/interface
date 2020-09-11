import React, { useRef } from 'react'
import { Button, Typography, ListItem, Grid } from '@material-ui/core'
import useStyles from 'v2/app/pages/identity/components/dataroom/styles'
import { DocumentGuide } from 'v2/types/document'

interface DataroomUploaderProps {
  document: DocumentGuide
  editMode: boolean
}

export const DataroomUploader = (props: DataroomUploaderProps): JSX.Element => {
  const { document, editMode = false } = props
  const classes = useStyles()
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleChange = () => {
    console.log('will upload')
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
                <Button variant='contained' component='span' disabled={false}>
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

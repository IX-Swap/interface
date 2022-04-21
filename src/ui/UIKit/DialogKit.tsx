import {
  Grid,
  Button,
  DialogTitle,
  DialogActions,
  DialogContent,
  TextField
} from '@mui/material'
import React, { useState } from 'react'
import { UIDialog } from 'ui/UIDialog/UIDialog'
import { UIKitThemeWrapper } from 'ui/UIKit/UIKitThemeWrapper'
import { VSpacer } from 'components/VSpacer'

export const DialogKit = () => {
  const [open1, setOpen1] = useState(false)
  const [open2, setOpen2] = useState(false)

  return (
    <UIKitThemeWrapper>
      <Grid container spacing={1}>
        <Grid item>
          <Button variant='outlined' onClick={() => setOpen1(!open1)}>
            Example 1
          </Button>
        </Grid>

        <Grid item>
          <Button variant='outlined' onClick={() => setOpen2(!open2)}>
            Example 2
          </Button>
        </Grid>
      </Grid>

      <UIDialog onClose={() => setOpen1(false)} open={open1}>
        <DialogTitle id='alert-dialog-title'>Dialog Title</DialogTitle>
        <DialogContent>
          <Grid container justifyContent='center'>
            Content or text
            <br />
            <br />
          </Grid>
        </DialogContent>
        <VSpacer size='small' />
        <DialogActions>
          <Grid container rowSpacing={2} columnSpacing={2} direction='column'>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant='contained'
                onChange={() => console.log('test1')}
              >
                Large
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant='alternate'
                onChange={() => console.log('test2')}
              >
                Large
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </UIDialog>

      <UIDialog onClose={() => setOpen2(false)} open={open2}>
        <DialogTitle id='alert-dialog-title'>Dialog Title</DialogTitle>
        <DialogContent>
          <Grid container justifyContent='center'>
            <p>Some text about the action</p>
          </Grid>
          <Grid container direction='column'>
            <Grid item>
              <TextField
                placeholder='select label'
                fullWidth
                id='outlined-select-currency'
                select
                label='Select'
                size='small'
              />
            </Grid>
            <br />
            <Grid item>
              <TextField
                placeholder='placeholder'
                fullWidth
                id='outlined-required'
                label='Test2'
              />
            </Grid>
          </Grid>
        </DialogContent>
        <VSpacer size='small' />
        <DialogActions>
          <Grid container rowSpacing={2} columnSpacing={2} direction='column'>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant='contained'
                onChange={() => console.log('test1')}
              >
                Large
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant='alternate'
                onChange={() => console.log('test2')}
              >
                Large
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </UIDialog>
    </UIKitThemeWrapper>
  )
}

import React from 'react'
import AddIcon from '@mui/icons-material/Add'
import { Grid, Button, Typography } from '@mui/material'

export const BasicButtons = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6} container spacing={2}>
        <Grid item xs={12}>
          <Typography variant='subtitle1'>Contained</Typography>
        </Grid>
        <Grid item xs={12} container spacing={1}>
          <Grid item>
            <Button variant='contained' size='large' disableElevation>
              Large
            </Button>
          </Grid>
          <Grid item>
            <Button variant='contained' disableElevation>
              Medium
            </Button>
          </Grid>
          <Grid item>
            <Button variant='contained' size='small' disableElevation>
              Small
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12} container spacing={1}>
          <Grid item>
            <Button variant='contained' size='large' disableElevation disabled>
              Large
            </Button>
          </Grid>
          <Grid item>
            <Button variant='contained' disableElevation disabled>
              Medium
            </Button>
          </Grid>
          <Grid item>
            <Button variant='contained' size='small' disableElevation disabled>
              Small
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={6} container spacing={2}>
        <Grid item xs={12}>
          <Typography variant='subtitle1'>Alternate</Typography>
        </Grid>
        <Grid item xs={12} container spacing={1}>
          <Grid item>
            <Button variant='alternate' size='large' disableElevation>
              Large
            </Button>
          </Grid>
          <Grid item>
            <Button variant='alternate' disableElevation>
              Medium
            </Button>
          </Grid>
          <Grid item>
            <Button variant='alternate' size='small' disableElevation>
              Small
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12} container spacing={1}>
          <Grid item>
            <Button variant='alternate' size='large' disableElevation disabled>
              Large
            </Button>
          </Grid>
          <Grid item>
            <Button variant='alternate' disableElevation disabled>
              Medium
            </Button>
          </Grid>
          <Grid item>
            <Button variant='alternate' size='small' disableElevation disabled>
              Small
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={6} container spacing={2}>
        <Grid item xs={12}>
          <Typography variant='subtitle1'>Outlined</Typography>
        </Grid>
        <Grid item xs={12} container spacing={1}>
          <Grid item>
            <Button variant='outlined' size='large' disableElevation>
              Large
            </Button>
          </Grid>
          <Grid item>
            <Button variant='outlined' disableElevation>
              Medium
            </Button>
          </Grid>
          <Grid item>
            <Button variant='outlined' size='small' disableElevation>
              Small
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12} container spacing={1}>
          <Grid item>
            <Button variant='outlined' size='large' disableElevation disabled>
              Large
            </Button>
          </Grid>
          <Grid item>
            <Button variant='outlined' disableElevation disabled>
              Medium
            </Button>
          </Grid>
          <Grid item>
            <Button variant='outlined' size='small' disableElevation disabled>
              Small
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={6} container spacing={2}>
        <Grid item xs={12}>
          <Typography variant='subtitle1'>Text</Typography>
        </Grid>
        <Grid item xs={12} container spacing={1}>
          <Grid item>
            <Button
              variant='text'
              size='large'
              startIcon={<AddIcon />}
              disableElevation
            >
              Large
            </Button>
          </Grid>
          <Grid item>
            <Button variant='text' startIcon={<AddIcon />} disableElevation>
              Medium
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant='text'
              startIcon={<AddIcon />}
              size='small'
              disableElevation
            >
              Small
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12} container spacing={1}>
          <Grid item>
            <Button
              variant='text'
              startIcon={<AddIcon />}
              size='large'
              disableElevation
              disabled
            >
              Large
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant='text'
              startIcon={<AddIcon />}
              disableElevation
              disabled
            >
              Medium
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant='text'
              size='small'
              startIcon={<AddIcon />}
              disableElevation
              disabled
            >
              Small
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

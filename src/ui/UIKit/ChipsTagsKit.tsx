import { Grid, Typography } from '@mui/material'
import React from 'react'
import { UIKitThemeWrapper } from 'ui/UIKit/UIKitThemeWrapper'
import { CustomChip } from 'ui/CustomChip'
import { VSpacer } from 'components/VSpacer'
import { UITag } from 'ui/UITag/UITag'

export const ChipsTagsKit = () => {
  const handleClick = () => {
    console.info('You clicked the Chip.')
  }

  const handleDelete = () => {
    console.info('You clicked the delete icon.')
  }
  return (
    <UIKitThemeWrapper>
      <Grid padding={2} container spacing={2} direction='row'>
        <Grid padding={2} container spacing={2} direction='column'>
          <Grid>
            <Typography variant='h2'>Chips</Typography>
          </Grid>
          <VSpacer size={'small'} />
          <Grid>
            <CustomChip
              label='HyperDrive'
              onClick={handleClick}
              onDelete={handleDelete}
            />
          </Grid>
          <br />
          <Grid>
            <CustomChip
              label='HyperDrive'
              onClick={handleClick}
              onDelete={handleDelete}
              disabled
            />
          </Grid>
        </Grid>

        <Grid padding={2} container spacing={2} direction='column'>
          <Grid item>
            <Typography variant='h2'>Tags</Typography>
          </Grid>
          <VSpacer size='small' />

          <Grid padding={2} container spacing={12}>
            <Grid item>
              <Typography variant='subtitle1'>Basic</Typography>
            </Grid>
            <Grid item>
              <Typography variant='subtitle1'>Special</Typography>
            </Grid>
          </Grid>

          <Grid padding={2} container spacing={12}>
            <Grid item>
              <UITag>HyperDrive</UITag>
            </Grid>
            <Grid item>
              <UITag variant='special'>+2</UITag>
            </Grid>
          </Grid>

          <Grid item>
            <Typography variant='subtitle1'>Special (on Cards)</Typography>
          </Grid>
          <Grid item>
            <UITag variant='success'>Trading</UITag>
          </Grid>
          <Grid item>
            <UITag variant='warning'>Pending</UITag>
          </Grid>
          <Grid item>
            <UITag variant='error'>Pending</UITag>
          </Grid>
          <Grid item>
            <UITag variant='unknown'>Funded</UITag>
          </Grid>
        </Grid>
      </Grid>
    </UIKitThemeWrapper>
  )
}

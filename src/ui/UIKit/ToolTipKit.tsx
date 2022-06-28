import { Grid, Tooltip, Button } from '@mui/material'
import React from 'react'
import { UIKitThemeWrapper } from 'ui/UIKit/UIKitThemeWrapper'
import Info from 'assets/icons/info-tooltip.svg'

export const ToolTipKit = () => {
  return (
    <UIKitThemeWrapper>
      <br />
      <br />
      <Grid container spacing={1} alignContent='center'>
        <Grid item>
          <Tooltip title='My Tooltip'>
            <Button>My Tooltip</Button>
          </Tooltip>
        </Grid>
        <Grid item>
          <Tooltip title='My Tooltip' arrow>
            <Button>My Tooltip</Button>
          </Tooltip>
        </Grid>
        <Grid item>
          <Tooltip title='My Tooltip' arrow placement='top'>
            <Button>My Tooltip</Button>
          </Tooltip>
        </Grid>
        <Grid item>
          <Tooltip title='My Tooltip' arrow placement='right'>
            <Button>My Tooltip</Button>
          </Tooltip>
        </Grid>
      </Grid>
      <br />
      <br />
      <Grid container spacing={1} alignContent='center'>
        <Grid item>
          <Tooltip
            title='Foreign Account Tax Compliance Act'
            arrow
            placement='right'
          >
            <img alt='info' src={Info} />
          </Tooltip>
        </Grid>
      </Grid>
    </UIKitThemeWrapper>
  )
}

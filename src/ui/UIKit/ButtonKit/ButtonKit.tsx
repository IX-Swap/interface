import { Paper, Grid } from '@mui/material'
import React from 'react'
import { BasicButtons } from 'ui/UIKit/ButtonKit/BasicButtons'
import { ButtonGroupKit } from 'ui/UIKit/ButtonKit/ButtonGroup'
import { IconButtonKit } from 'ui/UIKit/ButtonKit/IconButtonKit'
import { FABKit } from 'ui/UIKit/ButtonKit/FABKit'
import { DropdownKit } from 'ui/UIKit/ButtonKit/DropdownKit'
import { UIKitThemeWrapper } from 'ui/UIKit/UIKitThemeWrapper'

export const ButtonKit = () => {
  return (
    <UIKitThemeWrapper>
      <Paper sx={{ padding: 2 }} elevation={0}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <BasicButtons />
          </Grid>
          <Grid item xs={12}>
            <ButtonGroupKit />
          </Grid>
          <Grid item xs={6}>
            <IconButtonKit />
          </Grid>
          <Grid item xs={6}>
            <FABKit />
          </Grid>
          <Grid item xs={12}>
            <DropdownKit />
          </Grid>
        </Grid>
      </Paper>
    </UIKitThemeWrapper>
  )
}

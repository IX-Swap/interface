import { Grid, RadioGroup, Switch, Typography } from '@mui/material'
import React from 'react'
import { UICheckbox } from 'ui/UICheckbox/UICheckbox'
import { VSpacer } from 'components/VSpacer'
import { UIRadio } from 'ui/UIRadio/UIRadio'
import { UIKitThemeWrapper } from 'ui/UIKit/UIKitThemeWrapper'

export const RadioCheckSwitchKit = () => {
  return (
    <UIKitThemeWrapper>
      <Grid padding={2}>
        <Grid item container md={6} spacing={6}>
          <Grid item>
            <Typography color='text.primary'>Radio:</Typography>
          </Grid>
        </Grid>
        <RadioGroup defaultValue={3}>
          <Grid item container md={6} spacing={6}>
            <Grid item>
              <UIRadio disabled value={1} />
            </Grid>
            <Grid item>
              <UIRadio value={2} />
            </Grid>
            <Grid item>
              <UIRadio value={3} />
            </Grid>
            <Grid item>
              <UIRadio checked disabled value={4} />
            </Grid>
          </Grid>
        </RadioGroup>

        <VSpacer size={'small'} />

        <Grid item container md={6} spacing={6}>
          <Grid item>
            <Typography color='text.primary'>Checkbox:</Typography>
          </Grid>
        </Grid>
        <Grid item container md={6} spacing={6}>
          <Grid item>
            <UICheckbox disabled />
          </Grid>
          <Grid item>
            <UICheckbox />
          </Grid>
          <Grid item>
            <UICheckbox checked />
          </Grid>
          <Grid item>
            <UICheckbox checked disabled />
          </Grid>
        </Grid>

        <VSpacer size={'small'} />

        <Grid item container md={6} spacing={6}>
          <Grid item>
            <Typography color='text.primary'>Switch:</Typography>
          </Grid>
        </Grid>
        <VSpacer size={'extraSmall'} />
        <Grid item container md={6} spacing={6}>
          <Grid item>
            <Switch disabled />
          </Grid>
          <Grid item>
            <Switch />
          </Grid>
          <Grid item>
            <Switch checked />
          </Grid>
          <Grid item>
            <Switch checked disabled />
          </Grid>
        </Grid>
      </Grid>
    </UIKitThemeWrapper>
  )
}

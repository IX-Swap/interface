import React from 'react'
import { Grid, Typography, Box, BoxProps } from '@mui/material'
import { useTheme } from '@mui/styles'
import { UIKitThemeWrapper } from 'ui/UIKit/UIKitThemeWrapper'
import { useDarkMode } from 'storybook-dark-mode'

export const RoundedBox = (props: BoxProps) => {
  const { palette } = useTheme()
  return (
    <Box
      {...props}
      sx={{
        width: 80,
        height: 80,
        borderRadius: 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: palette.text.primary
      }}
    />
  )
}

export const ColorDisplay = () => {
  return (
    <Grid container spacing={2}>
      <Grid item container spacing={1} xs={12} md={3}>
        <Grid item xs={12}>
          <Typography>Background</Typography>
        </Grid>
        <Grid item>
          <RoundedBox bgcolor='background.paper'>
            <Typography color='text.primary'>Paper</Typography>
          </RoundedBox>
        </Grid>
        <Grid item>
          <RoundedBox bgcolor='background.default'>
            <Typography color='text.primary'>Default</Typography>
          </RoundedBox>
        </Grid>
      </Grid>
      <Grid item container spacing={1} xs={12} md={3}>
        <Grid item xs={12}>
          <Typography>Primary</Typography>
        </Grid>
        <Grid item>
          <RoundedBox bgcolor='primary.main'>
            <Typography>Main</Typography>
          </RoundedBox>
        </Grid>
        <Grid item>
          <RoundedBox bgcolor='primary.light'>
            <Typography>Light</Typography>
          </RoundedBox>
        </Grid>
        <Grid item>
          <RoundedBox bgcolor='primary.dark'>
            <Typography>Dark</Typography>
          </RoundedBox>
        </Grid>
      </Grid>
      <Grid item container spacing={1} xs={12} md={3}>
        <Grid item xs={12}>
          <Typography>Secondary</Typography>
        </Grid>
        <Grid item>
          <RoundedBox bgcolor='secondary.main'>
            <Typography>Main</Typography>
          </RoundedBox>
        </Grid>
        <Grid item>
          <RoundedBox bgcolor='secondary.light'>
            <Typography>Light</Typography>
          </RoundedBox>
        </Grid>
        <Grid item>
          <RoundedBox bgcolor='secondary.dark'>
            <Typography>Dark</Typography>
          </RoundedBox>
        </Grid>
      </Grid>
      <Grid item container spacing={1} xs={12} md={3}>
        <Grid item xs={12}>
          <Typography>Text</Typography>
        </Grid>
        <Grid item>
          <RoundedBox bgcolor='background.default'>
            <Typography color='text.primary'>Primary</Typography>
          </RoundedBox>
        </Grid>
        <Grid item>
          <RoundedBox bgcolor='background.default'>
            <Typography color='text.secondary'>Secondary</Typography>
          </RoundedBox>
        </Grid>
      </Grid>
      <Grid item container spacing={1} xs={12}>
        <Grid item xs={12}>
          <Typography>Alerts and Status</Typography>
        </Grid>
        <Grid item>
          <RoundedBox bgcolor='success.main'>
            <Typography>Success</Typography>
          </RoundedBox>
        </Grid>
        <Grid item>
          <RoundedBox bgcolor='warning.main'>
            <Typography>Warning</Typography>
          </RoundedBox>
        </Grid>
        <Grid item>
          <RoundedBox bgcolor='error.main'>
            <Typography>Error</Typography>
          </RoundedBox>
        </Grid>
        <Grid item>
          <RoundedBox bgcolor='info.main'>
            <Typography>Info</Typography>
          </RoundedBox>
        </Grid>
      </Grid>
    </Grid>
  )
}

export const ColorKit = () => {
  return (
    <UIKitThemeWrapper>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant='h4'>
            {useDarkMode() ? 'Dark ' : 'Light '}Theme
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <ColorDisplay />
        </Grid>
      </Grid>
    </UIKitThemeWrapper>
  )
}

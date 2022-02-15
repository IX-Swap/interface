import { Grid, Avatar, Typography, Badge, BadgeProps } from '@mui/material'
import React from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { AppTheme, getAppTheme } from 'themes/new'
import TestIcon from './test.svg'
import { useTheme } from '@mui/styles'

export const StyledBadge = (props: BadgeProps) => {
  const { palette } = useTheme()
  return (
    <Badge
      {...props}
      sx={{
        '& .MuiBadge-badge': {
          backgroundColor: palette.success.main,
          color: palette.success.main,
          '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            content: '""'
          }
        }
      }}
    />
  )
}

export const AvatarKit = () => {
  return (
    <ThemeProvider theme={getAppTheme(AppTheme.Light, true)}>
      <Grid container spacing={1} alignContent='center'>
        <Grid item container spacing={1} xs={12} md={3}>
          <Grid item xs={12}>
            <Typography>Basic</Typography>
          </Grid>
          <Grid item>
            <Avatar>A</Avatar>
          </Grid>
          <Grid item>
            <Avatar src={TestIcon} />
          </Grid>
        </Grid>
        <Grid item container spacing={1} xs={12} md={3}>
          <Grid item xs={12}>
            <Typography>With status</Typography>
          </Grid>
          <Grid item>
            <StyledBadge
              overlap='circular'
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant='dot'
            >
              <Avatar>A</Avatar>
            </StyledBadge>
          </Grid>
          <Grid item>
            <StyledBadge
              overlap='circular'
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant='dot'
            >
              <Avatar src={TestIcon} />
            </StyledBadge>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

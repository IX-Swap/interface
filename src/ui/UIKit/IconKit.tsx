import { Grid, Typography } from '@mui/material'
import React from 'react'
import { Icon } from 'ui/Icons/Icon'
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined'
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined'
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined'
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import MenuIcon from '@mui/icons-material/Menu'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { lightTheme } from 'themes/new/light'
import { getThemeOverrides } from 'themes/new/overrides'
import { typography } from 'themes/new/typography'

const theme = createTheme({ ...lightTheme, typography })
theme.components = getThemeOverrides(theme)

export const IconKit = () => {
  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant='h5'>Navigation</Typography>
        </Grid>
        <Grid item xs={12}>
          <Icon name='arrow-left' />
          <Icon name='arrow-right' />
          <Icon name='arrow-down' />
          <Icon name='arrow-up' />
          <ChevronLeftOutlinedIcon sx={{ fill: '#778194' }} />
          <ChevronRightOutlinedIcon sx={{ fill: '#778194' }} />
          <ExpandMoreOutlinedIcon sx={{ fill: '#778194' }} />
          <ExpandLessOutlinedIcon sx={{ fill: '#778194' }} />
          <Icon name='plus' />
          <Icon name='minus' />
          <ArrowLeftIcon sx={{ fill: '#778194' }} />
          <ArrowRightIcon sx={{ fill: '#778194' }} />
          <ArrowDropDownIcon sx={{ fill: '#778194' }} />
          <ArrowDropUpIcon sx={{ fill: '#778194' }} />
          <CheckIcon sx={{ fill: '#778194' }} />
          <CloseIcon sx={{ fill: '#778194' }} />
          <MenuIcon sx={{ fill: '#778194' }} />
          <MoreVertIcon sx={{ fill: '#778194' }} />
          <MoreHorizIcon sx={{ fill: '#778194' }} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h5'>Other</Typography>
        </Grid>
        <Grid item xs={12}>
          <Icon name='bell' />
          <Icon name='alert-triangle' />
          <Icon name='alert-circle' />
          <AccountCircleOutlinedIcon sx={{ fill: '#778194' }} />
          <Icon name='user' />
          <Icon name='users' />
          <Icon name='edit' />
          <Icon name='send' />
          <Icon name='mail' />
          <Icon name='refresh' />
          <Icon name='message' />
          <Icon name='date' />
          <Icon name='star' />
          <Icon name='star-half-filled' />
          <Icon name='star-filled' />
          <Icon name='time' />
          <Icon name='search' />
          <Icon name='file' />
          <Icon name='settings' />
          <Icon name='security' />
          <Icon name='download' />
          <Icon name='upload' />
          <Icon name='logout' />
          <Icon name='login' />
          <Icon name='book' />
          <Icon name='trash' />
          <Icon name='eye' />
          <Icon name='eye-off' />
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

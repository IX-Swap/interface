import { styled } from '@mui/material/styles'
import { MenuItem } from '@mui/material'

export const TopNavMenuItem = styled(MenuItem)(({ theme }) => ({
  paddingTop: 0,
  paddingBottom: 0,
  paddingLeft: 0,
  paddingRight: 0,

  '&:hover': {
    backgroundColor: theme.palette.slider.activeBackground,
    '& span': {
      color: `${
        theme.palette.mode === 'dark'
          ? theme.palette.getContrastText(theme.palette.background.default)
          : theme.palette.background.default
      }!important`
    }
  },
  '& span': {
    color: `${
      theme.palette.mode === 'dark'
        ? theme.palette.getContrastText(theme.palette.primary.main)
        : theme.palette.primary.main
    }!important`
  }
}))

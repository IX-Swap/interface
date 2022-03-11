import { styled } from '@mui/material/styles'

export const SIDEBAR_WIDTH = 300

export const SidebarWrapper = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.backgrounds.light,
  padding: theme.spacing(3, 0),
  marginTop: theme.spacing(2),

  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(5.2, 0),
    marginTop: theme.spacing(0),
    overflow: 'hidden',
    zIndex: 10,
    width: SIDEBAR_WIDTH,
    position: 'fixed',
    top: 64,
    left: 0,
    bottom: 0
  }
}))

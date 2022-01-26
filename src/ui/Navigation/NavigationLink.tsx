import { styled } from '@mui/material/styles'
import { Link } from 'react-router-dom'

export interface SidebarLinkProps {
  isActive: boolean
}

export const NavigationLink = styled(Link)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  padding: theme.spacing(2),
  color: theme.palette.grey[400],
  textDecoration: 'none',

  '& span': {
    ...theme.typography.body2,
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1.5)
  },

  '& svg': {
    width: 28,
    height: 28
  },

  [theme.breakpoints.up('md')]: {
    flexDirection: 'column',
    justifyContent: 'center',
    height: 88,
    padding: 0
  }
}))

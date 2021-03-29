import { styled } from '@material-ui/core/styles'
import { List } from '@material-ui/core'

export const NavigationWrapper = styled(List)(({ theme }) => {
  return {
    marginTop: 0,
    width: 250,
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.backgrounds.default
        : theme.palette.backgrounds.light,

    [theme.breakpoints.up('md')]: {
      border: `1px solid ${theme.palette.divider}`,
      marginTop: 64,
      boxShadow: theme.shadows[2],
      position: 'fixed',
      zIndex: 11,
      left: 0,
      top: 0,
      bottom: 0,
      width: 90
    }
  }
})

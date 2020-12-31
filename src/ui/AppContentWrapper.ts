import { Grid } from '@material-ui/core'
import { styled } from '@material-ui/core/styles'
import { Theme } from '@material-ui/core/styles/createPalette'

export interface AppContentWrapperProps {
  background: keyof Theme['palette']['backgrounds']
}

export const AppContentWrapper = styled(Grid)(({ theme }) => ({
  marginTop: 56,
  minHeight: '100vh',
  background: theme.palette.backgrounds.main,

  [theme.breakpoints.up('md')]: {
    paddingLeft: 90,
    marginTop: 64
  }
}))

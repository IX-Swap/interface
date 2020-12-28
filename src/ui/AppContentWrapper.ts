import { Grid } from '@material-ui/core'
import { styled } from '@material-ui/core/styles'

export const AppContentWrapper = styled(Grid)(({ theme }) => ({
  marginTop: 56,
  background: theme.palette.backgrounds.main,

  [theme.breakpoints.up('md')]: {
    paddingLeft: 90,
    marginTop: 64
  }
}))

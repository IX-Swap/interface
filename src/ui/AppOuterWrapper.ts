import { styled } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'

export const AppOuterWrapper = styled(Grid)(({ theme }) => {
  return {
    marginTop: 56,

    [theme.breakpoints.up('md')]: {
      paddingLeft: 90,
      marginTop: 64
    }
  }
})

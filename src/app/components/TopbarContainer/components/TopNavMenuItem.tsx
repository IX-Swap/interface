import { styled } from '@material-ui/core/styles'
import { MenuItem } from '@material-ui/core'

export const TopNavMenuItem = styled(MenuItem)(({ theme }) => ({
  paddingTop: 0,
  paddingBottom: 0,
  paddingLeft: 0,
  paddingRight: 0,

  '&:hover': {
    backgroundColor: theme.palette.slider.activeBackground,
    '& span': {
      color: `${theme.palette.background.default}!important`
    }
  },
  '& span': {
    color: `${theme.palette.primary.main}!important`
  }
}))

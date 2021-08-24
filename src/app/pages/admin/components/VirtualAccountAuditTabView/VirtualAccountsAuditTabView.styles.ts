import { makeStyles } from '@material-ui/core'

export default makeStyles(theme => ({
  tabRoot: {
    fontSize: 14,
    '& span': {
      fontWeight: 400
    }
  },
  tabRootSelected: {
    '& span': {
      fontWeight: 600
    }
  }
}))

import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  container: {
    position: 'relative',
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5)
  },
  header: {
    [theme.breakpoints.up('md')]: {
      paddingLeft: 300
    }
  },
  sidebar: {},
  content: {
    width: '100%'
  },
  wrapper: {
    flexDirection: 'column',

    [theme.breakpoints.up('md')]: {
      paddingLeft: 300,
      flexDirection: 'row',
      flexWrap: 'nowrap'
    }
  }
}))

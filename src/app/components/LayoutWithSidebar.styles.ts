import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  container: {
    position: 'relative',
    padding: 0
  },
  header: {
    padding: theme.spacing(5, 2, 0),

    [theme.breakpoints.up('md')]: {
      paddingLeft: 300
    }
  },
  sidebar: {},
  content: {
    width: '100%',
    padding: theme.spacing(2, 0)
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

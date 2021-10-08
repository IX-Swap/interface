import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  container: {
    // backgroundColor:
    //   theme.palette.type === 'light'
    //     ? 'rgb(250, 250, 250)'
    //     : theme.palette.background.paper,
    backgroundColor: 'rgb(250, 250, 250)',
    width: '100%',
    paddingTop: theme.spacing(5),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(3),
    paddingBottom: theme.spacing(5)
  },
  colorGrid: {
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.background.paper
        : '#292929'
  },
  wrapper: {
    width: '100%',
    columnGap: theme.spacing(2),
    boxSizing: 'border-box',
    [theme.breakpoints.up('xs')]: {
      display: 'grid',
      gridTemplateColumns: '243px auto 288px'
    }
  },
  middleBlock: {
    backgroundColor: theme.palette.background.paper,
    marginBottom: theme.spacing(2),
    minHeight: 300
  }
}))

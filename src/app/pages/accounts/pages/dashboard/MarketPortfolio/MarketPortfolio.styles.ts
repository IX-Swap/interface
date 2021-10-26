import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  // wrapper: {
  //   color: '#fff',
  //   paddingRight: 8,
  //   paddingLeft: 8,
  //   display: 'initial',
  //   textAlign: 'center',
  //   [theme.breakpoints.down('xs')]: {
  //     paddingRight: 0,
  //     paddingLeft: 0,
  //     display: 'flex',
  //     textAlign: 'start'
  //   }
  // },
  chartWrapper: {
    '& > div': {
      padding: 0
    }
  }
}))

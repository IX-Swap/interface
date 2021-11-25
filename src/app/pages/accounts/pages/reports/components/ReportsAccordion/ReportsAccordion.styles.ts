import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none',
    '&:before': {
      display: 'none'
    }
  },
  summaryWrapper: {
    minHeight: 'auto!important',
    flexDirection: 'row-reverse',
    justifyContent: 'flex-end',
    background: '#F6F8FA',
    border: '1px solid #BFD9FF'
  },
  summaryContent: {
    margin: '0!important'
  },
  summary: {
    marginLeft: theme.spacing(4),
    fontSize: 16
  },
  detailsWrapper: {
    padding: 0
  }
}))

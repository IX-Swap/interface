import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    minHeight: 200,
    height: '100%',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)',

    [theme.breakpoints.up('md')]: {
      flexDirection: 'row'
    }
  },
  link: {
    padding: 0,
    fontWeight: 500,
    fontSize: 16,
    '&:hover': {
      backgroundColor: 'initial',
      opacity: 0.6
    }
  },
  capitalStructure: {
    marginRight: 'auto',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 32,
    fontWeight: 'bold'
  },
  equity: {
    backgroundColor: '#E5E9CB',
    color: '#90A30F'
  },
  hybrid: {
    backgroundColor: '#EEF7F1',
    color: '#8DCA82'
  },
  debt: {
    backgroundColor: '#F2F2FE',
    color: '#8084F7'
  }
}))

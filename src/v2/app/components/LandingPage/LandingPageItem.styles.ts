import { makeStyles } from '@material-ui/styles'

export const useStyles = makeStyles(theme => ({
  container: {
    width: 145,
    height: 145,
    marginLeft: 25,
    marginRight: 25,
    marginBottom: 25,
    paddingTop: 25,
    borderRadius: 14,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'transparent',
    '&:hover': {
      backgroundColor: '#fafafa',
      borderColor: '#eeeeee',
      cursor: 'pointer'
    }
  },
  iconWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    width: 56,
    height: 56,
    borderRadius: 9
  },
  label: {
    textAlign: 'center'
  }
}))

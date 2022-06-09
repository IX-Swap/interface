import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  separator: {
    height: 1,
    width: '100%',
    background: '#DDDDDD',
    marginBottom: theme.spacing(2)
  },
  infoRow: {
    border: 'transparent',
    borderBottom: 'initial',
    borderTop: '1px solid #DDDDDD',
    paddingTop: theme.spacing(2)
  },
  infoCell: {
    color: '#848484',
    paddingTop: theme.spacing(2)
  }
}))

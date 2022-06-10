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
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(0.5)
  },
  infoCell: {
    color: '#848484',
    paddingTop: 0
  }
}))

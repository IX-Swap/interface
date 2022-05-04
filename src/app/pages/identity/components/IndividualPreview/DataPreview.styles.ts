import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  container: {
    justifyContent: 'center',
    display: 'flex',
    textAlign: 'center',
    paddingTop: theme.spacing(3)
  },
  containerAvatar: {
    justifyContent: 'center',
    display: 'flex',
    marginBottom: theme.spacing(3.5)
  },
  whiteBackground: {
    position: 'absolute',
    top: '0',
    right: '0',
    width: '100%',
    height: theme.spacing(33.4),
    backgroundColor: theme.palette.background.paper,
    zIndex: 1
  },
  preview: {
    zIndex: 5
  },
  textCorporate: {
    color: theme.palette.text.secondary,
    maxWidth: theme.spacing(40)
  },
  isIndividualGrid: {
    display: 'flex',
    justifyContent: 'center'
  }
}))

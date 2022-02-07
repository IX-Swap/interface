import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(theme => ({
  root: {
    '& .MuiDialog-paper': {
      margin: '2rem',
      maxWidth: 542,
      height: 'max-content'
    }
  },
  titleRoot: {
    position: 'relative',
    height: theme.spacing(9),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.primary.main
  },
  title: {
    fontWeight: 500,
    textTransform: 'none',
    color: theme.palette.getContrastText(theme.palette.primary.main)
  },
  dialogContent: {
    overflowY: 'initial',
    paddingLeft: '5em',
    paddingRight: '5em',
    paddingTop: '2em',
    paddingBottom: '2em',
    flex: 'none'
  },
  closeButton: {
    position: 'absolute',
    top: theme.spacing(1.8),
    right: theme.spacing(2),
    opacity: 0.6,
    color: theme.palette.getContrastText(theme.palette.primary.main)
  },
  actions: {
    paddingLeft: '5em',
    paddingRight: '5em',
    paddingTop: 0,
    paddingBottom: 0,
    marginBottom: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column'
  },
  multiEmail: {
    position: 'relative',
    width: '100%',
    height: 156,
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    padding: `${theme.spacing(3)}!important`,
    borderColor: `${theme.palette.primary.main}!important`,
    backgroundColor: `${theme.palette.background.default}!important`,

    '& input': {
      width: '100%',
      background: 'inherit!important',
      color: `${theme.palette.text.primary}!important`
    },
    '& span': {
      position: 'absolute!important',
      top: '-13px!important',
      left: '8px!important',
      background: 'inherit!important',
      display: 'block!important',
      color: `${theme.palette.primary.main}!important`
    }
  },
  emailItem: {
    borderRadius: '54px!important',
    backgroundColor: '#F0F0F0!important'
  },
  removeItem: {
    backgroundColor: '#C4C4C4!important',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 17,
    color: '#F0F0F0!important',
    width: 14,
    height: 14
  },
  buttonsBlock: {
    marginLeft: '0!important',
    marginTop: theme.spacing(3)
  },
  cancelButton: {
    marginRight: theme.spacing(3),
    fontSize: 14,
    fontWeight: 400
  },
  confirmButton: {
    fontSize: 14,
    fontWeight: 400
  }
}))

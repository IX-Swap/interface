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
    color: '#ffff'
  },
  actions: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  multiEmail: {
    position: 'relative',
    width: '100%',
    height: 156,
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    padding: `${theme.spacing(3)}!important`,
    borderColor: `${theme.palette.input.border}!important`,
    backgroundColor: `${theme.palette.background.paper}!important`,
    borderRadius: '8px',

    '& input': {
      width: '100%',
      background: 'inherit!important',
      color: `${theme.palette.text.primary}!important`
    },
    '& span': {
      background: 'inherit!important',
      color: `${theme.palette.text.secondary}!important`,
      lineHeight: '18px'
    }
  },
  emailItem: {
    borderRadius: '4px!important',
    background: '#4C88FF !important',
    color: '#ffff',
    fontWeight: 400
  },
  removeItem: {
    backgroundColor: '#4C88FF!important',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 17,
    color: '#F0F0F0!important',
    width: 14,
    height: 14,
    '& svg': {
      fill: '#ffff'
    }
  },
  buttonsBlock: {
    marginLeft: '0!important',
    marginTop: theme.spacing(3)
  },
  cancelButton: {
    marginRight: theme.spacing(3),
    fontSize: 14,
    fontWeight: 500
  },
  confirmButton: {
    fontSize: 14,
    fontWeight: 500
  }
}))

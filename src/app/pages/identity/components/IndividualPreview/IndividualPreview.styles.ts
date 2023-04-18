import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: theme.palette.backgrounds.default,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    paddingTop: theme.spacing(2.5),
    [theme.breakpoints.down('md')]: {
      flexWrap: 'wrap',
      justifyContent: 'center'
    }
  },
  buttonBox: {
    paddingTop: theme.spacing(14.2),
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    '& a': {
      width: theme.spacing(12.5),
      height: theme.spacing(6.1)
    },
    [theme.breakpoints.down('md')]: {
      paddingTop: theme.spacing(2),
      justifyContent: 'center',
      '& a': {
        width: theme.spacing(20.6)
      }
    }
  },
  index: {
    zIndex: 2
  },
  approveButton: {
    paddingRight: theme.spacing(12.5),
    paddingTop: theme.spacing(14.5),
    '& div': {
      width: theme.spacing(14.7),
      textAlign: 'center'
    },
    zIndex: 5,
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  hourglassImage: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '40px'
  },
  approvalText: {
    marginLeft: 'auto',
    marginRight: 'auto',
    color: '#D3A701',
    fontWeight: 600,
    fontSize: '18px',
    textAlign: 'center',
    lineHeight: '140%',
    paddingTop: '22px !important'
  },
  approvalSubText: {
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
    marginTop: '0px',
    paddingTop: '22px !important',
    color: '#D3A701',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '20px'
  },
  backgroud: {
    backgroundColor: '#FFF5CD',
    border: 'solid 1px #FFC900',
    height: '289px',
    marginTop: '60px',
    paddingLeft: '16px'
  }
}))

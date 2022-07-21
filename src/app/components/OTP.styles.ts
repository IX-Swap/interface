import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  otp: {
    fontSize: theme.spacing(3),
    borderRadius: theme.spacing(1),
    border: `1px solid ${theme.palette.otpInput.border}`,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    height: '70px',
    width: '55px !important',
    '&:focus': {
      border: `1px solid ${theme.palette.otpInput.borderFocus}`
    },
    [theme.breakpoints.down('sm')]: {
      padding: '3px',
      width: '40px !important',
      marginLeft: theme.spacing(0.5),
      marginRight: theme.spacing(0.5)
    }
  }
}))

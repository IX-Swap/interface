import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  container: {},
  fullwidth: {
    justifyContent: 'center',
    width: 'calc(100% - 20px)',
    [theme.breakpoints.down('lg')]: {
      width: 'calc(100% - 8px)'
    }
  },
  input: {
    display: 'block',
    outline: 'none',
    [theme.breakpoints.down('lg')]: {
      width: '42px!important',
      height: 70,
      borderRadius: 8,
      fontSize: 24,
      margin: theme.spacing(0, 0.5)
    },
    width: '72px!important',
    height: 120,
    border: `1px solid ${theme.palette.otpInput.border}`,
    borderRadius: 16,
    backgroundColor: theme.palette.otpInput.bg,
    color: theme.palette.otpInput.color,
    fontSize: 32,
    margin: theme.spacing(0, 1.25),
    boxSizing: 'border-box',
    caretColor: 'transparent',
    boxShadow: `0px 32px 64px ${theme.palette.otpInput.boxShadow}`,

    '&:focus': {
      border: `1px solid ${theme.palette.otpInput.borderFocus}`,

      '&::placeholder': {
        color: theme.palette.otpInput.placeholderFocus
      }
    },
    '&::placeholder': {
      lineHeight: 1,
      fontSize: 54,
      [theme.breakpoints.down('lg')]: {
        fontSize: 30
      },
      color: theme.palette.otpInput.placeholder
    }
  },
  error: {
    borderColor: theme.palette.otpInput.borderError,
    color: theme.palette.otpInput.colorError,

    '&::placeholder': {
      color: theme.palette.otpInput.placeholderError
    }
  }
}))

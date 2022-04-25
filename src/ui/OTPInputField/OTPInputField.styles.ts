import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  container: {},
  fullwidth: {
    width: '100%',
    justifyContent: 'center'
  },
  input: {
    display: 'block',
    outline: 'none',
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
      fontSize: 60,
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

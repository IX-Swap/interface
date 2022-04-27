import makeStyles from '@mui/styles/makeStyles'

export interface Props {
  mobile: boolean
}

export const useStyles = makeStyles(theme => ({
  container: {},
  fullwidth: {
    width: '100%',
    justifyContent: 'center'
  },
  input: {
    display: 'block',
    outline: 'none',
    width: (props: Props) =>
      props.mobile ? '42px!important' : '72px!important',
    height: (props: Props) => (props.mobile ? 70 : 120),
    border: `1px solid ${theme.palette.otpInput.border}`,
    borderRadius: (props: Props) => (props.mobile ? 8 : 16),
    backgroundColor: theme.palette.otpInput.bg,
    color: theme.palette.otpInput.color,
    fontSize: (props: Props) => (props.mobile ? 24 : 32),
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
      fontSize: (props: Props) => (props.mobile ? 30 : 54),
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

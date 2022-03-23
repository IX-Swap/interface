import makeStyles from '@mui/styles/makeStyles'

export interface Props {
  hasErrors: boolean
}

export const useStyles = makeStyles(theme => ({
  passwordField: {
    paddingRight: 0,
    '& .MuiOutlinedInput-root': {
      paddingRight: 0
    },
    '& .MuiInputBase-input input': {
      width: '100%'
    },
    '& .MuiInputAdornment-root': {
      marginLeft: '-35px'
    }
  },
  showPasswordButton: {
    paddingLeft: 0,
    paddingRight: 0,
    '&:hover': {
      backgroundColor: 'transparent',
      '& svg': {
        fill: ({ hasErrors }: Props) =>
          hasErrors ? theme.palette.error.main : '#4C88FF'
      }
    },
    '& svg': {
      width: 24,
      height: 24,

      fill: ({ hasErrors }: Props) =>
        hasErrors ? theme.palette.error.main : '#778194'
    }
  }
}))

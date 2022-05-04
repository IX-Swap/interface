import { Theme } from '@mui/material'

export const dialog = (theme: Theme) => {
  // eslint-disable-next-line
  return {
    styleOverrides: {
      paper: {
        padding: theme.spacing(2),
        borderRadius: '16px',
        minWidth: 380,

        [theme.breakpoints.down('md')]: {
          minWidth: 'none'
        }
      }
    }
  }
}

export const dialogContent = (theme: Theme) => {
  // eslint-disable-next-line
  const textPalette = theme.palette.text!
  return {
    styleOverrides: {
      root: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: '14px',
        lineHeight: '17px',
        color: textPalette.secondary,
        padding: 40,
        marginTop: theme.spacing(1)
      }
    }
  }
}

export const dialogActions = (theme: Theme) => {
  return {
    styleOverrides: {
      root: {
        padding: 40
      }
    }
  }
}

export const dialogTitle = (theme: Theme) => {
  // eslint-disable-next-line
  const textPalette = theme.palette.text!
  return {
    styleOverrides: {
      root: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: '22px',
        lineHeight: '27px',
        letterSpacing: '-0.02em',
        color: textPalette.primary,
        padding: 40,
        display: 'flex',
        justifyContent: 'center'
      }
    }
  }
}

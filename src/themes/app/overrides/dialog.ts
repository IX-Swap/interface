import { Theme } from '@mui/material'

export const dialog = (theme: Theme) => {
  return {
    styleOverrides: {
      paper: {
        padding: theme.spacing(4),
        borderRadius: 8,
        minWidth: 380,

        [theme.breakpoints.down('md')]: {
          minWidth: 'initial',
          padding: theme.spacing(2)
        }
      }
    }
  }
}

export const dialogContent = (theme: Theme) => {
  const textPalette = theme.palette.text
  return {
    styleOverrides: {
      root: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: '14px',
        lineHeight: '17px',
        color: textPalette.secondary,
        marginTop: theme.spacing(1)
      }
    }
  }
}

export const dialogActions = (theme: Theme) => {
  return {
    styleOverrides: {
      root: {}
    }
  }
}

export const dialogTitle = (theme: Theme) => {
  const dialogPalette = theme.palette.dialog
  return {
    styleOverrides: {
      root: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: '24px',
        lineHeight: '29px',
        letterSpacing: '-0.02em',
        color: dialogPalette.color,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }
    }
  }
}

import { Theme } from '@mui/material'

export const dialog = (theme: Theme) => {
  // eslint-disable-next-line
  const chipPalette = theme.palette.chip!
  return {
    styleOverrides: {
      paper: {
        padding: '2rem'
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
        padding: '1rem',
        marginTop: '1rem'
      }
    }
  }
}

export const dialogActions = (theme: Theme) => {
  return {
    styleOverrides: {
      root: {
        padding: '1rem'
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
        padding: '1rem'
      }
    }
  }
}

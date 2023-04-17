import { Theme } from '@mui/material'
import { alpha } from '@mui/material/styles'

export const avatar = (theme: Theme) => {
  return {
    styleOverrides: {
      colorDefault: {
        backgroundColor: alpha(theme.palette.primary.main, 0.1),
        color: theme.palette.primary.main,
        border: `1px solid ${theme.palette.primary.main}`
      },
      root: {
        ':hover': {
          backgroundColor: theme.palette.primary.main,
          color: '#FFFFFF',
          cursor: 'pointer'
        }
      }
    }
  }
}

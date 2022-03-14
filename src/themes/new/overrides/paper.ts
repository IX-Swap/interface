import { Theme } from '@mui/material'
import { alpha } from '@mui/material/styles'

export const paper = (theme: Theme) => {
  return {
    styleOverrides: {
      root: {
        backgroundColor: theme.palette.background.paper,
        backgroundImage: 'none',
        boxSizing: 'border-box',

        '&.MuiPaper-outlined': {
          boxShadow: `0px 80px 80px ${alpha('#a2acbf', 0.16)}`,
          border: '1px solid #EDF2FA'
        }
      }
    }
  }
}

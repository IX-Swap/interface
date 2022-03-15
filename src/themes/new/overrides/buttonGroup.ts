import { Theme } from '@mui/material'

export const buttonGroup = (theme: Theme) => {
  return {
    styleOverrides: {
      outlined: {
        button: {
          borderColor: 'rgba(76, 136, 255, 0.3)',
          ':hover': {
            backgroundColor: '#EDF2FA',
            color: '#4C88FF',
            borderColor: 'rgba(76, 136, 255, 0.3)'
          }
        }
      }
    }
  }
}

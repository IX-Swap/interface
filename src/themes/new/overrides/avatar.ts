import { Theme } from '@mui/material'
import { alpha } from '@mui/material/styles'

export const avatar = (theme: Theme) => {
  return {
    styleOverrides: {
      colorDefault: {
        backgroundColor: alpha('#4C88FF', 0.1),
        color: '#4C88FF',
        border: '1px solid #4C88FF'
      },
      root: {
        ':hover': {
          backgroundColor: '#4C88FF',
          color: '#FFFFFF',
          cursor: 'pointer'
        }
      }
    }
  }
}

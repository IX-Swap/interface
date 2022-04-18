import { Theme } from '@mui/material'

export const svgIcon = (theme: Theme) => {
  return {
    styleOverrides: {
      root: {
        backgroundColor: 'transparent',
        '.Mui-checked &': {
          fill: '#0055FF'
        }
      }
    }
  }
}

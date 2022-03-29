import { Theme } from '@mui/material'

export const inputBase = (theme: Theme) => {
  return {
    styleOverrides: {
      root: {
        '&.Mui-focused': {
          backgroundColor: 'transparent',

          '& .MuiTablePagination-select': {
            backgroundColor: 'transparent',
            borderRadius: 8
          }
        }
      }
    }
  }
}

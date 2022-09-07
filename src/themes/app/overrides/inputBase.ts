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
        },
        '&.Mui-disabled': {
          '-webkit-text-fill-color': theme.palette.select.colorDisabled,
          color: 'rgb(119, 129, 148)'
        }
      }
    }
  }
}

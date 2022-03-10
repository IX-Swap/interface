import { Theme } from '@mui/material'

export const checkbox = (theme: Theme) => {
  const checkboxPalette = theme.palette.checkbox

  return {
    styleOverrides: {
      root: {
        '&.MuiButtonBase-root': {
          height: 'auto',
          background: 'inherit',

          '& .MuiSvgIcon-root': {
            width: 18,
            height: 18,
            borderRadius: 2,
            boxSizing: 'border-box',
            fill: checkboxPalette.fill,
            background: checkboxPalette.bg,
            border: checkboxPalette.border,
            boxShadow: checkboxPalette.boxShadow
          },

          '&.Mui-checked .MuiSvgIcon-root': {
            border: checkboxPalette.borderChecked
          },

          '&.Mui-disabled .MuiSvgIcon-root': {
            border: checkboxPalette.borderDisabled
          }
        }
      }
    }
  }
}

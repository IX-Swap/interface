import { Theme } from '@mui/material'

export const checkbox = (theme: Theme) => {
  const checkboxPalette = theme.palette.checkbox

  return {
    styleOverrides: {
      root: {
        '&.MuiButtonBase-root': {
          height: 'auto',
          background: 'inherit',

          '&:hover': {
            '& .MuiSvgIcon-root': {
              border: checkboxPalette.borderHover,
              boxShadow: checkboxPalette.boxShadow
            }
          },

          '& .MuiSvgIcon-root': {
            width: 16,
            height: 16,
            borderRadius: 2,
            boxSizing: 'border-box',
            fill: checkboxPalette.fill,
            background: checkboxPalette.bg,
            border: checkboxPalette.border
          },

          '&.Mui-checked': {
            '&:hover': {
              '& svg': {
                opacity: 0.8,
                boxShadow: checkboxPalette.boxShadow
              }
            }
          },
          '&.Mui-disabled': {
            '& .MuiSvgIcon-root': {
              opacity: checkboxPalette.opacity
            }
          }
        }
      }
    }
  }
}

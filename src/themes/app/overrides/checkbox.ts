import { Theme } from '@mui/material'
import { alpha } from '@mui/material/styles'

export const checkbox = (theme: Theme) => {
  const checkboxPalette = theme.palette.toggledInputs

  return {
    styleOverrides: {
      root: {
        '&.MuiButtonBase-root': {
          height: 'auto',
          background: 'inherit',

          '&:hover': {
            '& .MuiSvgIcon-root': {
              border: `1px solid ${checkboxPalette.borderHover}`,
              boxShadow: `0px 4px 4px ${alpha(checkboxPalette.boxShadow, 0.08)}`
            }
          },

          '& .MuiSvgIcon-root': {
            width: 18,
            height: 18,
            borderRadius: 2,
            boxSizing: 'border-box',
            fill: checkboxPalette.fill,
            background: checkboxPalette.bg,
            border: `1px solid ${checkboxPalette.border}`
          },

          '&.Mui-checked': {
            '&:hover': {
              '& svg': {
                opacity: 0.8
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

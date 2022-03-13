import { Theme } from '@mui/material'

export const radio = (theme: Theme) => {
  const radioPalette = theme.palette.toggledInputs

  return {
    styleOverrides: {
      root: {
        '&.MuiButtonBase-root': {
          height: 'auto',
          background: 'inherit',

          '&:hover': {
            '& .MuiSvgIcon-root': {
              border: radioPalette.borderHover,
              boxShadow: radioPalette.boxShadow
            }
          },

          '& .MuiSvgIcon-root': {
            width: 16,
            height: 16,
            background: radioPalette.bg,
            fill: radioPalette.fill,
            border: radioPalette.border,
            boxSizing: 'border-box',
            borderRadius: 10
          },

          '&.Mui-checked': {
            '&:hover': {
              '& svg': {
                opacity: 0.8,
                boxShadow: radioPalette.boxShadow
              }
            }
          },
          '&.Mui-disabled': {
            '& .MuiSvgIcon-root': {
              opacity: radioPalette.opacity
            }
          }
        }
      }
    }
  }
}

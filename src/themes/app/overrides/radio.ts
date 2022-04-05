import { Theme } from '@mui/material'
import { alpha } from '@mui/material/styles'

export const radio = (theme: Theme) => {
  // eslint-disable-next-line
  const radioPalette = theme.palette.toggledInputs!

  return {
    styleOverrides: {
      root: {
        '&.MuiButtonBase-root': {
          height: 'auto',
          background: 'inherit',

          '&:hover': {
            '& .MuiSvgIcon-root': {
              border: `1px solid ${radioPalette.borderHover}`,
              boxShadow: `0px 4px 4px ${
                theme.palette.mode === 'light'
                  ? alpha(radioPalette.boxShadow, 0.08)
                  : 'transparent'
              }`
            }
          },

          '& .MuiSvgIcon-root': {
            width: 16,
            height: 16,
            background: radioPalette.bg,
            fill: radioPalette.fill,
            border: `1px solid ${radioPalette.border}`,
            boxSizing: 'border-box',
            borderRadius: 10
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
              opacity: radioPalette.opacity
            }
          }
        }
      }
    }
  }
}

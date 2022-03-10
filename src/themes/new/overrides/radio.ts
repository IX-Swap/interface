import { Theme } from '@mui/material'

export const radio = (theme: Theme) => {
  const radioPalette = theme.palette.radio

  return {
    styleOverrides: {
      root: {
        '&.MuiButtonBase-root': {
          height: 'auto',
          background: 'inherit',

          '& .MuiSvgIcon-root': {
            width: 16,
            height: 16,
            background: radioPalette.bg,
            fill: radioPalette.fill,
            border: radioPalette.border,
            boxShadow: radioPalette.boxShadow,
            boxSizing: 'border-box',
            borderRadius: 10
          },

          '&.Mui-checked': {
            '& .MuiSvgIcon-root': {
              background: radioPalette.bgChecked,
              border: radioPalette.borderChecked
            },

            '&.Mui-disabled .MuiSvgIcon-root': {
              background: radioPalette.bgCheckedDisabled,
              fill: radioPalette.fillCheckedDisabled,
              border: radioPalette.borderCheckedDisabled
            }
          },

          '&.Mui-disabled': {
            '& .MuiSvgIcon-root': {
              border: radioPalette.borderDisabled,
              boxSizing: 'border-box'
            }
          }
        }
      }
    }
  }
}

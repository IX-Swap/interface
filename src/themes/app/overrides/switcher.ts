import { Theme } from '@mui/material'

export const switcher = (theme: Theme) => {
  const switchPalette = theme.palette.switch

  return {
    styleOverrides: {
      root: {
        width: 40,
        height: 32,
        padding: 0,

        '& .MuiSwitch-switchBase': {
          '&.MuiButtonBase-root': {
            width: 40,
            height: 32,
            '&:hover': {
              backgroundColor: 'inherit',
              '& + .MuiSwitch-track': {
                opacity: 0.8
              }
            },

            '& + .MuiSwitch-track': {
              background: switchPalette.bg,
              width: 24,
              height: 16,
              borderRadius: 100,
              opacity: 1,
              position: 'absolute',
              top: 8,
              left: 10
            },

            '&.Mui-disabled + .MuiSwitch-track': {
              opacity: 1,
              backgroundColor: switchPalette.bgDisabled
            },

            '& .MuiSwitch-thumb': {
              width: 12,
              height: 12,
              background: switchPalette.color,
              position: 'absolute',
              top: 10,
              left: 12,
              boxShadow: 'none'
            },

            '&.Mui-checked': {
              '&:hover': {
                '& + .MuiSwitch-track': {
                  opacity: 0.8
                }
              },
              transform: 'translateX(8px)',

              '& + .MuiSwitch-track': {
                backgroundColor: switchPalette.bgChecked,
                opacity: 1,
                border: 0
              },

              '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: switchPalette.bgCheckedDisabled
              }
            },
            '&.Mui-disabled .MuiSwitch-thumb': {
              background: switchPalette.colorDisabled
            }
          }
        }
      }
    }
  }
}

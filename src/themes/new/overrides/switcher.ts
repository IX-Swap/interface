import { Theme } from '@mui/material'

export const switcher = (theme: Theme) => {
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
              backgroundColor: 'inherit'
            },

            '& + .MuiSwitch-track': {
              background:
                theme.palette.mode === 'light'
                  ? theme.palette.text.secondary
                  : '#89A1CE',
              width: 24,
              height: 16,
              borderRadius: 100,
              opacity: 1,
              position: 'absolute',
              top: 8,
              left: 10
            },

            '&.Mui-checked': {
              transform: 'translateX(8px)',
              color:
                theme.palette.mode === 'light'
                  ? theme.palette.background.paper
                  : theme.palette.background.default,
              '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.primary.main,
                opacity: 1,
                border: 0
              },
              '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor:
                  theme.palette.mode === 'light' ? '#D3D9E5' : '#1D3667'
              }
            },
            '& .MuiSwitch-thumb': {
              width: 12,
              height: 12,
              background: '#ffffff',
              position: 'absolute',
              top: 10,
              left: 12,
              boxShadow: 'none'
            },
            '&.Mui-disabled .MuiSwitch-thumb': {
              background: theme.palette.background.default
            }
          }
        }
      }
    }
  }
}

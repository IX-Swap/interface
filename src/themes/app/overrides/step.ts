import { Theme } from '@mui/material'

export const step = (theme: Theme) => {
  return {
    styleOverrides: {
      root: {
        flex: 'initial',
        padding: 0
      },
      horizontal: {
        '& .MuiStepLabel-label': {
          paddingLeft: theme.spacing(2.75),
          paddingRight: theme.spacing(2.75),
          paddingBottom: theme.spacing(2.5),

          '&.Mui-active': {
            borderBottom: '1px solid #4C88FF'
          }
        }
      },
      vertical: {
        '& .MuiStepButton-root': {
          paddingLeft: 0,
          paddingRight: 31,
          margin: 0,
          boxSizing: 'border-box'
        },

        '& .MuiStepLabel-label': {
          position: 'relative',
          padding: theme.spacing(2, 1, 2, 5),

          '&.Mui-active': {
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: 1,
              height: '100%',
              background: '#4C88FF'
            }
          }
        }
      }
    }
  }
}

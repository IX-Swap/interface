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
        },
        [theme.breakpoints.down('md')]: {
          width: '100%',
          margin: '0 2px',
          '&:first-child': {
            marginLeft: 0
          },
          '&:last-child': {
            marginRight: 0
          },
          '& .MuiStepLabel-label': {
            display: 'none'
          },
          '& .MuiStepLabel-alternativeLabel': {
            display: 'none'
          },
          '& .MuiButtonBase-root': {
            height: 20,
            width: '100%',
            display: 'flex',
            padding: 0,
            margin: 0,
            alignItems: 'center',
            backgroundColor: 'transparent',
            '&::before': {
              content: '""',
              display: 'block',
              width: '100%',
              height: 4,
              borderRadius: 2,
              backgroundColor: '#BEC4CF'
            },
            '&.completed': {
              '&::before': { backgroundColor: '#7DD320' }
            },
            '&.error': {
              '&::before': {
                backgroundColor: '#F56283'
              }
            },
            '&.active': {
              '&::before': { backgroundColor: '#4C88FF' }
            }
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

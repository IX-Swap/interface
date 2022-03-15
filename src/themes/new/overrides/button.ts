import { Theme } from '@mui/material'

export const button = (theme: Theme) => {
  return {
    styleOverrides: {
      root: {
        height: 'auto',
        fontSize: 14,
        borderRadius: 8,
        padding: '12px 30px',
        fontWeight: 500,
        textTransform: 'none' as any,
        svg: {
          backgroundColor: 'transparent',
          fill: '#4C88FF'
        },
        '&.MuiButton-sizeLarge': {
          padding: '16px 40px'
        },
        '&.MuiButton-sizeSmall': {
          padding: '7px 34px',
          fontSize: 12
        },
        ':disabled': {
          color: '#778194',
          svg: {
            fill: '#778194'
          }
        },
        ':hover': {
          backgroundColor: '#78A5FF',
          color: '#FFFFFF',
          svg: {
            fill: '#FFF'
          }
        }
      },
      contained: {
        backgroundColor: '#4C88FF',
        ':disabled': {
          backgroundColor: '#EDF2FA'
        },
        svg: {
          backgroundColor: 'transparent',
          fill: '#FFFFFF'
        }
      },
      outlined: {
        backgroundColor: '#FFFFFF',
        border: '1px solid rgba(76, 136, 255, 0.3)',
        color: '#4C88FF',
        ':disabled': {
          backgroundColor: '#F0F2F7',
          border: '1px solid #F0F2F7'
        }
      },
      text: {
        ':hover': {
          backgroundColor: '#EDF2FA',
          color: '#4C88FF',
          svg: {
            fill: '#4C88FF'
          }
        },
        ':disabled': {
          color: '#89A1CE',
          svg: {
            fill: '#89A1CE'
          }
        }
      }
    },
    variants: [
      {
        props: { variant: 'alternate' } as any,
        style: {
          border: '1px solid rgba(76, 136, 255, 0.1)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#778194',
          ':disabled': {
            backgroundColor: '#EDF2FA',
            border: '1px solid #EDF2FA'
          }
        }
      }
    ]
  }
}

import { Theme } from '@mui/material'
import { alpha } from '@mui/material/styles'

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
          backgroundColor: theme.palette.button.bgContainedDisabled,
          color: theme.palette.button.colorContainedDisabled,
          svg: {
            fill: theme.palette.button.colorContainedDisabled
          },
          border: '1px solid transparent'
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
        svg: {
          backgroundColor: 'transparent',
          fill: '#FFFFFF'
        }
      },
      outlined: {
        backgroundColor: theme.palette.button.bgOutlined,
        border: `1px solid ${theme.palette.button.borderOutlined}`,
        color: '#4C88FF',
        '&:hover': {
          border: `1px solid ${alpha('#4c88ff', 0.3)}`
        }
      },
      text: {
        ':hover': {
          backgroundColor: theme.palette.button.bgTextHover,
          color: '#4C88FF',
          svg: {
            fill: '#4C88FF'
          }
        },
        ':disabled': {
          color: theme.palette.button.colorTextDisabled,
          svg: {
            fill: theme.palette.button.colorTextDisabled
          }
        }
      }
    },
    variants: [
      {
        props: { variant: 'alternate' } as any,
        style: {
          border: `1px solid ${
            theme.palette.mode === 'light'
              ? alpha('#4c88ff', 0.1)
              : 'transparent'
          }`,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.palette.button.bgAlternate,
          color: theme.palette.button.colorAlternate,

          ':hover': {
            backgroundColor: theme.palette.button.bgAlternateHover,
            color: theme.palette.button.colorAlternateHover,
            svg: {
              fill: theme.palette.button.colorAlternateHover
            },
            border: `1px solid ${theme.palette.button.borderAlternateHover}`
          }
        }
      }
    ]
  }
}

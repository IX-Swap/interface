import { Theme } from '@mui/material'
import { alpha } from '@mui/material/styles'

export const button = (theme: Theme) => {
  // eslint-disable-next-line
  const buttonPalette = theme.palette.button!

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
          backgroundColor: buttonPalette.bgContainedDisabled,
          color: buttonPalette.colorContainedDisabled,
          svg: {
            fill: buttonPalette.colorContainedDisabled
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
        backgroundColor: buttonPalette.bgOutlined,
        border: `1px solid ${buttonPalette.borderOutlined}`,
        color: '#4C88FF',
        '&:hover': {
          border: `1px solid ${alpha('#4c88ff', 0.3)}`
        }
      },
      text: {
        ':hover': {
          backgroundColor: buttonPalette.bgTextHover,
          color: '#4C88FF',
          svg: {
            fill: '#4C88FF'
          }
        },
        ':disabled': {
          color: buttonPalette.colorTextDisabled,
          svg: {
            fill: buttonPalette.colorTextDisabled
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
          backgroundColor: buttonPalette.bgAlternate,
          color: buttonPalette.colorAlternate,

          ':hover': {
            backgroundColor: buttonPalette.bgAlternateHover,
            color: buttonPalette.colorAlternateHover,
            svg: {
              fill: buttonPalette.colorAlternateHover
            },
            border: `1px solid ${buttonPalette.borderAlternateHover}`
          }
        }
      }
    ]
  }
}

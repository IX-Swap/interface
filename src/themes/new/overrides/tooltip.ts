import { Theme } from '@mui/material'

export const tooltip = (theme: Theme) => {
  // eslint-disable-next-line
  const tooltipPalette = theme.palette.tooltip!
  return {
    styleOverrides: {
      tooltip: {
        width: 'auto',
        minWidth: '78px',
        height: '26px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: `1px solid ${tooltipPalette.borderColor}`,
        boxSizing: 'border-box',
        borderRadius: '6px',

        background: tooltipPalette.bg,
        // font
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: '11px',
        lineHeight: '13px',
        letterSpacing: '-0.01em',
        color: tooltipPalette.color
      },
      arrow: {
        color: tooltipPalette.bg,
        boxSizing: 'border-box',
        '&::before': {
          border: `1px solid ${tooltipPalette.borderColor}`
        }
      }
    }
  }
}

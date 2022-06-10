import { Theme } from '@mui/material'

export const tooltip = (theme: Theme) => {
  const tooltipPalette = theme.palette.tooltip

  return {
    styleOverrides: {
      tooltip: {
        width: 'auto',
        minWidth: '78px',
        height: 'auto',
        minHeight: '26px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
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
        color: tooltipPalette.bg
      }
    }
  }
}

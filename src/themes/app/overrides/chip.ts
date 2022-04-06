import { Theme } from '@mui/material'

export const chip = (theme: Theme) => {
  const chipPalette = theme.palette.chip

  return {
    styleOverrides: {
      root: {
        background: chipPalette.bg,
        borderRadius: '56px',
        width: '129px',
        height: '38px',

        '& .MuiChip-label': {
          width: '69px',
          height: '16px',
          fontFamily: 'Inter',
          fontStyle: 'normal',
          fontWeight: '500',
          fontSize: '13px',
          lineHeight: '16px',
          letterSpacing: '-0.01em',
          color: chipPalette.color,
          opacity: chipPalette.opacity
        },

        '& .MuiChip-deleteIcon': {
          '& rect': {
            fill: chipPalette.fill
          }
        },

        '&:hover': {
          background: chipPalette.bg,
          borderRadius: '56px',
          '& .MuiChip-deleteIcon': {
            '& rect': {
              fill: '#4C88FF'
            }
          }
        },

        '&.Mui-disabled': {
          opacity: 0.4
        }
      }
    }
  }
}

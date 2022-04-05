import { Theme } from '@mui/material'

export const skeleton = (theme: Theme) => {
  // eslint-disable-next-line
  const skeletonPalette = theme.palette.skeleton!

  return {
    styleOverrides: {
      root: {
        background: skeletonPalette.bg,
        borderRadius: '6px',
        '&.MuiSkeleton-text': {},
        '&.MuiSkeleton-circular': {
          borderRadius: '20px'
        }
      }
    }
  }
}

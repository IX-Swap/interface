import { Theme } from '@mui/material'

export const slider = (theme: Theme) => {
  const sliderPalette = theme.palette.newSlider

  return {
    styleOverrides: {
      root: {
        '& .MuiSlider-rail': {
          background: sliderPalette.color,
          opacity: 1,
          height: 2
        },
        '& .MuiSlider-track': {
          height: 2,
          border: 'none'
        },
        '& .MuiSlider-thumb': {
          border: sliderPalette.border,

          '&:before': {
            boxShadow: 'none'
          },
          '&.Mui-focusVisible, &:hover': {
            boxShadow: sliderPalette.boxShadow
          },
          '&.Mui-disabled': {
            background: sliderPalette.disabledColor
          }
        },
        '& .MuiSlider-markLabel': {
          color: sliderPalette.label
        },
        '&.Mui-disabled .MuiSlider-markLabel': {
          color: sliderPalette.disabledLabel
        },
        '& .MuiSlider-thumbSizeMedium': {
          width: 24,
          height: 24
        },
        '& .MuiSlider-thumbSizeSmall': {
          width: 16,
          height: 16
        },
        '& .MuiSlider-mark': {
          width: 5,
          height: 5,
          borderRadius: '100%',
          background: sliderPalette.color,

          '&.MuiSlider-markActive': {
            background: sliderPalette.activeColor
          }
        }
      }
    }
  }
}

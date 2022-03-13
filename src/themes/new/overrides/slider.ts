import { Theme } from '@mui/material'

export const slider = (theme: Theme) => {
  const sliderPalette = theme.palette.slider

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
          border: theme.palette.slider.border,

          '&:before': {
            boxShadow: 'none'
          },
          '&.Mui-focusVisible, &:hover': {
            boxShadow: theme.palette.slider.boxShadow
          },
          '&.Mui-disabled': {
            background: sliderPalette.color
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

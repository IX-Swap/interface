import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => {
  const selectPalette = theme.palette.select

  return {
    wrapper: {
      marginTop: 0,
      borderRadius: 8,
      backgroundColor: selectPalette.bg,
      height: 49,
      '&:hover fieldset.MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.light
      },
      '& .MuiFormHelperText-root, & ~ .MuiFormHelperText-root': {
        marginLeft: 0,
        marginTop: 12
      },
      '&.Mui-focused': {
        backgroundColor: selectPalette.bg
      },

      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: selectPalette.border
      },

      '& svg': {
        fill: selectPalette.color
      },

      '&.Mui-disabled': {
        backgroundColor: selectPalette.bgDisabled,
        '& svg': {
          fill: selectPalette.colorDisabled
        }
      }
    },
    select: {
      '&.Mui-disabled': {
        '-webkit-text-fill-color': selectPalette.colorDisabled,
        color: 'rgb(119, 129, 148)',
        opacity: 0.7
      }
    },
    paper: {
      '&.MuiPaper-root': {
        padding: 0
      }
    },
    list: {
      padding: theme.spacing(1.25, 2.5)
    },
    placeholder: {
      color: selectPalette.placeholder
    }
  }
})

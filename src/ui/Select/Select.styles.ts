import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => {
  // eslint-disable-next-line
  const selectPalette = theme.palette.select!

  return {
    wrapper: {
      borderRadius: 8,
      backgroundColor: selectPalette.bg,

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
        '-webkit-text-fill-color': selectPalette.colorDisabled
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

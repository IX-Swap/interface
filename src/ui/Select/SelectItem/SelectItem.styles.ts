import makeStyles from '@mui/styles/makeStyles'
import InfoIcon from 'assets/icons/item-checked.svg'

export const useStyles = makeStyles(theme => {
  const selectPalette = theme.palette.select

  return {
    wrapper: {
      position: 'relative',
      padding: theme.spacing(2.25, 0.75),
      fontSize: 13,

      '&.MuiMenuItem-root': {
        backgroundColor: 'transparent',

        '&:hover': {
          color: theme.palette.primary.main
        }
      },
      '&:not(:last-of-type)': {
        borderBottom: `1px solid ${selectPalette.itemBorder}`
      },
      '&.Mui-selected': {
        '&::before': {
          content: '""',
          position: 'absolute',
          width: 14,
          height: 10,
          top: 'calc(50% - 5px)',
          right: 0,
          backgroundImage: `url(${InfoIcon})`
        }
      }
    },
    multiple: {
      '&.Mui-selected': {
        '&:hover': {
          '& .MuiCheckbox-root': {
            '& svg': {
              border: 'none'
            }
          }
        },

        '&::before': {
          content: 'none'
        }
      },

      '&:hover': {
        '& .MuiCheckbox-root': {
          '& svg': {
            border: `1px solid ${theme.palette.primary.light}`
          }
        }
      },
      '& .MuiCheckbox-root': {
        marginRight: theme.spacing(1.5),
        padding: theme.spacing(0)
      }
    }
  }
})

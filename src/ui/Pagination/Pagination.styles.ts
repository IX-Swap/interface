import makeStyles from '@mui/styles/makeStyles'
import InfoIcon from 'assets/icons/item-checked.svg'

export const useStyles = makeStyles(theme => {
  const paginationItemPalette = theme.palette.paginationItem
  const tablePaginationPalette = theme.palette.tablePagination

  return {
    wrapper: {
      borderBottom: 'none',

      '& svg': {
        width: 16,
        right: 5,
        fill: paginationItemPalette.color
      }
    },
    toolbar: {
      color: tablePaginationPalette.main
    },
    select: {
      color: tablePaginationPalette.selectColor,
      borderRadius: 8,

      '&:hover': {
        backgroundColor: tablePaginationPalette.selectHoverBg
      }
    },
    menuItem: {
      paddingLeft: 0,
      borderBottom: `1px solid ${tablePaginationPalette.menuItemBorder}`,
      color: tablePaginationPalette.menuItemColor,

      '&:first-of-type': {
        marginTop: -16
      },

      '&:last-of-type': {
        marginBottom: -16,
        borderBottom: 'none'
      },

      '&.Mui-selected': {
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          width: 14,
          height: '100%',
          right: 0,
          top: 0,
          backgroundImage: `url(${InfoIcon})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center'
        }
      }
    },
    actions: {
      marginLeft: theme.spacing(4),

      '& button': {
        '& svg': {
          fill: paginationItemPalette.color,
          width: 24,
          height: 24
        },
        '&:first-of-type': {
          marginRight: theme.spacing(0.75)
        }
      }
    },
    icon: {
      backgroundColor: 'red'
    },
    item: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: paginationItemPalette.bg,
      width: 30,
      height: 30,
      borderRadius: 8,
      color: paginationItemPalette.color,
      boxSizing: 'border-box',
      border: `1px solid ${paginationItemPalette.border}`,
      padding: 0,

      '& svg': {
        fill: paginationItemPalette.color
      },

      '&.Mui-selected': {
        backgroundColor: paginationItemPalette.bgActive,
        color: paginationItemPalette.colorActive,
        border: `1px solid ${paginationItemPalette.borderActive}`,

        '&:hover': {
          backgroundColor: paginationItemPalette.bgActive,
          color: paginationItemPalette.colorActive,
          border: `1px solid ${paginationItemPalette.borderActive}`
        }
      },

      '&.Mui-disabled': {
        backgroundColor: paginationItemPalette.bgDisabled,
        opacity: 1,
        border: `1px solid ${paginationItemPalette.borderDisabled}`,
        color: paginationItemPalette.colorDisabled,

        '& svg': {
          fill: paginationItemPalette.colorDisabled
        }
      },

      '&:hover': {
        color: paginationItemPalette.colorHover,
        backgroundColor: paginationItemPalette.bgHover,
        border: `1px solid ${paginationItemPalette.borderHover}`,

        '& svg': {
          fill: paginationItemPalette.colorHover
        }
      }
    }
  }
})

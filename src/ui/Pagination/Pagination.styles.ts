import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => {
  // eslint-disable-next-line
  const paginationItemPalette = theme.palette.paginationItem!

  return {
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

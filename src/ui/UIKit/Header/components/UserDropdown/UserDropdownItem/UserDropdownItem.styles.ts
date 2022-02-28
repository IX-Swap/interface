import makeStyles from '@mui/styles/makeStyles'

export const LIST_HORIZONTAL_PADDING = 24

export const useStyles = makeStyles(theme => ({
  wrapper: {
    marginLeft: -LIST_HORIZONTAL_PADDING,
    marginRight: -LIST_HORIZONTAL_PADDING,
    paddingLeft: LIST_HORIZONTAL_PADDING,
    paddingRight: LIST_HORIZONTAL_PADDING,
    paddingTop: LIST_HORIZONTAL_PADDING,
    paddingBottom: LIST_HORIZONTAL_PADDING,
    backgroundColor: theme.palette.background.paper,
    '&:last-child': {
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8
    },
    '&:hover': {
      '& svg': {
        fill: theme.palette.text.primary
      }
    }
  },
  iconWrapper: {
    justifyContent: 'flex-start'
  },
  icon: {
    width: 25,
    height: 25,
    fill:
      theme.palette.mode === 'light'
        ? '#D3D9E5'
        : theme.palette.primary.contrastText
  }
}))

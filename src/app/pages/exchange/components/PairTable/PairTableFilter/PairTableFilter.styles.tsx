import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  filterGroup: {},
  searchFilter: {
    minHeight: 30,
    height: 30
  },
  filterButton: {
    border: 'none',
    borderRadius: 0,
    height: 30,
    margin: '0 3px',
    width: 'auto',
    padding: '1px 6px',
    fontWeight: 400,
    '&.Mui-selected': {
      backgroundColor: theme.palette.divider,
      boxShadow: 'none',
      color: theme.palette.text.primary
    }
  },
  favoriteButton: {
    color: theme.palette.grey[600],
    '&.Mui-selected': {
      backgroundColor: 'transparent',
      boxShadow: 'none',
      color: '#F0D400',
      '&:hover': {
        backgroundColor: 'transparent'
      }
    },
    '&:hover': {
      backgroundColor: 'transparent'
    }
  }
}))

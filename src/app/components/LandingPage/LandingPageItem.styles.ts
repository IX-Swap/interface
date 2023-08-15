import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  container: {
    width: 200,
    height: 170,
    // marginLeft: 25,
    // marginRight: 25,
    // marginBottom: 25,
    padding: '30px 10px 0 10px',
    borderRadius: 14,
    // border: '1px solid black',
    '&:hover': {
      backgroundColor: theme.palette.paginationItem.borderHover,
      cursor: 'pointer'
    }
  },
  iconWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
    width: 64,
    height: 64,
    borderRadius: 9
  },
  label: {
    textAlign: 'center',
    fontWeight: 600
  }
}))

import makeStyles from '@mui/styles/makeStyles'

const importantPosition = '0!important'

export const useStyles = makeStyles(theme => {
  const getWidth = `calc(100% - 32px)`

  return {
    wrapper: {
      display: 'flex'
    },
    paper: {
      marginTop: importantPosition,
      padding: importantPosition,
      borderTopRightRadius: importantPosition,
      borderTopLeftRadius: importantPosition,
      top: '80px!important',
      boxShadow: `0px 80px 80px ${theme.palette.dropdownLink.boxShadow}`,
      border: `1px solid ${theme.palette.dropdownLink.border}!important`
    },
    list: { padding: 0 },
    navItem: {
      position: 'relative',
      minWidth: 266,
      height: 'max-content',
      padding: theme.spacing(0),

      '&:hover': {
        background: 'initial'
      }
    },
    line: {
      position: 'absolute',
      bottom: 0,
      height: 1,
      width: getWidth(),
      backgroundColor: theme.palette.dropdownLink.border,
      marginRight: theme.spacing(2),
      marginLeft: theme.spacing(2)
    }
  }
})

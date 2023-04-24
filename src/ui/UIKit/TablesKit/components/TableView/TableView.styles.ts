import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(theme => {
  // eslint-disable-next-line
  const tablePalette = theme.palette.table!

  return {
    toolbar: {
      backgroundColor: theme.palette.background.paper
    },
    headCell: {
      height: 70,
      boxSizing: 'border-box',
      fontSize: 13,
      //   whiteSpace: 'nowrap',
      backgroundColor: tablePalette.rowBg,
      borderBottom: `1px solid ${tablePalette.border}`,
      '&:first-of-type': {
        borderTopLeftRadius: 8
      },
      '&:last-of-type': {
        borderTopRightRadius: 8
      }
    },
    headText: {
      color: tablePalette.headerColor
    },
    checkbox: {
      color: '#ffffff'
    },
    paginationContainer: {
      marginTop: theme.spacing(1.5)
    },
    loading: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }
})

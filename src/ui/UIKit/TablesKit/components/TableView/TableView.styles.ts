import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(theme => {
  // eslint-disable-next-line
  const tablePalette = theme.palette.table!

  return {
    toolbar: {
      backgroundColor: theme.palette.background.paper
    },
    headCell: {
      borderBottom: 'none',
      height: 70,
      boxSizing: 'border-box',
      fontSize: 13,
      whiteSpace: 'nowrap',

      '&:first-of-type': {
        paddingLeft: 0
      }
    },
    headText: {
      color: tablePalette.color
    },
    checkbox: {
      color: '#ffffff'
    },
    pagination: {
      width: '100%',
      borderBottom: 'none'
    }
  }
})

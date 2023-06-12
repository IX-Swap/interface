import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  containerAvatar: {
    justifyContent: 'center',
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing()
    }
  },
  whiteBackground: {
    backgroundColor: theme.palette.background.paper,
    zIndex: 1,
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  userName: {
    display: 'flex',
    gap: 8
  },
  userStatusMargin: {
    marginTop: '52px'
  },
  verticalLine: {
    borderLeft: '2px solid #DBE2EC',
    height: '300px',
    marginRight: '50px'
  },
  enableChipText: {
    width: 'auto',
    color: '#6ABC10'
  },
  enableChipBackground: {
    border: '1px solid #7DD320',
    background: 'rgba(125, 211, 32, 0.2)'
  },
  pendingChipText: {
    width: 'auto',
    color: '#D3A701'
  },
  pendingChipBackground: {
    border: '1px solid #FFC900',
    background: 'rgba(255, 201, 0, 0.2)'
  },
  tabBarStyle: {
    backgroundColor: theme.palette.background.paper,
    padding: '10px 60px 0px 150px',
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  gridPadding: {
    padding: '0px 140px 30px 170px'
  },
  searchStyle: {
    display: 'flex',
    padding: '20px',
    backgroundColor: theme.palette.background.paper,
    marginBottom: '10px'
  }
}))

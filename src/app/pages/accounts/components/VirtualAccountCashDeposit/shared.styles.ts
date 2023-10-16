import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  paper: {
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    padding: theme.spacing(0, 4.75, 4)
  },
  instructions: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),
    border: '1px solid #DBE2EC',
    borderRadius: 8
  },
  accountId: {
    backgroundColor: theme.palette.stepIcon.bgActive,
    border: `1px solid ${theme.palette.stepIcon.borderActive}`,
    borderRadius: 8,
    color: theme.palette.stepIcon.colorActive,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(2)
  },
  copied: {
    backgroundColor: theme.palette.stepIcon.bgCompleted,
    border: `1px solid ${theme.palette.stepIcon.borderCompleted}`,
    color: theme.palette.success.main
  },
  footerInfo: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(1.5, 2),
    border: '1px solid #DBE2EC',
    borderRadius: 8
  },
  tabStyle: {
    '& .MuiButtonBase-root': {
      padding: 0
    },
    '& .Mui-selected': {
      color: theme.palette.dialog.color
    }
    // '& .MuiTabs-indicator': {
    //   maxWidth: 103
    // }
  },
  infoMessage: {
    marginBottom: '1rem'
  }
}))

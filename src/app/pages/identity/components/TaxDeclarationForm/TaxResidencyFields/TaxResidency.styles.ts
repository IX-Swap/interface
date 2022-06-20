import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  container: {
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '12px',
    gap: '12px',
    background: '#F7F9FA',
    borderRadius: '8px',
    flex: 'none',
    order: 2,
    flexGrow: 0,
    marginTop: 28,
    width: '48px',

    [theme.breakpoints.down('md')]: {
      width: 'auto'
    },

    '& svg': {
      width: '24px',
      height: '25px'
    }
  },
  divider: {
    border: '1px solid #EDF2FA',
    flex: 'none',
    order: 3,
    flexGrow: 0
  }
}))

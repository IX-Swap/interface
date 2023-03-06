import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  label: {
    color: theme.palette.mode === 'light' ? '#666666' : '#ffffff'
  },
  addressBlock: {
    color: theme.palette.primary.main,
    display: 'flex',
    gap: theme.spacing(1),
    alignItems: 'center',
    background: theme.palette.background.paper,
    // border: `1px solid ${theme.palette.primary.main}`,
    // borderRadius: theme.spacing(6),
    // padding: theme.spacing(0.25, 1.5),
    border: `1px solid #EDF2FA`,
    borderRadius: '10px',
    padding: theme.spacing(1.5, 2.5),
    textAlign: 'center',
    verticalAlign: 'middle',
    cursor: 'pointer'
  },
  chainLogo: {
    width: 17,
    height: 17
  }
}))

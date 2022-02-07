import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  disabledStatus: {
    height: 27,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 28px',
    border: `1px solid ${theme.palette.text.secondary}`,
    borderRadius: 4
  }
}))

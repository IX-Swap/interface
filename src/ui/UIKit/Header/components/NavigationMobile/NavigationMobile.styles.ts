import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    width: 292,
    boxShadow: `0px 80px 80px ${
      theme.palette.mode === 'light'
        ? 'rgba(162, 172, 191, 0.16)'
        : 'rgba(14, 31, 63, 0.3)'
    }`,
    border: `1px solid ${
      theme.palette.mode === 'light' ? '#EDF2FA' : '#1D3667'
    }`
  }
}))

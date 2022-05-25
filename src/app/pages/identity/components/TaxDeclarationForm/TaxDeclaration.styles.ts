import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(() => ({
  container: {
    boxSizing: 'border-box',

    /* Auto layout */

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: '16px',
    gap: '10px',

    width: 'auto',
    minHeight: '49px',

    background: 'rgba(76, 136, 255, 0.05)',
    border: '1px solid rgba(76, 136, 255, 0.3)',
    borderRadius: '8px'
  }
}))

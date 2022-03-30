import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  basicStyle: {
    fontFamily: 'Inter',
    opacity: theme.palette.chip?.opacity,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px 16px',
    width: '101px',
    height: '36px',
    background: theme.palette.chip?.bgBasic,
    borderRadius: '56px',
    color: theme.palette.chip?.color
  },
  specialStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px 16px',
    width: '49px',
    height: '36px',
    background: theme.palette.chip?.bgSpecial,
    border: '1px solid rgba(76, 136, 255, 0.2)',
    boxSizing: 'border-box',
    boxShadow: '0px 4px 4px rgba(162, 172, 191, 0.08)',
    borderRadius: '56px',
    color: '#4C88FF',
    fontFamily: 'Inter'
  },
  infoStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px 24px',
    width: '160px',
    height: '37px',
    borderRadius: '8px',
    fontFamily: 'Inter'
  },
  successStyle: {
    background: 'rgba(125, 211, 32, 0.15)',
    color: '#7DD320'
  },
  warningStyle: {
    background: 'rgba(255, 201, 0, 0.1)',
    color: '#FFC900'
  },
  errorStyle: {
    background: 'rgba(255, 128, 128, 0.1)',
    color: '#FF8080'
  },
  unknownStyle: {
    background: 'rgba(190, 196, 207, 0.15)',
    color: '#778194'
  }
}))

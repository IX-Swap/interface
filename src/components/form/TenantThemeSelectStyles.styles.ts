import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '15px',
    gap: theme.spacing(1.25)
  },
  button: {
    paddingTop: theme.spacing(2.25),
    paddingBottom: theme.spacing(2.25),
    borderRadius: 8,
    paddingLeft: theme.spacing(4),
    border: `2px solid ${theme.palette.select.itemBorder}`,
    cursor: 'pointer',

    '& svg': {
      display: 'none'
    }
  },
  active: {
    border: `2px solid ${theme.palette.primary.main}`
  }
}))

import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(theme => ({
  link: {
    display: 'block',
    padding: theme.spacing(1, 0),
    textTransform: 'uppercase',
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.primary.light
    }
  }
}))

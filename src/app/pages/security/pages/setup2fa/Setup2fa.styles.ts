import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  aside: {
    borderRight: `1px solid ${theme.palette.divider} `,
    paddingRight: theme.spacing(4),
    paddingBottom: theme.spacing(3)
  }
}))

import makeStyles from '@mui/styles/makeStyles'

export interface Props {
  isActive: boolean
}

export default makeStyles(theme => ({
  container: {
    margin: theme.spacing(0, 0, 1.875),
    alignItems: 'flex-start'
  },
  label: {
    fontSize: 14,
    lineHeight: 1.5,
    fontWeight: 400,
    marginTop: theme.spacing(0.75),
    textTransform: 'capitalize',
    color: ({ isActive }: Props) =>
      isActive
        ? theme.palette.text.primary
        : theme.palette.mode === 'light'
        ? theme.palette.text.secondary
        : theme.palette.divider
  }
}))

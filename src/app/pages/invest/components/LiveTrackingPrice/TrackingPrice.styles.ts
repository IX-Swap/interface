import makeStyles from '@mui/styles/makeStyles'

export interface Props {
  trend: 'up' | 'down'
}

export const useStyles = makeStyles(theme => ({
  root: { paddingLeft: 80, fontSize: 20, marginBottom: 20 },
  colorStyle: {
    color: (props: Props) =>
      props.trend === 'up'
        ? theme.palette.success.main
        : theme.palette.error.main
  },
  arrow: {
    fontSize: 20,
    marginTop: 2,
    marginBottom: 20
  }
}))

import makeStyles from '@mui/styles/makeStyles';

export interface Props {
  trend: 'up' | 'down'
}

export const useStyles = makeStyles(theme => ({
  root: { paddingLeft: 16, fontSize: 12 },
  colorStyle: {
    color: (props: Props) =>
      props.trend === 'up'
        ? theme.palette.success.main
        : theme.palette.error.main
  },
  arrow: {
    fontSize: 14,
    marginTop: 2
  }
}))

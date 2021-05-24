import { makeStyles } from '@material-ui/core/styles'

export interface Props {
  trend?: 'up' | 'down'
}

export const useStyles = makeStyles(theme => ({
  pairTableCell: {
    paddingTop: 1,
    paddingBottom: 1,
    paddingLeft: 0,
    borderBottom: `5px solid ${theme.palette.backgrounds.default as string}`,
    '&:last-child': {
      paddingRight: 0
    }
  },
  trendColor: {
    color: (props: Props) =>
      props.trend === 'up'
        ? theme.palette.success.main
        : theme.palette.error.main
  }
}))

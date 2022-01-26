import makeStyles from '@mui/styles/makeStyles';

export interface Props {
  isPositive?: boolean
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
      props.isPositive !== undefined
        ? props.isPositive
          ? theme.palette.success.main
          : theme.palette.error.main
        : theme.palette.text.primary
  }
}))

import makeStyles from '@mui/styles/makeStyles';

export interface StyleProps {
  isNegative: boolean
}

export const useStyles = makeStyles(theme => ({
  isNegativeColor: {
    color: ({ isNegative }: StyleProps) =>
      isNegative ? theme.palette.error.main : theme.palette.text.primary
  },
  boldText: {
    fontWeight: 600
  },
  detailsLink: {
    color: theme.palette.primary.main,
    fontWeight: 500,
    fontSize: 14,
    marginLeft: theme.spacing(4.5),

    '&:hover': {
      opacity: 0.7
    }
  }
}))

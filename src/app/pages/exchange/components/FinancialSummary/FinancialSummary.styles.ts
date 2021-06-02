import { makeStyles } from '@material-ui/core/styles'

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
  }
}))

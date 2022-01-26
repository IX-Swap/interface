import makeStyles from '@mui/styles/makeStyles';

export interface Props {
  transaction: 'buy' | 'sell'
}

export const useStyles = makeStyles(theme => ({
  tableCell: {
    paddingTop: 1,
    paddingBottom: 1,
    fontSize: 12,
    borderBottom: `5px solid transparent`,
    '&:first-child': {
      color: (props: Props) =>
        props.transaction === 'sell'
          ? theme.palette.error.main
          : theme.palette.success.main
    }
  }
}))

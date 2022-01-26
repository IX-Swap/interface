import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(theme => ({
  sideColor: {
    color: (props: any) =>
      props.side === 'BID'
        ? theme.palette.error.main
        : theme.palette.success.main
  }
}))

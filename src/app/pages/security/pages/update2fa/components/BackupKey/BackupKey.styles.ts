import makeStyles from '@mui/styles/makeStyles'

export interface Props {
  copied?: boolean
}

export default makeStyles(theme => ({
  container: {
    width: '100%',
    padding: theme.spacing(0, 0, 0, 2),
    borderRadius: 8,
    border: (props: Props) =>
      `1px solid ${
        props.copied !== undefined && props.copied
          ? 'rgba(125, 211, 32, 0.3)'
          : 'rgba(76, 136, 255, 0.3)'
      }`,
    background: (props: Props) =>
      props.copied !== undefined && props.copied
        ? 'rgba(125, 211, 32, 0.05)'
        : 'rgba(76, 136, 255, 0.05)'
  },
  key: {
    fontSize: 18,
    fontWeight: 600,

    [theme.breakpoints.down('md')]: {
      fontSize: 14
    }
  },
  copyButton: {
    padding: theme.spacing(2),
    display: 'block',
    color: (props: Props) =>
      props.copied !== undefined && props.copied
        ? theme.palette.success.main
        : theme.palette.info.main,
    cursor: 'pointer',

    '&:hover': {
      opacity: 0.7
    }
  }
}))

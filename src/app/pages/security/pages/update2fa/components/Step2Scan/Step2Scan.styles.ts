import makeStyles from '@mui/styles/makeStyles'

export interface Props {
  image?: string
  copied?: boolean
}

export default makeStyles(theme => ({
  wrapper: {
    width: '100%',
    maxWidth: 484
  },
  image: {
    height: '240px',
    width: '240px',
    padding: theme.spacing(6),
    margin: theme.spacing(5, 0),
    border: `1px solid ${theme.palette.otpInput.border}`,
    borderRadius: 32,
    backgroundImage: (props: Props) =>
      props.image !== undefined ? `url('${props.image}')` : '',
    backgroundPosition: 'center',
    backgroundSize: 'contain',
    backgroundOrigin: 'content-box',
    backgroundRepeat: 'no-repeat',
    boxShadow: '0px 32px 64px rgba(59, 66, 81, 0.08)'
  },
  keyBlock: {
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
    fontWeight: 600
  },
  text: {
    fontSize: 14,
    fontWeight: 400,
    opacity: 0.8,
    margin: theme.spacing(0, 0, 5)
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

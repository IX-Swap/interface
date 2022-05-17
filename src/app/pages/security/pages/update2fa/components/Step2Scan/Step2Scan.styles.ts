import makeStyles from '@mui/styles/makeStyles'

export interface Props {
  image?: string
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
  text: {
    fontSize: 14,
    fontWeight: 400,
    opacity: 0.8,
    margin: theme.spacing(0, 0, 5)
  },
  description: {
    margin: theme.spacing(2, 0, 0),
    fontWeight: 400,
    fontSize: 16,
    opacity: 0.8
  },
  contact: {
    fontWeight: 400,
    margin: theme.spacing(5, 0, 0)
  },
  contactText: {
    opacity: 0.8
  },
  link: {
    color: '#70a0ff',
    textDecoration: 'none'
  }
}))

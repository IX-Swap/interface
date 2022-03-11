import makeStyles from '@mui/styles/makeStyles'

export interface Props {
  image?: string
}

export default makeStyles(theme => ({
  image: {
    height: '124px',
    width: '124px',
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1.25),
    borderRadius: 6,
    backgroundImage: (props: Props) =>
      props.image !== undefined ? `url('${props.image}')` : '',
    backgroundPosition: 'center',
    backgroundSize: 'contain',
    backgroundOrigin: 'content-box',
    backgroundRepeat: 'no-repeat',
    boxShadow:
      'rgb(0 0 0 / 20%) 0px 3px 1px -2px, rgb(0 0 0 / 14%) 0px 2px 2px 0px, rgb(0 0 0 / 12%) 0px 1px 5px 0px'
  },
  key: {
    color:
      theme.palette.mode === 'light'
        ? theme.palette.text.primary
        : theme.palette.getContrastText('#F5EBEB'),
    marginTop: '1em',
    padding: theme.spacing(1.25, 3),
    fontSize: 18,
    fontWeight: 500,
    backgroundColor: '#F5EBEB',
    borderRadius: 3
  },
  text: {
    maxWidth: 512,
    fontSize: 18
  }
}))

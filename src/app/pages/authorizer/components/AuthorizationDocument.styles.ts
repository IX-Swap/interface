import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  container: {
    width: 170,
    height: 220,
    marginRight: theme.spacing(6),
    marginBottom: theme.spacing(3),
    position: 'relative',
    '&:hover': {
      '& $inner': {
        background: '#f7f7f7',
        cursor: 'pointer',
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        borderColor: theme.palette.grey[200]
      },
      '& $name': {
        whiteSpace: 'initial',
        overflow: 'visible'
      }
    }
  },
  inner: {
    padding: theme.spacing(2, 2, 3, 2),
    borderRadius: 12,
    border: '1px solid transparent',
    overflow: 'hidden'
  },
  innerSelected: {
    borderColor: '#86987D',
    background: '#f7f7f7'
  },
  image: {
    width: 100,
    height: 124,
    backgroundSize: 'cover',
    backgroundPosition: 'center center'
  },
  type: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  imageWrapper: {
    width: 100,
    height: 124,
    borderRadius: 6,
    overflow: 'hidden'
  },
  name: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    wordBreak: 'break-all'
  },
  loading: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'red'
  }
}))

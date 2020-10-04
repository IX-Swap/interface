import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  container: {
    position: 'relative',
    '&:hover': {
      '& $inner': {
        background: '#f7f7f7',
        cursor: 'pointer'
      },
      '& $toolbar': {
        visibility: 'visible'
      }
    }
  },
  inner: {
    padding: theme.spacing(4, 3, 2, 3),
    borderRadius: 12,
    border: '2px solid transparent'
  },
  innerSelected: {
    borderColor: '#86987D',
    background: '#f7f7f7'
  },
  toolbar: {
    visibility: 'hidden'
  },
  image: {
    width: 100,
    height: 'auto'
  }
}))

import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  container: {
    width: 170,
    marginRight: theme.spacing(6),
    marginBottom: theme.spacing(3),
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
    padding: theme.spacing(2, 2, 3, 2),
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
    // height: 124,
    // width: 'auto'
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
  }
}))

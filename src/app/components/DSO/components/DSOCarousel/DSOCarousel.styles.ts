import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(theme => ({
  root: {
    position: 'relative',
    maxWidth: '95vw',
    margin: '0 -12px',

    '& .carousel__dot-group': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },

    '& .carousel__dot': {
      display: 'block',
      width: '8px',
      height: '8px',
      borderRadius: '8px',
      background: '#eeeeee',
      padding: '0',
      border: 'none',
      margin: '0 6px',

      '&--selected': {
        background: '#dddddd'
      },

      [theme.breakpoints.up('md')]: {
        '&:nth-child(2n)': { display: 'none' }
      }
    }
  }
}))

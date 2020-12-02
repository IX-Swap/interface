import { makeStyles } from '@material-ui/core/styles'

export default (props: any) =>
  makeStyles(theme => ({
    root: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '52px',
      height: '52px',
      position: 'absolute',
      top: '50%',
      // Inspired from https://stackoverflow.com/a/21469557
      transform: 'translateY(-34px) translateY(-50%)',
      [props.position]: '-15px',

      '&:hover button': { opacity: 0.5 },

      '& button': {
        appearance: 'none',
        border: 'none',
        display: 'block',
        position: 'absolute',
        width: '52px',
        height: '52px',
        borderRadius: '52px',
        backgroundColor: '#000000',
        backdropFilter: 'blur(4px)',
        opacity: 0.3,

        '&:disabled': {
          display: 'none'
        }
      },

      '& img': {
        position: 'relative',
        zIndex: '1',
        top: '2px',
        [props.position]: '-2px'
      }
    }
  }))

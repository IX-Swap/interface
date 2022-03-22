import makeStyles from '@mui/styles/makeStyles'

export interface StyleProps {
  fullWidth: boolean
}

export const useStyles = makeStyles(theme => {
  return {
    wrapper: {
      display: 'flex'
    },
    message: {
      width: ({ fullWidth }: StyleProps) => (fullWidth ? 'auto' : 145),
      alignSelf: ({ fullWidth }: StyleProps) =>
        fullWidth ? 'center' : 'initial'
    },
    button: {
      marginRight: 14,
      marginLeft: 8,

      '&:first-of-type': {
        marginRight: 0,
        marginLeft: 14
      },

      '&:only-of-type': {
        marginRight: 14,
        marginLeft: 14
      }
    }
  }
})

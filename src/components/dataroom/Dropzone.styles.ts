import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  container: {
    borderRadius: 16,
    outline: 'none',
    backgroundColor: theme.palette.backgrounds.light,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.button?.bgTextHover
    },
    '& > div': {
      padding: 0
    }
  },
  acceptedImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  icon: {
    color: theme.palette.text.secondary
  },
  bigIcon: {
    width: 96,
    height: 64,
    color: '#AAAAAA'
  }
}))

import makeStyles from '@mui/styles/makeStyles'

export interface StyleProps {
  isError?: boolean
}

export const useStyles = makeStyles(theme => ({
  title: {
    fontWeight: 700,
    fontSize: 40,
    color: theme.palette.text.primary,
    textTransform: 'uppercase',
    fontFamily: 'Monument Extended, sans-serif'
  },
  question: {
    color: 'rgba(255, 255, 255, 0.5)'
  },
  link: {
    color: theme.palette.text.primary,
    textDecoration: 'none'
  },
  label: {
    display: 'block',
    maxWidth: 286,
    color: ({ isError }: StyleProps) =>
      isError !== undefined && isError ? '#FF8080' : 'rgba(255, 255, 255, 0.5)'
  },
  topBlock: {
    paddingBottom: '0!important'
  },
  bottomBlock: {
    paddingTop: '0!important'
  },
  support: {
    color: 'rgba(255, 255, 255, 0.5)',
    opacity: 0.6
  }
}))

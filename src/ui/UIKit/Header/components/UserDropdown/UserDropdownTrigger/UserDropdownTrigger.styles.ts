import makeStyles from '@mui/styles/makeStyles'

export interface Props {
  isOpen: boolean
}

export const useStyles = makeStyles(theme => ({
  button: {
    height: '100%',
    '&:hover': {
      background: 'initial',
      '& > div': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText
      }
    },
    borderRadius: 0,
    borderBottom: (props: Props) =>
      props.isOpen ? `1px solid ${theme.palette.primary.main}` : 'none'
  }
}))

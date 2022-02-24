import makeStyles from '@mui/styles/makeStyles'

export interface Props {
  isActive: boolean
}

export const useStyles = makeStyles(theme => ({
  wrapper: {
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(2.5),
    paddingRight: theme.spacing(2.5),
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    color: (props: Props) =>
      props.isActive
        ? theme.palette.text.primary
        : theme.palette.text.secondary,

    '&:hover': {
      '& p': {
        color: theme.palette.text.primary
      },
      '& svg': {
        '& path': {
          fill: theme.palette.text.primary
        }
      }
    },
    '& svg': {
      '& path': {
        fill: (props: Props) =>
          props.isActive
            ? theme.palette.text.primary
            : theme.palette.text.secondary
      }
    }
  }
}))

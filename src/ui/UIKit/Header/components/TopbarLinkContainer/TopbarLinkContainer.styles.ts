import makeStyles from '@mui/styles/makeStyles'

export interface Props {
  isActive: boolean
  disabled: boolean
  placement?: 'topbar' | 'dropdown' | 'mobileDropdown'
}

export const useStyles = makeStyles(theme => ({
  wrapper: {
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(2.5),
    paddingRight: theme.spacing(2.5),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    width: (props: Props) => (props.disabled ? 'auto' : '100%'),
    whiteSpace: 'nowrap',
    color: (props: Props) =>
      props.isActive
        ? theme.palette.text.primary
        : theme.palette.text.secondary,
    height: (props: Props) => (props.placement === 'topbar' ? 80 : 'initial'),
    borderBottom: (props: Props) =>
      props.isActive && props.placement === 'topbar'
        ? `1px solid ${theme.palette.primary.main}`
        : 'none',

    [theme.breakpoints.down('lg')]: {
      paddingLeft: theme.spacing(4),
      borderBottom: (props: Props) =>
        props.isActive && props.placement !== 'mobileDropdown'
          ? `1px solid ${theme.palette.primary.main}`
          : 'none'
    },

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

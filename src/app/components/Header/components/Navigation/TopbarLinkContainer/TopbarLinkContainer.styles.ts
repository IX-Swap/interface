import makeStyles from '@mui/styles/makeStyles'

export interface Props {
  isActive: boolean
  disabled: boolean
  placement?: 'topbar' | 'dropdown' | 'mobileDropdown'
}

export const useStyles = makeStyles(theme => {
  const getColor = (props: Props) => {
    return props.isActive
      ? theme.palette.navigationLink.activeColor
      : theme.palette.navigationLink.color
  }

  return {
    wrapper: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(2.5),
      paddingRight: theme.spacing(2.5),
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      width: (props: Props) => (props.disabled ? 'auto' : '100%'),
      height: (props: Props) => (props.placement === 'topbar' ? 80 : 'initial'),
      boxSizing: 'border-box',
      fill: getColor,
      color: getColor,
      whiteSpace: 'nowrap',
      textDecoration: 'none',
      borderTop: '1px solid transparent',
      borderBottom: (props: Props) =>
        `1px solid ${
          props.isActive && props.placement === 'topbar'
            ? theme.palette.primary.main
            : 'transparent'
        }`,
      '-webkit-tap-highlight-color': 'transparent',

      '&:hover': {
        color: theme.palette.navigationLink.activeColor,
        fill: theme.palette.navigationLink.activeColor
      },

      [theme.breakpoints.down('lg')]: {
        paddingLeft: theme.spacing(4),
        borderBottom: (props: Props) =>
          props.isActive && props.placement !== 'mobileDropdown'
            ? `1px solid ${theme.palette.primary.main}`
            : 'none'
      }
    },
    text: {
      color: 'inherit'
    },
    icon: {
      fill: 'inherit',
      '& path': {
        fill: 'inherit'
      }
    }
  }
})

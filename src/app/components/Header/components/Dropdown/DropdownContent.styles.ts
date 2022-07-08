import makeStyles from '@mui/styles/makeStyles'
import { DropdownProps } from 'app/components/Dropdown/Dropdown'

export interface Props {
  placement: DropdownProps['placement']
}

export const useStyles = makeStyles(theme => ({
  popper: {
    zIndex: 1500,
    right: (props: Props) =>
      props.placement === 'bottom-start' ? 'auto!important' : '0!important',
    left: (props: Props) =>
      props.placement === 'bottom-end' ? 'auto!important' : '0!important',
    transform: 'translate(0, 80px)!important',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    '& > div': {
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8,
      border:
        theme.palette.mode === 'light'
          ? `1px solid ${theme.palette.secondary.light}`
          : 'none',
      boxShadow:
        theme.palette.mode === 'light'
          ? '0px 80px 80px rgba(162, 172, 191, 0.16)!important'
          : 'none!important',
      overflow: 'hidden'
    }
  }
}))

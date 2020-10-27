import { themeColors } from 'v2/themes/default'
import { makeStyles } from '@material-ui/styles'

export const useStyles = makeStyles((theme: any) => ({
  authStatus: {
    border: '1px solid red',
    borderRadius: 4,
    display: 'flex',
    justifyContent: 'center',
    fontSize: '0.875rem',
    alignItems: 'center',
    height: 27,
    paddingLeft: 28,
    paddingRight: 28
  },
  compact: {
    width: 24,
    height: 24,
    padding: 0
  },
  approved: {
    color: '#0BBE12',
    borderColor: '#0BBE12'
  },
  rejected: {
    color: '#D20000',
    borderColor: '#D20000'
  },
  rejectedButton: {
    backgroundColor: themeColors.error
  },
  unauthorized: {
    color: '#666666',
    borderColor: '#666666'
  },
  viewColor: {
    color: '#DADADA'
  },
  moreColor: {
    color: '#C4C4C4'
  },
  filters: {
    backgroundColor: '#FAFAFA',
    paddingTop: '48px',
    minHeight: '500px',
    [theme.breakpoints.up('lg')]: {
      maxWidth: '300px'
    }
  },
  content: {
    padding: '48px',
    [theme.breakpoints.up('lg')]: {
      maxWidth: 'calc(100% - 300px)',
      flexGrow: 1
    }
  },
  popover: {
    backgroundColor: '#444444',
    color: '#DDDDDD',
    '&:before': {
      /* tricky doubly-quoted empty string so mui parses it as truly empty */
      content: '""',
      display: 'block',
      width: '0',
      height: '0',
      position: 'absolute',
      borderLeft: '10px solid transparent',
      borderRight: '10px solid transparent',
      /* border color should probably match whatever your tooltip color is */
      borderBottom: '10px solid #444444',
      left: 'calc(100% - 30px)',
      bottom: '100%'
    }
  },
  popoverDark: {
    color: '#DDDDDD'
  },
  popoverText: {
    minWidth: '100px'
  }
}))

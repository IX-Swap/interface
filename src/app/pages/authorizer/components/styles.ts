// import { themeColors } from 'themes/app/colors'
import makeStyles from '@mui/styles/makeStyles'

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
  authStatusNewTheme: {
    height: 28,
    borderRadius: 14,
    border: 'none',
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 12,
    display: 'inline-flex',
    fontWeight: 600,
    flexWrap: 'nowrap',
    whiteSpace: 'nowrap',
    textTransform: 'uppercase',
    backgroundColor: '#F8F8FD'
  },

  kycTheme: {
    height: 28,
    borderRadius: 14,
    border: 'none',
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 14,
    display: 'inline-flex',
    fontWeight: 600,
    flexWrap: 'nowrap',
    whiteSpace: 'nowrap',
    textTransform: 'capitalize',
    BorderColor: 'none',
    color: '#778194'
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
  approvedNewTheme: {
    color: '#8DCA82',
    backgroundColor: '#EEF7F1'
  },

  approvedNewKYCTheme: {
    BorderColor: 'none',
    color: '#778194'
  },
  open: {
    color: '#EEE4FF',
    borderColor: '#0BBE12'
  },
  openNewTheme: {
    color: '#6739B6',
    backgroundColor: '#EEE4FF'
  },
  unknown: {
    color: '#778194',
    borderColor: '#0BBE12'
  },
  unknownNewTheme: {
    color: '#696969',
    backgroundColor: '#F0F0F0'
  },
  rejected: {
    color: '#D20000',
    borderColor: '#D20000'
  },
  rejectedNewTheme: {
    color: '#D20000',
    backgroundColor: '#F4CECE'
  },
  rejectedButton: {
    // backgroundColor: themeColors.error,
    backgroundColor: '#F56283',
    color: '#ffffff',
    '&:hover': {
      //   backgroundColor: themeColors.error,
      backgroundColor: '#F56283',
      opacity: 0.8
    }
  },
  unauthorized: {
    color: '#666666',
    borderColor: '#666666'
  },
  unauthorizedNewTheme: {
    color: '#666666',
    backgroundColor: '#F0F0F0'
  },
  submittedNewTheme: {
    color: '#FF9700',
    backgroundColor: '#FFF2DE'
  },
  pending: {
    color: '#6739B6',
    borderColor: '#6739B6'
  },
  pendingNewTheme: {
    color: '#6739B6',
    backgroundColor: '#EEE4FF'
  },
  closed: {
    color: '#6739B6',
    borderColor: '#6739B6'
  },
  closedNewTheme: {
    color: '#666666',
    backgroundColor: '#F0F0F0'
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
  },
  popoverListItem: {
    '&:hover': {
      backgroundColor: '#555555'
    }
  }
}))

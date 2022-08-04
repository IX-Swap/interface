import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => {
  return {
    wrapper: {
      borderRadius: 8,
      padding: theme.spacing(3),
      boxSizing: 'border-box',

      '& .MuiFilledInput-root': {
        width: 'max-content',
        height: 'max-content!important',
        paddingRight: theme.spacing(1.5625),
        color: theme.palette.text.secondary,

        '&:hover': {
          backgroundColor: 'initial'
        },

        '&::before': {
          display: 'none'
        },

        '&::after': {
          display: 'none'
        }
      }
    },
    valueBlock: {
      fontSize: 24,
      fontWeight: 600,
      display: 'block',
      margin: '0 auto',
      textAlign: 'center'
    },
    valueNoSelect: {
      margin: '8px auto 0'
    },
    currency: {
      fontSize: 'inherit',
      fontWeight: 'inherit',
      display: 'inline',
      color: theme.palette.text.secondary
    },
    withoutBackground: {
      padding: 0,
      backgroundColor: 'none'
    },
    icon: {
      top: 12.5
    },
    iconOpen: {
      fill: '#4C88FF!important'
    },
    filled: {
      paddingTop: theme.spacing(1.25),
      paddingLeft: 0,
      '&:focus': {
        backgroundColor: 'initial'
      }
    },
    menuPaper: {
      minWidth: '120px!important',
      maxWidth: 120,
      marginLeft: theme.spacing(6.25),
      paddingTop: '8px!important',
      paddingBottom: '8px!important',
      marginTop: '0!important'
    },
    menuList: {
      padding: 0,

      '& .MuiMenuItem-root': {
        paddingTop: theme.spacing(1.5),
        paddingBottom: theme.spacing(1.5),
        '&:focus': {
          backgroundColor: 'initial'
        }
      }
    },
    button: {
      minWidth: 130,
      height: 40,

      [theme.breakpoints.up('sm')]: {
        height: 50
      }
    }
  }
})

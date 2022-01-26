import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(theme => {
  const activeColor = (active: any) =>
    active === 0
      ? theme.palette.backgrounds.alternative
      : theme.palette.error.light

  return {
    container: {
      backgroundColor:
        theme.palette.mode === 'light'
          ? theme.palette.backgrounds.alternativeLight
          : '#292929',
      paddingBottom: theme.spacing(3)
    },

    tab: {
      color: theme.palette.text.primary,
      minWidth: 80,
      '&.Mui-selected': {
        color: activeColor
      }
    },
    balanceWrapper: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(3),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    },
    indicator: {
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'transparent',
      '& > span': {
        maxWidth: theme.spacing(7),
        width: '100%',
        backgroundColor: activeColor
      }
    },
    buttonWrapper: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    },
    button: {
      width: '100%',
      backgroundColor: activeColor,
      '&:hover': {
        backgroundColor: activeColor,
        opacity: 0.7
      }
    }
  }
})

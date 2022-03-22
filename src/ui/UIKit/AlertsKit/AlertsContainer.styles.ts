import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => {
  // eslint-disable-next-line
  const alertsPalette = theme.palette.alerts!

  return {
    wrapper: {
      width: 'auto',

      '& .Toastify__toast': {
        minWidth: 320,
        marginLeft: 'auto',
        minHeight: 80,
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(2.5, 2.75),
        background: alertsPalette.bg,
        color: alertsPalette.color,
        border: `1px solid ${alertsPalette.border}`,
        borderRadius: 8,
        boxShadow: alertsPalette.boxShadow
      },

      '& .Toastify__toast-body': {
        minWidth: 224,
        padding: 0,
        fontFamily: 'Inter, sans-serif',
        fontSize: 13,
        fontWeight: 500
      },

      '& .Toastify__toast-icon': {
        marginRight: theme.spacing(2),
        width: 'auto'
      },

      '& .Toastify__progress-bar': {
        height: 2,
        opacity: 1,
        bottom: 2,
        zIndex: 2,
        borderRadius: 25,

        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: 2,
          backgroundColor: '#E6EBF3',
          zIndex: 1
        },

        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: 2,
          zIndex: 2,
          borderRadius: 25
        }
      },
      '& .Toastify__progress-bar--success': {
        '&::after': {
          background: theme.palette.warning.main
        }
      },
      '& .Toastify__progress-bar--error': {
        '&::after': {
          background: theme.palette.error.main
        }
      },
      '& .Toastify__progress-bar--info': {
        '&::after': {
          background: theme.palette.info.main
        }
      },
      '& .Toastify__progress-bar--warning': {
        '&::after': {
          background: theme.palette.warning.main
        }
      },
      '& .Toastify__close-button': {
        alignSelf: 'unset'
      }
    }
  }
})

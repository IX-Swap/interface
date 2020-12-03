import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme: Theme) =>
  createStyles({
    liveText: {
      // color: theme.palette.primary.main
      color: '#8995FC'
    },
    completedText: {
      // color: theme.palette.success.main
      color: '#5cc72a'
    },
    upcomingText: {
      // color: theme.palette.error.main
      color: '#eb9a05'
    },

    barColorPrimaryLive: {
      backgroundColor: '#8995FC'
    },
    barColorPrimaryCompleted: {
      backgroundColor: '#5cc72a'
    },
    barColorPrimaryUpcoming: {
      backgroundColor: '#eb9a05'
    },

    colorPrimaryLive: {
      // backgroundColor: '#ebf7ff'
      backgroundColor: '#cfe7f7'
    },
    colorPrimaryCompleted: {
      backgroundColor: '#cfe7f7'
    },
    colorPrimaryUpcoming: {
      backgroundColor: '#cfe7f7'
    }
  })
)

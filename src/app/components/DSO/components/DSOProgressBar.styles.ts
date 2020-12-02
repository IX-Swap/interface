import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme: Theme) =>
  createStyles({
    liveText: {
      color: theme.palette.primary.main
    },
    completedText: {
      color: theme.palette.success.main
    },
    errorText: {
      color: theme.palette.error.main
    },
    liveBg: {
      backgroundColor: theme.palette.primary.main
    },
    completedBg: {
      backgroundColor: theme.palette.success.main
    },
    errorBg: {
      backgroundColor: theme.palette.error.main
    }
  })
)

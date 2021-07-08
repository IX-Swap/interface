import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  previewHeader: {
    borderBottom: `1px solid ${theme.palette.grey[400]}`,
    paddingTop: 16,
    paddingBottom: 16,
    marginBottom: 24
  }
}))

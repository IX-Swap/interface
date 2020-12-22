import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(theme => ({
  barColorPrimary: { backgroundColor: ({ color }: { color: string }) => color },
  colorPrimary: { backgroundColor: '#ebf7ff' }
  // '#ebf7ff' or '#cfe7f7'
}))

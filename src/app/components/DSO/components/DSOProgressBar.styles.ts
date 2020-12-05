import { Theme, makeStyles } from '@material-ui/core/styles'

export default (color: string) => {
  return makeStyles((theme: Theme) => ({
    barColorPrimary: { backgroundColor: color },
    colorPrimary: { backgroundColor: '#ebf7ff' }
    // '#ebf7ff' or '#cfe7f7'
  }))()
}

import makeStyles from '@mui/styles/makeStyles';

export default makeStyles(theme => ({
  barColorPrimary: { backgroundColor: ({ color }: { color: string }) => color },
  colorPrimary: { backgroundColor: '#ebf7ff' }
  // '#ebf7ff' or '#cfe7f7'
}))

import makeStyles from '@mui/styles/makeStyles'
import { grey } from '@mui/material/colors'

const useStyles = makeStyles(() => ({
  pageTitle: {
    lineHeight: '2em'
  },
  listItemHeader: {
    fontWeight: 'bold',
    color: grey[900]
  },
  listItem: {
    // borderBottom: `1px solid ${grey[100]}`
  }
}))

export default useStyles

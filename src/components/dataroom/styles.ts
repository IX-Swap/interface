import { makeStyles } from '@material-ui/core/styles'
import { grey } from '@material-ui/core/colors'

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

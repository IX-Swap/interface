import { makeStyles } from '@material-ui/styles'
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
    borderBottom: `1px solid ${grey[100]}`,
    padding: '1.15em'
  }
}))

export default useStyles

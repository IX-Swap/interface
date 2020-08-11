//
import { makeStyles } from '@material-ui/styles'
import { grey } from '@material-ui/core/colors'

export default makeStyles(() => ({
  largeInputLabel: {
    fontSize: '1.25em'
  },
  largeInputValue: {
    fontSize: '1.8em'
  },
  smallInputLabel: {
    fontSize: '1em'
  },
  smallInputValue: {
    fontSize: '1.25em'
  },
  tokenSymbol: {
    width: '80px',
    marginLeft: '16px'
  },
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
  },
  launchDate: {
    width: '180px',
    marginLeft: '16px'
  },
  currency: {
    width: '125px',
    marginLeft: '16px'
  }
}))

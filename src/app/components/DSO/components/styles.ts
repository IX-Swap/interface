import makeStyles from '@mui/styles/makeStyles';
import { grey } from '@mui/material/colors'

export default makeStyles(theme => ({
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
  issuer: {
    marginLeft: '16px'
  },
  currency: {
    width: '125px',
    marginLeft: '16px'
  },
  newDSOViewHeaderStyles: {
    marginBottom: 50,
    paddingTop: 55,
    paddingLeft: 55,
    paddingRight: 55,
    paddingBottom: 60,
    backgroundColor: '#020071',
    borderRadius: 24,
    color: '#ffffff'
  },
  newDSOViewItemStyles: {
    borderRadius: 24,
    boxShadow: `0px 8px 32px ${
      theme.palette.mode === 'light'
        ? 'rgba(0, 0, 0, 0.08)'
        : 'rgba(255, 255, 255, 0.08)'
    }`,
    paddingTop: `${theme.spacing(3)}!important`,
    paddingLeft: `${theme.spacing(5.25)}!important`,
    paddingRight: `${theme.spacing(5.25)}!important`,
    paddingBottom: `${theme.spacing(4.25)}!important`
  }
}))

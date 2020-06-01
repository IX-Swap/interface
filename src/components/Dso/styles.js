// @flow
import { makeStyles } from '@material-ui/styles';
import { grey } from '@material-ui/core/colors';

export default makeStyles(() => ({
  largeInputLabel: {
    fontSize: '16px',
  },
  largeInputValue: {
    fontSize: '22px',
  },
  smallInputLabel: {
    fontSize: '12px',
  },
  smallInputValue: {
    fontSize: '16px',
  },
  tokenSymbol: {
    width: '80px',
    marginLeft: '16px',
  },
  pageTitle: {
    lineHeight: '2em',
  },
  listItemHeader: {
    fontWeight: 'bold',
    color: grey[900],
  },
  listItem: {
    borderBottom: `1px solid ${grey[100]}`,
    padding: '1.15em',
  },
}));

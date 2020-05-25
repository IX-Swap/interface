import { makeStyles } from '@material-ui/styles'
const defaultListItemStyle = {
  flex: 1,
  margin: 0,
  textAlign: 'left',
  fontSize: 11,
};
export default makeStyles(theme => ({
  overviewHeader: {
    marginBottom: theme.spacing.unit * 5,
  },
  stockTitle: {
    color: '#000',
    fontWeight: 600,
    fontSize: 25,
    marginBottom: theme.spacing.unit,
  },
  subTitle: {
    color: "#bcbcbc",
    fontSize: 16,
    fontWeight: 600,
  },
  priceTitle: {
    color: "#9c9c9c",
    fontSize: 14,
    fontWeight: 600,
    marginBottom: theme.spacing.unit * 1.5,
    textAlign: 'left',
  },
  price: {
    color: "#000",
    fontSize: 14,
    fontWeight: 600,
    textAlign: 'left',
  },
  monitoring: {
    backgroundColor: '#fff',
    boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
    marginBottom: theme.spacing.unit,
    padding: theme.spacing.unit,
  },
  monitoringTitle: {
    fontSize: 16,
    fontWeight: 600,
    margin: '10px 0',
  },
  monitoringHeader: {
    color: '#bcbcbc',
    display: 'flex',
    fontSize: 11,
    justifyContent: 'space-between',
    listStyle: 'none',
    margin: '0 0 12px',
    padding: 0,
  },
  monitoringList: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  monitoringListItem: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  defaultListItemStyle: {
    ...defaultListItemStyle,

    '&:last-child, &:nth-child(2)': {
      textAlign: 'right',
    }
  },
  positiveCell: {
    defaultListItemStyle,
    color: '#009806',
  },
  negativeCell: {
    ...defaultListItemStyle,
    color: '#D20000',
  },
  tableTitle: {
    color: "#000",
    fontSize: 21,
    fontWeight: 600,
    margin: '30px 0',
  },
}))

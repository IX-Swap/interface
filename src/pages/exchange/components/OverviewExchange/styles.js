import { makeStyles } from '@material-ui/styles'
const defaultListItemStyle = {
  flex: 1,
  margin: 0,
  textAlign: 'left',
  fontSize: 11,
  padding: '2px 0',
};

const bidsTitle = {
  alignItems: 'center',
  display: 'flex',
  fontSize: 14,
  fontWeight: 600,
  paddingLeft: 15,
}

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
    maxHeight: 380,
    overflow: 'hidden',
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
    margin: 0,
    padding: theme.spacing.unit,
  },
  bidsHeader: {
    background: '#f7f7f7',
    display: 'flex',
    padding: theme.spacing.unit,
  },
  maxBidsTitle: {
    ...bidsTitle,
    color: '#7DA532',
    fontSize: 18,
  },
  minBidsTitle: {
    ...bidsTitle,
    color: '#000',
  },
  monitoringList: {
    cursor: 'pointer',
    listStyle: 'none',
    margin: 0,
    padding: theme.spacing.unit,
  },
  monitoringListItem: {
    display: 'flex',
    justifyContent: 'space-between',

    '&:hover': {
      fontWeight: 600,
    }
  },
  defaultListItemStyle: {
    ...defaultListItemStyle,

    '&:last-child, &:nth-child(2)': {
      textAlign: 'right',
    }
  },
  positiveCell: {
    defaultListItemStyle,
    color: '#7DA532',
  },
  negativeCell: {
    ...defaultListItemStyle,
    color: '#D83070',
  },
  graphContainer: {
    height: 500,
    marginBottom: 30,
  },
}))

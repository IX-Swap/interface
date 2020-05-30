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
  overviewHeaderContent: {
    display: 'flex',
    alignItems: 'center',
  },
  overviewHeaderLink: {
    marginRight: 15,
    transition: 'all .3s ease-in-out',

    '&:hover': {
	    transform: 'translate(-5px)',
    }
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

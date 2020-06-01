import { makeStyles } from '@material-ui/styles'
const defaultListItemStyle = {
    alignItems: 'center',
    display: 'flex',
    fontSize: 11,
    margin: 0,
    padding: '2px 0',
    textAlign: 'left',
};

const bidsTitle = {
    alignItems: 'center',
    display: 'flex',
    fontSize: 14,
    fontWeight: 600,
    paddingLeft: 15,
};

const header = {
    color: '#bcbcbc',
    display: 'flex',
    fontSize: 11,
    listStyle: 'none',
    margin: 0,
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
    maxHeight: 380,
    overflow: 'scroll',
  },
  monitoringTitle: {
    fontSize: 16,
    fontWeight: 600,
    margin: '10px 0',
  },
  monitoringHeader: {
    ...header,
    justifyContent: 'space-between',
    padding: theme.spacing.unit,
  },
  marketHeader: {
    ...header,
    padding: '6px 0',
    borderBottom: '1px solid rgba(230, 230, 230)',
    justifyContent: 'space-around',
  },
  bidsHeader: {
    background: '#f7f7f7',
    display: 'flex',
    padding: theme.spacing.unit,
  },
  actionContainer: {
    alignItems: 'center',
    background: '#f7f7f7',
    display: 'flex',
    padding: '8px 6px',
  },
  actionBtn: {
    padding: '6px 7px',
    margin: '0 6px',

    '&:last-child': {
        marginLeft: 0,
    }
  },
  searchContainer: {
    padding: '6px 6px 0px',
  },
  searchInput: {
    width: '100%',
    padding: '8px 4px',
    border: '1px solid #d4d4d4',
    background: 'rgb(255, 255, 255)',
    outline: 0,
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
    minHeight: 400,
    maxHeight: 450,
    overflow: 'hidden',
    padding: theme.spacing.unit,
  },
  monitoringListItem: {
    display: 'flex',
    justifyContent: 'space-between',

    '&:hover': {
      fontWeight: 600,
    }
  },
  marketHeaderItem: {
      display: 'flex',
      alignItems: 'center',
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
  bidsAsksContainer: {
    display: 'flex',
    padding: 25,
  },
  formContainer: {
    borderRight: '1px solid #e6e6e6',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    paddingRight: 25,

    '&:last-child': {
      border: 0,
      paddingLeft: 25,
      paddingRight: 0,
    }
  },
  formHeader: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  formTitle: {
    fontSize: 12,
    fontWeight: 600,
  },
  inputContainer: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  inputField: {
    padding: '8px 4px',
    border: '1px solid #d4d4d4',
    fontSize: 12,
    outline: 0,
  },
  formButton: {
    fontWeight: 600,
    marginTop: 15,
  },
  sellButton: {
    backgroundColor: '#01A2FF',
  },
  formValue: {
    alignItems: 'center',
    display: 'flex',
  },
  availableBalance: {
    marginLeft: 5,
    marginRight: 5,
  },
}))

import { makeStyles } from '@material-ui/styles'

export default makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper
  },
  flexGrow: 1,
  paper: {
    border: '1px solid #e3e3e3',
    padding: 10
  },
  tableRow: {
    '&:hover': {
      backgroundColor: '#EFEFEF'
    },
    height: 10
  },
  lastTableRow: {
    borderTop: '2px solid gray'
  },
  market: {
    minWidth: 300
  },
  balance: {
    minWidth: 300
  },
  orders: {
    minWidth: 300
  },
  priceChart: {
    minWidth: 300
  },
  dilligence: {
    minWidth: 300
  },
  orderbook: {
    minWidth: 300
  },
  markets: {
    minWidth: 300
  },
  trades: {
    minWidth: 300
  },
  askButton: {
    width: 130,
    backgroundColor: '#C00808',
    color: 'white',
    '&:hover': {
      backgroundColor: '#C00838'
    }
  },
  bidButton: {
    width: 130,
    backgroundColor: '#166814',
    color: 'white',
    '&:hover': {
      backgroundColor: '#164814'
    }
  },
  textField: {
    height: 10,
    width: 50
  }
  // card: {
  //   minHeight: '100%',
  //   display: 'flex',
  //   flexDirection: 'column'
  // },
  // visitsNumberContainer: {
  //   display: 'flex',
  //   alignItems: 'center',
  //   flexGrow: 1,
  //   paddingBottom: theme.spacing(1)
  // },
  // progressSection: {
  //   marginBottom: theme.spacing(1)
  // },
  // progressTitle: {
  //   marginBottom: theme.spacing(2)
  // },
  // progress: {
  //   marginBottom: theme.spacing(1),
  //   backgroundColor: theme.palette.primary.main
  // },
  // pieChartLegendWrapper: {
  //   height: '100%',
  //   display: 'flex',
  //   flexDirection: 'column',
  //   justifyContent: 'center',
  //   marginRight: theme.spacing(1)
  // },
  // legendItemContainer: {
  //   display: 'flex',
  //   alignItems: 'center',
  //   marginBottom: theme.spacing(1)
  // },
  // fullHeightBody: {
  //   display: 'flex',
  //   flexGrow: 1,
  //   flexDirection: 'column',
  //   justifyContent: 'space-between'
  // },
  // tableWidget: {
  //   overflowX: 'auto'
  // },
  // progressBar: {
  //   backgroundColor: theme.palette.warning.main
  // },
  // performanceLegendWrapper: {
  //   display: 'flex',
  //   flexGrow: 1,
  //   alignItems: 'center',
  //   marginBottom: theme.spacing(1)
  // },
  // legendElement: {
  //   display: 'flex',
  //   alignItems: 'center',
  //   marginRight: theme.spacing(2)
  // },
  // legendElementText: {
  //   marginLeft: theme.spacing(1)
  // },
  // serverOverviewElement: {
  //   display: 'flex',
  //   alignItems: 'center',
  //   maxWidth: '100%'
  // },
  // serverOverviewElementText: {
  //   minWidth: 145,
  //   paddingRight: theme.spacing(2)
  // },
  // serverOverviewElementChartWrapper: {
  //   width: '100%'
  // },
  // mainChartBody: {
  //   overflowX: 'auto'
  // },
  // mainChartHeader: {
  //   width: '100%',
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'space-between',
  //   [theme.breakpoints.only('xs')]: {
  //     flexWrap: 'wrap'
  //   }
  // },
  // mainChartHeaderLabels: {
  //   display: 'flex',
  //   alignItems: 'center',
  //   [theme.breakpoints.only('xs')]: {
  //     order: 3,
  //     width: '100%',
  //     justifyContent: 'center',
  //     marginTop: theme.spacing(3),
  //     marginBottom: theme.spacing(2)
  //   }
  // },
  // mainChartHeaderLabel: {
  //   display: 'flex',
  //   alignItems: 'center',
  //   marginLeft: theme.spacing(3)
  // },
  // mainChartSelectRoot: {
  //   borderColor: theme.palette.text.hint + '80 !important'
  // },
  // mainChartSelect: {
  //   padding: 10,
  //   paddingRight: 25
  // },
  // mainChartLegentElement: {
  //   fontSize: '18px !important',
  //   marginLeft: theme.spacing(1)
  // }
}))

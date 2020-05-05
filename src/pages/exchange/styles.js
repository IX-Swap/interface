import { makeStyles } from '@material-ui/styles'

export default makeStyles(theme => ({
  // '@global': {
  //   // MUI typography elements use REMs, so you can scale the global
  //   // font size by setting the font-size on the <html> element.
  //   html: {
  //     fontSize: 16,
  //     [theme.breakpoints.up('sm')]: {
  //       fontSize: 18
  //     },
  //     [theme.breakpoints.up('md')]: {
  //       fontSize: 14
  //     },
  //     [theme.breakpoints.up('lg')]: {
  //       fontSize: 14
  //     }
  //   }
  // },
  root: {
    backgroundColor: theme.palette.background.paper
  },
  roundImage: {
    borderRadius: '50%'
  },
  flexGrow: 1,
  paper: {
    border: '1px solid #e3e3e3'
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
  }
}))

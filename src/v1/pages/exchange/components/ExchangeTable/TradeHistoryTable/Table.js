import React, { useRef, useEffect, useState } from 'react'
import moment from 'moment'
import classNames from 'classnames'
import { withRouter, useHistory } from 'react-router-dom'

// Material Components
import {
  Grid,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
  LinearProgress
} from '@material-ui/core'

// Date Utils
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import Utils, { numberWithCommas } from 'v1/utils/utils'

// Local component
import DateFilter from 'v1/pages/exchange/components/ExchangeTable/DateFilter'
import DropdownFilter from 'v1/pages/exchange/components/ExchangeTable/DropdownFilter'
import SandboxModal from '../../TradingTerminal/components/SandboxModal'

// Styles
import useStyles from 'v1/pages/exchange/components/ExchangeTable/styles'

// Trade History Modules
import TradeHistoryActions from './modules/actions'
import TradeHistoryModules from './modules'

// Market Modules
import MarketActions from '../../TradingTerminal/modules/actions'
import MarketModules from '../../TradingTerminal/modules'

const {
  TradeHistoryListState,
  useTradeHistoryListDispatch
} = TradeHistoryModules

const { setPage, setRowsPerPage } = TradeHistoryActions

const { MarketState, useMarketDispatch } = MarketModules

const columns = [
  {
    id: 'date',
    label: 'Date'
  },
  {
    id: 'pair',
    label: 'Pair'
  },
  {
    id: 'side',
    label: 'Side'
  },
  {
    id: 'price',
    label: 'Price'
  },
  {
    id: 'filled',
    label: 'Filled'
  },
  {
    id: 'fee',
    label: 'Fee'
  },
  {
    id: 'total',
    label: 'Total'
  }
]

const ListingsList = ({ list, goToPage }) => {
  const classes = useStyles()

  return (
    <TableBody>
      {list.map((row, i) => {
        const positiveCell = row.side?.toLowerCase() === 'buy'

        return (
          <TableRow key={i}>
            <TableCell className={classes.defaultCell}>
              {moment(row.date).format('DD/MM/YYYY HH:mm')}
            </TableCell>
            <TableCell className={classes.defaultCell}>{row.pair}</TableCell>
            {positiveCell ? (
              <TableCell className={classes.positiveCell}>Buy</TableCell>
            ) : (
              <TableCell className={classes.negativeCell}>Sell</TableCell>
            )}
            <TableCell className={classes.defaultCell}>
              {numberWithCommas(row.price.toFixed(2))}
            </TableCell>
            <TableCell className={classes.defaultCell}>
              {row.filled?.toFixed(4)}
            </TableCell>
            <TableCell className={classes.defaultCell}>
              {numberWithCommas(row.fee.toFixed(6))}
            </TableCell>
            <TableCell className={classes.defaultCell}>
              {numberWithCommas(row.total.toFixed(6))}
            </TableCell>
          </TableRow>
        )
      })}
      {list.length === 0 && (
        <TableRow>
          <TableCell className={classes.defaultCell}>
            No available data...
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  )
}

function TradeHistoryTable (props) {
  const [fromDate, setFrom] = useState('')
  const [toDate, setTo] = useState('')
  const [pairId, setPair] = useState('')
  const [side, setSide] = useState('')
  const { title } = props
  const classes = useStyles()
  const history = useHistory()

  const dispatch = useTradeHistoryListDispatch()
  const tradeHistoryState = TradeHistoryListState()

  const marketDispatch = useMarketDispatch()
  const marketState = MarketState()
  const mountedRef = useRef(true)
  const { page, total, limit, items, status } = tradeHistoryState

  const {
    page: marketPage,
    limit: marketLimit,
    items: marketItems
  } = marketState

  const handleChangePage = (_, newPage: number) => {
    setPage(dispatch, { page: newPage })
  }

  const handleChangeRowsPerPage = (newRows: number) => {
    setRowsPerPage(dispatch, { rows: newRows })
    setPage(dispatch, { page: 0 })
  }

  useEffect(() => {
    MarketActions.getMarketList(marketDispatch, {
      skip: marketPage * marketLimit,
      limit,
      ref: mountedRef
    })
  }, [marketPage, marketLimit, marketDispatch, limit])

  const _searchTradeHistory = () => {
    TradeHistoryActions.getTradeHistory(dispatch, {
      skip: page * limit,
      limit,
      from: fromDate || new Date(),
      to: toDate || new Date(),
      pair: pairId,
      side,
      ref: mountedRef
    })
  }

  const searchStyle = classNames(classes.btnStyle, classes.searchStyle)

  const resetStyle = classNames(classes.btnStyle, classes.resetStyle)

  const isVisitedPage = Utils.isVisited(history.location.pathname)

  return (
    <Grid>
      {!isVisitedPage && <SandboxModal />}
      <Typography className={classes.title} variant='h1'>
        {title}
      </Typography>
      <Grid className={classes.componentStyle}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <section className={classes.filterContainer}>
            <DateFilter
              setFrom={fromDate => setFrom(fromDate)}
              setTo={toDate => setTo(toDate)}
            />
            <DropdownFilter
              items={marketItems}
              setPair={pairId => setPair(pairId)}
              setSide={side => setSide(side)}
            />
            <section className={classes.buttonFilter}>
              <Button
                color='primary'
                className={searchStyle}
                onClick={_searchTradeHistory}
              >
                Search
              </Button>
              <Button color='primary' className={resetStyle}>
                Reset
              </Button>
            </section>
          </section>
        </MuiPickersUtilsProvider>
        <TableContainer component={Paper}>
          {status === 'GETTING' && <LinearProgress />}
          <Table aria-label='ordres table'>
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <TableCell className={classes.tableHeader} key={column.id}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <ListingsList list={items} />
            {total && status === 'IDLE' && (
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    count={total}
                    rowsPerPage={limit}
                    page={page}
                    onChangeRowsPerPage={(
                      evt: SyntheticInputEvent<HTMLElement>
                    ) => handleChangeRowsPerPage(parseInt(evt.target.value))}
                    onChangePage={handleChangePage}
                  />
                </TableRow>
              </TableFooter>
            )}
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  )
}

export default withRouter(TradeHistoryTable)

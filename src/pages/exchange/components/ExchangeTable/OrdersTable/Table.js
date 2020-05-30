import React, { useRef, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

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
} from '@material-ui/core';

// Date Utils
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

// Local component
import DateFilter from 'pages/exchange/components/ExchangeTable/DateFilter';
import DropdownFilter from 'pages/exchange/components/ExchangeTable/DropdownFilter';

// Styles
import useStyles from 'pages/exchange/components/ExchangeTable/styles';

// Orders Modules
import OrdersActions from './modules/actions';
import OrdersModule from './modules';

// Market Modules
import MarketActions from '../../OverviewExchange/modules/actions';
import MarketModules from '../../OverviewExchange/modules';

const {
    OrdersListState,
    useOrdersListDispatch,
} = OrdersModule;

const {
    setPage,
    setRowsPerPage,
} = OrdersActions;

const {
    MarketState,
    useMarketDispatch,
} = MarketModules;

const columns = [
    {
        id: 'date', 
        label: 'Date',
    },
    {
        id: 'pair', 
        label: 'Pair',
    },
    {
        id: 'type', 
        label: 'Type',
    },
    {
        id: 'side', 
        label: 'Side',
    },
    {
        id: 'average', 
        label: 'Average',
    },
    {
        id: 'price', 
        label: 'Price',
    },
    {
        id: 'filled', 
        label: 'Filled',
    },
    {
        id: 'amount', 
        label: 'Amount',
    },
    {
        id: 'total', 
        label: 'Total',
    },
    {
        id: 'triggerConditions', 
        label: 'Trigger Conditions',
    },
    {
        id: 'status', 
        label: 'Status',
    },
];

const ListingsList = ({
    list,
    goToPage,
  }) => {
    const classes = useStyles();

    return (
        <TableBody>
            {list.map((row, i) => {
                return (
                    <TableRow key={i}>
                        <TableCell className={classes.defaultCell}>
                            {row && row.listing && row.listing.createdAt}
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
};

function OrdersTable(props) {
    const [fromDate, setFrom] = useState('');
    const [toDate, setTo] = useState('');
    const [pairId, setPair] = useState('');
    const [side, setSide] = useState('');
    const { title } = props;
    const classes = useStyles();

    const dispatch = useOrdersListDispatch();
    const ordersState = OrdersListState();

    const marketDispatch = useMarketDispatch();
    const marketState = MarketState();
    const mountedRef = useRef(true);
    const {
        page,
        total,
        limit,
        items,
    } = ordersState;

    const {
        page: marketPage,
        limit: marketLimit,
        items: marketItems,
    } = marketState;

    const handleChangePage = (_, newPage: number) => {
        setPage(dispatch, { page: newPage });
    };

    const handleChangeRowsPerPage = (newRows: number) => {
        setRowsPerPage(dispatch, { rows: newRows });
        setPage(dispatch, { page: 0 });
    };

    useEffect(() => {
        MarketActions.getMarketList(marketDispatch, {
            skip: marketPage * marketLimit,
            limit,
            ref: mountedRef,
        });
    }, [marketPage, marketLimit, marketDispatch]);

    const _searchOrders = () => {
        OrdersActions.getOrdersList(dispatch, {
            skip: page * limit,
            limit,
            from: fromDate || new Date(),
            to: toDate || new Date(),
            pair: pairId,
            side,
            ref: mountedRef,
        });
    };

    return (
        <Grid>
            <Typography 
                className={classes.title} 
                variant="h1"
            >
                {title}
            </Typography>
            <Grid className={classes.componentStyle}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <section className={classes.filterContainer}>
                        <DateFilter 
                            setFrom={(fromDate) => setFrom(fromDate)}
                            setTo={(toDate) => setTo(toDate)}
                        />
                        <DropdownFilter 
                            items={marketItems} 
                            setPair={(pairId) => setPair(pairId)}
                            setSide={(side) => setSide(side)}
                        />
                        <section className={classes.buttonFilter}>
                            <Button 
                                variant="outlined" 
                                color="primary"
                                className={classes.btnStyle}
                                onClick={_searchOrders}
                            >
                                Search
                            </Button>
                            <Button 
                                variant="contained"
                                className={classes.btnStyle}
                            >
                                Reset
                            </Button>
                        </section>
                    </section>
                </MuiPickersUtilsProvider>
                <TableContainer component={Paper}>
                    <Table aria-label="ordres table">    
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell 
                                        className={classes.tableHeader}
                                        key={column.id}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <ListingsList list={items} />
                        {total && (
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

export default withRouter(OrdersTable)

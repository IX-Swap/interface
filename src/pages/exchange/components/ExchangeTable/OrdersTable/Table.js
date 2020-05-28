import React, { useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';

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

// Styles
import useStyles from 'pages/exchange/components/ExchangeTable/styles';

// Modules
import OrdersActions from './modules/actions';
import OrdersModule from './modules';

const {
    OrdersListState,
    useOrdersListDispatch,
} = OrdersModule;

const {
    setPage,
    setRowsPerPage,
} = OrdersActions;

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
                            {row.name}
                        </TableCell>
                        <TableCell className={classes.defaultCell}>
                            {row.asset.name}
                        </TableCell>
                        <TableCell className={classes.defaultCell}>
                            {row.companyName}
                        </TableCell>
                        <TableCell className={classes.defaultCell}>
                            <Button href="#text-buttons" color="primary">
                                <Link
                                    className={classes.tableLink}
                                    to='listings-view'
                                >
                                    View
                                </Link>
                            </Button>
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
    const { title } = props;
    const classes = useStyles();

    const dispatch = useOrdersListDispatch();
    const ordersState = OrdersListState();

    const {
        page,
        total,
        limit,
        items,
    } = ordersState;

    const handleChangePage = (_, newPage: number) => {
        setPage(dispatch, { page: newPage });
    };

    const handleChangeRowsPerPage = (newRows: number) => {
        setRowsPerPage(dispatch, { rows: newRows });
        setPage(dispatch, { page: 0 });
    };

    useEffect(() => {
        OrdersActions.getOrdersList(dispatch, {
            pair: '5ecb739f1f3e88614b36ddcb',
            side: 'BID',
            type: 'LIMIT',
            price: 100,
            amount: 0,
        });
    }, [page, limit, dispatch]);
    
    return (
        <Grid>
            <Typography 
                className={classes.title} 
                variant="h1"
            >
                {title}
            </Typography>
            <Grid className={classes.componentStyle}>
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

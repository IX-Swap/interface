import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter, useHistory } from 'react-router-dom';

// Material Components
import { 
    Grid, 
    Typography,
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

// Utils
import TableUtils from 'pages/exchange/utils';

// Styles
import useStyles from 'pages/exchange/components/ExchangeTable/styles';

// Modules
import MarketActions from '../../OverviewExchange/modules/actions';
import MarketModules from '../../OverviewExchange/modules';

const {
    MarketState,
    useMarketDispatch,
} = MarketModules;

const {
    setPage,
    setRowsPerPage,
} = MarketActions;

const columns = [
    {
        id: 'pair', 
        label: 'Pair',
    },
    {
        id: 'name', 
        label: 'Name',
    },
    {
        id: 'lastPrice', 
        label: 'Last Price',
    },
    {
        id: 'change', 
        label: '24h Change',
    },
    {
        id: 'high', 
        label: '24h High',
    },
    {
        id: 'low', 
        label: '24h Low',
    },
    {
        id: 'volume', 
        label: '24h Volume',
    },
];

const MarketList = ({
    list,
    goToPage,
  }) => {
    const classes = useStyles();

    return (
        <TableBody>
            {list.map((row, i) => {
                const positiveCell = TableUtils.ifFirstCharEqualsToValue('0', '+');
                const { name } = row.listing;
                return (
                    <TableRow 
                        key={i} 
                        className={classes.tableRowHover}
                        onClick={() => goToPage(row._id)}
                    >
                        <TableCell className={classes.defaultCell}>
                            {row.name}
                        </TableCell>
                        <TableCell className={classes.defaultCell}>
                            {name}
                        </TableCell>
                        <TableCell className={classes.defaultCell}>
                            {row.price || 0}
                        </TableCell>
                        {positiveCell ?
                            <TableCell className={classes.positiveCell}>
                                {row.change || 0}
                            </TableCell>
                            :
                            <TableCell className={classes.negativeCell}>
                                {row.change || 0}
                            </TableCell>
                        }
                        <TableCell className={classes.defaultCell}>
                            {row.high || 0}
                        </TableCell>
                        <TableCell className={classes.defaultCell}>
                            {row.low || 0}
                        </TableCell>
                        <TableCell className={classes.defaultCell}>
                            {row.volume || 0}
                        </TableCell>
                    </TableRow>
                )
            })}
        </TableBody>
    )
};

function ExchangeTable(props) {
    const { title } = props;
    
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useMarketDispatch();
    const marketState = MarketState();
    const mountedRef = useRef(true);
    const {
        page,
        total,
        limit,
        items,
    } = marketState;

    useEffect(() => {
        MarketActions.getMarketList(dispatch, {
            skip: page * limit,
            limit,
            ref: mountedRef,
        });
    }, [page, limit, dispatch]);

    const handleChangePage = (_, newPage: number) => {
        setPage(dispatch, { page: newPage });
    };

    const handleChangeRowsPerPage = (newRows: number) => {
        setRowsPerPage(dispatch, { rows: newRows });
        setPage(dispatch, { page: 0 });
    };

    // Go to overview exchange for the Market List Item
    const goToPage = id => {
        history.push(`/market-list/${id}`);
    }
    
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
                    <Table aria-label="Market Lists">    
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
                        <MarketList list={items} goToPage={(id) => goToPage(id)}/>
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

ExchangeTable.propTypes = {
    title: PropTypes.string.isRequired,
    withFilter: PropTypes.bool,
};

ExchangeTable.defaultProps = {
    title: 'Title',
    withFilter: true,
}

export default withRouter(ExchangeTable)

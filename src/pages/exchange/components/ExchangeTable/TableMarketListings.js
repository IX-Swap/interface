import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

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

// Local component
import Pagination from 'pages/exchange/components/ExchangeTable/Pagination';

// Styles
import useStyles from 'pages/exchange/components/ExchangeTable/styles';

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
        id: 'marketCap', 
        label: 'Market Cap',
    },
    {
        id: 'volume', 
        label: '24h Volume',
    },
];

function createData(pair, name, lastPrice, change, high, low, marketCap, volume) {
    return { pair, name, lastPrice, change, high, low, marketCap, volume };
}
  
const rows = [
    createData('IXPS/SGD', 'InvestaX', '$1,234,50', '+247.00', 0.6282, 0.0000039, '$37.45M',  4679.80,),
    createData('IXPS/SGD', 'InvestaX', '$1,234,50', '+247.00', 0.6282, 0.0000039, '$37.45M',  4679.80,),
    createData('IXPS/SGD', 'InvestaX', '$1,234,50', '+247.00', 0.6282, 0.0000039, '$37.45M',  4679.80,),
    createData('IXPS/SGD', 'InvestaX', '$1,234,50', '+247.00', 0.6282, 0.0000039, '$37.45M',  4679.80,),
    createData('IXPS/SGD', 'InvestaX', '$1,234,50', '+247.00', 0.6282, 0.0000039, '$37.45M',  4679.80,),
    createData('IXPS/SGD', 'InvestaX', '$1,234,50', '-247.00', 0.6282, 0.0000039, '$37.45M',  4679.80,),
    createData('IXPS/SGD', 'InvestaX', '$1,234,50', '-247.00', 0.6282, 0.0000039, '$37.45M',  4679.80,),
    createData('IXPS/SGD', 'InvestaX', '$1,234,50', '-247.00', 0.6282, 0.0000039, '$37.45M',  4679.80,),
    createData('IXPS/SGD', 'InvestaX', '$1,234,50', '-247.00', 0.6282, 0.0000039, '$37.45M',  4679.80,),
    createData('IXPS/SGD', 'InvestaX', '$1,234,50', '-247.00', 0.6282, 0.0000039, '$37.45M',  4679.80,),
    createData('IXPS/SGD', 'InvestaX', '$1,234,50', '-247.00', 0.6282, 0.0000039, '$37.45M',  4679.80,),
    createData('IXPS/SGD', 'InvestaX', '$1,234,50', '-247.00', 0.6282, 0.0000039, '$37.45M',  4679.80,),
];

function ExchangeTable(props) {
    const { title } = props;
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
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
                <TableContainer component={Paper}>
                    <Table aria-label="custom pagination table">    
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
                        <TableBody>
                            {(rowsPerPage > 0 ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : rows).map((row, i) => {
                                    const positiveCell = TableUtils.ifFirstCharEqualsToValue(row.change, '+');

                                    return (
                                        <TableRow key={i}>
                                            <TableCell className={classes.defaultCell}>
                                                {row.pair}
                                            </TableCell>
                                            <TableCell className={classes.defaultCell}>
                                                {row.name}
                                            </TableCell>
                                            <TableCell className={classes.defaultCell}>
                                                {row.lastPrice}
                                            </TableCell>
                                            {positiveCell ?
                                                <TableCell className={classes.positiveCell}>
                                                    {row.change}
                                                </TableCell>
                                                :
                                                <TableCell className={classes.negativeCell}>
                                                    {row.change}
                                                </TableCell>
                                            }
                                            <TableCell className={classes.defaultCell}>
                                                {row.high}
                                            </TableCell>
                                            <TableCell className={classes.defaultCell}>
                                                {row.low}
                                            </TableCell>
                                            <TableCell className={classes.defaultCell}>
                                                {row.marketCap}
                                            </TableCell>
                                            <TableCell className={classes.defaultCell}>
                                                {row.volume}
                                            </TableCell>
                                        </TableRow>
                                    )
                            })}

                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                    count={rows.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    SelectProps={{
                                    inputProps: { 'aria-label': 'rows per page' },
                                    native: true,
                                    }}
                                    onChangePage={handleChangePage}
                                    onChangeRowsPerPage={handleChangeRowsPerPage}
                                    ActionsComponent={Pagination}
                                />
                            </TableRow>
                        </TableFooter>
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

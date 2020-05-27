import React from 'react'
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
import Button from '@material-ui/core/Button';

// Date Utils
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

// Local component
import DateFilter from 'pages/exchange/components/ExchangeTable/DateFilter';
import DropdownFilter from 'pages/exchange/components/ExchangeTable/DropdownFilter';
import Pagination from 'pages/exchange/components/ExchangeTable/Pagination';

// Styles
import useStyles from 'pages/exchange/components/ExchangeTable/styles';

import { putRequest } from 'services/httpRequests';

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
        id: 'side', 
        label: 'Side',
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
        id: 'fee', 
        label: 'Fee',
    },
    {
        id: 'total', 
        label: 'Total',
    },

];

function createData(date, pair, side, price, filled, fee, total) {
    return { date, pair, side, price, filled, fee, total };
}
  
const rows = [
    createData('04/01/20 07:04', 'IXPS/SGD', 'Sell', 247.00, 0.6282, '0.16892444 - SGD', '168.12345667 - SGD'),
    createData('04/01/20 07:04', 'IXPS/SGD', 'Buy', 247.00, 0.6282, '0.16892444 - SGD', '168.12345667 - SGD'),
    createData('04/01/20 07:04', 'IXPS/SGD', 'Buy', 247.00, 0.6282, '0.16892444 - SGD', '168.12345667 - SGD'),
    createData('04/01/20 07:04', 'IXPS/SGD', 'Sell', 247.00, 0.6282, '0.16892444 - SGD', '168.12345667 - SGD'),
    createData('04/01/20 07:04', 'IXPS/SGD', 'Sell', 247.00, 0.6282, '0.16892444 - SGD', '168.12345667 - SGD'),
    createData('04/01/20 07:04', 'IXPS/SGD', 'Sell', 247.00, 0.6282, '0.16892444 - SGD', '168.12345667 - SGD'),
    createData('04/01/20 07:04', 'IXPS/SGD', 'Sell', 247.00, 0.6282, '0.16892444 - SGD', '168.12345667 - SGD'),
    createData('04/01/20 07:04', 'IXPS/SGD', 'Buy', 247.00, 0.6282, '0.16892444 - SGD', '168.12345667 - SGD'),
    createData('04/01/20 07:04', 'IXPS/SGD', 'Sell', 247.00, 0.6282, '0.16892444 - SGD', '168.12345667 - SGD'),
    createData('04/01/20 07:04', 'IXPS/SGD', 'Sell', 247.00, 0.6282, '0.16892444 - SGD', '168.12345667 - SGD'),
    createData('04/01/20 07:04', 'IXPS/SGD', 'Sell', 247.00, 0.6282, '0.16892444 - SGD', '168.12345667 - SGD'),
    createData('04/01/20 07:04', 'IXPS/SGD', 'Sell', 247.00, 0.6282, '0.16892444 - SGD', '168.12345667 - SGD'),
];

async function addListing(payload) {
    try {
      const uri = `/exchange/markets/list`;
      const result = await putRequest(uri, payload);
      const response = await result.json();

      console.log('reponse', response);
  
    } catch (err) {
        console.log('err', err);
    }
  }

function TableMyTrades(props) {
    const { title, withFilter } = props;
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
                {withFilter && (
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <section className={classes.filterContainer}>
                            <DateFilter />
                            <DropdownFilter />
                            <section className={classes.buttonFilter}>
                                <Button 
                                    variant="outlined" 
                                    color="primary"
                                    className={classes.btnStyle}
                                    onClick={() => {
                                        addListing({
                                            "skip": 0,
                                            "limit": 5
                                          })
                                    }}
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
                )}
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
                                    const positiveCell = row.side.toLowerCase() === 'buy';

                                    return (
                                        <TableRow key={i}>
                                            <TableCell className={classes.defaultCell}>
                                                {row.date}
                                            </TableCell>
                                            <TableCell className={classes.defaultCell}>
                                                {row.pair}
                                            </TableCell>
                                            {positiveCell ?
                                                <TableCell className={classes.positiveCell}>
                                                    {row.side}
                                                </TableCell>
                                                :
                                                <TableCell className={classes.negativeCell}>
                                                    {row.side}
                                                </TableCell>
                                            }
                                            <TableCell className={classes.defaultCell}>
                                                {row.price}
                                            </TableCell>
                                            <TableCell className={classes.defaultCell}>
                                                {row.filled}
                                            </TableCell>
                                            <TableCell className={classes.defaultCell}>
                                                {row.fee}
                                            </TableCell>
                                            <TableCell className={classes.defaultCell}>
                                                {row.total}
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

TableMyTrades.propTypes = {
    title: PropTypes.string.isRequired,
    withFilter: PropTypes.bool,
};

TableMyTrades.defaultProps = {
    title: 'Title',
    withFilter: true,
}

export default withRouter(TableMyTrades)

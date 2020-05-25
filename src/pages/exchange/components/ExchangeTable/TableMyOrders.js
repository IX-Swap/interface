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

function createData(date, pair, type, side, average, price, filled, amount, total, triggerConditions, status) {
    return { date, pair, type, side, average, price, filled, amount, total, triggerConditions, status };
}
  
const rows = [
    createData('04/01/20 07:04', 'IXPS/SGD', 'Limit', 'Sell', 0, 10.00, 0.6282, 57.092023, '0.16892444 - SGD', '-', 'cancelled'),
    createData('04/01/20 07:04', 'IXPS/SGD', 'Limit', 'Sell', 3, 247.00, 0.6282, 57.092023, '0.16892444 - SGD', '-', 'cancelled'),
    createData('04/01/20 07:04', 'IXPS/SGD', 'Limit', 'Sell', 4, 247.00, 0.6282, 58.092023, '0.16892444 - SGD', '-', 'filled'),
    createData('04/01/20 07:04', 'IXPS/SGD', 'Limit', 'Buy', 4, 247.00, 0.6282, 58.092023, '0.16892444 - SGD', '-', 'filled'),
    createData('04/01/20 07:04', 'IXPS/SGD', 'Limit', 'Buy', 4, 247.00, 0.6282, 58.092023, '0.16892444 - SGD', '-', 'filled'),
    createData('04/01/20 07:04', 'IXPS/SGD', 'Limit', 'Sell', 4, 247.00, 0.6282, 58.092023, '0.16892444 - SGD', '-', 'filled'),
    createData('04/01/20 07:04', 'IXPS/SGD', 'Limit', 'Sell', 4, 247.00, 0.6282, 58.092023, '0.16892444 - SGD', '-', 'filled'),
    createData('04/01/20 07:04', 'IXPS/SGD', 'Limit', 'Sell', 5, 247.00, 0.6282, 59.092023, '0.16892444 - SGD', '-', 'cancelled'),
    createData('04/01/20 07:04', 'IXPS/SGD', 'Limit', 'Sell', 6, 247.00, 0.6282, 12.092023, '0.16892444 - SGD', '-', 'cancelled'),
    createData('04/01/20 07:04', 'IXPS/SGD', 'Limit', 'Sell', 7, 247.00, 0.6282, 13.092023, '0.16892444 - SGD', '-', 'cancelled'),
    createData('04/01/20 07:04', 'IXPS/SGD', 'Limit', 'Buy', 8, 247.00, 0.6282, 57.092023, '0.16892444 - SGD', '-', 'filled'),
    createData('04/01/20 07:04', 'IXPS/SGD', 'Limit', 'Buy', 0, 247.00, 0.6282, 57.092023, '0.16892444 - SGD', '-', 'cancelled'),
];

async function addListing(payload) {
    try {
      const uri = `/exchange/listings`;
      const result = await putRequest(uri, payload);
      const response = await result.json();

      console.log('reponse', response);
  
    } catch (err) {
      throw new Error(err);
    }
  }

function ExchangeTable(props) {
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
                                >
                                    Search
                                </Button>
                                <Button 
                                    variant="contained"
                                    className={classes.btnStyle}
                                    onClick={() => {
                                        addListing({
                                            "name": "InvestaX Common Stock",
                                            "asset": "{{SecurityAssetId}}",
                                            "description": "Vel minus qui rerum error minima nulla architecto illum nostrum. Quae laudantium sit similique. Debitis deserunt officiis. Cupiditate vel autem deleniti in est. Enim molestiae autem rerum necessitatibus rerum sit natus omnis.",
                                            "companyName": "Rempel, Pacocha and Harber",
                                            "explorer": "https://ropsten.etherscan.io/address/0x65356f2ab79dac8a0a930c18a83b214ef9fca6a7#writeContract"
                                        })
                                    }}
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
                                    const positiveBadge = row.status.toLowerCase() === 'filled';

                                    return (
                                        <TableRow key={i}>
                                            <TableCell className={classes.defaultCell}>
                                                {row.date}
                                            </TableCell>
                                            <TableCell className={classes.defaultCell}>
                                                {row.pair}
                                            </TableCell>
                                            <TableCell className={classes.defaultCell}>
                                                {row.type}
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
                                                {row.average}
                                            </TableCell>
                                            <TableCell className={classes.defaultCell}>
                                                {row.price}
                                            </TableCell>
                                            <TableCell className={classes.defaultCell}>
                                                {row.filled}
                                            </TableCell>
                                            <TableCell className={classes.defaultCell}>
                                                {row.amount}
                                            </TableCell>
                                            <TableCell className={classes.defaultCell}>
                                                {row.total}
                                            </TableCell>
                                            <TableCell className={classes.defaultCell}>
                                                {row.triggerConditions}
                                            </TableCell>
                                            <TableCell className={classes.defaultCell}>
                                                {positiveBadge ?
                                                    <span className={classes.positiveBadge}>
                                                        {row.status}
                                                    </span>
                                                    :
                                                    <span className={classes.disabledBadge}>
                                                        {row.status}
                                                    </span>
                                                }
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

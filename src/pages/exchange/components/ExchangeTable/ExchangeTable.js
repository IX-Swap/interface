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

const columns = [
    {
        id: 'name', 
        label: 'Name',
    },
    { 
        id: 'code', 
        label: 'ISO\u00a0Code' 
    },
    {
        id: 'population',
        label: 'Population',
    },
];

function createData(name, calories, fat) {
    return { name, calories, fat };
}
  
const rows = [
    createData('Donut', 452, 25.0),
    createData('Eclair', 262, 16.0),
    createData('Frozen yoghurt', 159, 6.0),
    createData('Gingerbread', 356, 16.0),
    createData('Honeycomb', 408, 3.2),
    createData('Ice cream sandwich', 237, 9.0),
    createData('Jelly Bean', 375, 0.0),
    createData('KitKat', 518, 26.0),
    createData('Lollipop', 392, 0.2),
    createData('Marshmallow', 318, 0),
    createData('Nougat', 360, 19.0),
    createData('Oreo', 437, 18.0),
].sort((a, b) => (a.calories < b.calories ? -1 : 1));

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
                                    Primary
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
                            {(rowsPerPage > 0 ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : rows).map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell>
                                        {row.calories}
                                    </TableCell>
                                    <TableCell>
                                        {row.fat}
                                    </TableCell>
                                </TableRow>
                            ))}

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
                                    colSpan={3}
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

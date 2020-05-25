import React from 'react';
import PropTypes from 'prop-types';
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

// Local component
import Pagination from 'pages/exchange/components/ExchangeTable/Pagination';

// Styles
import useStyles from 'pages/exchange/components/ExchangeTable/styles';

const columns = [
    {
        id: 'name', 
        label: 'Name',
    },
    {
        id: 'assetName', 
        label: 'Asset Name',
    },
    {
        id: 'companyName', 
        label: 'Company Name',
    },
    {
        id: 'view', 
        label: '',
    },
];

function createData(name, assetName, companyName, view) {
    return { name, assetName, companyName, view };
}
  
const rows = [
    createData('IXPS/SGD', 'InvestaX', '$1,234,50', 'View'),
    createData('IXPS/SGD', 'InvestaX', '$1,234,50', 'View'),
    createData('IXPS/SGD', 'InvestaX', '$1,234,50', 'View'),
    createData('IXPS/SGD', 'InvestaX', '$1,234,50', 'View'),
    createData('IXPS/SGD', 'InvestaX', '$1,234,50', 'View'),
    createData('IXPS/SGD', 'InvestaX', '$1,234,50', 'View'),
    createData('IXPS/SGD', 'InvestaX', '$1,234,50', 'View'),
    createData('IXPS/SGD', 'InvestaX', '$1,234,50', 'View'),
    createData('IXPS/SGD', 'InvestaX', '$1,234,50', 'View'),
    createData('IXPS/SGD', 'InvestaX', '$1,234,50', 'View'),
    createData('IXPS/SGD', 'InvestaX', '$1,234,50', 'View'),
    createData('IXPS/SGD', 'InvestaX', '$1,234,50', 'View'),
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
                                    return (
                                        <TableRow key={i}>
                                            <TableCell className={classes.defaultCell}>
                                                {row.name}
                                            </TableCell>
                                            <TableCell className={classes.defaultCell}>
                                                {row.assetName}
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
                                                        {row.view}
                                                    </Link>
                                                </Button>
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

import React, { useEffect, useRef } from 'react';
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
    LinearProgress,
} from '@material-ui/core';

// Styles
import useStyles from 'pages/exchange/components/ExchangeTable/styles';

// Modules
import ListingsAction from './modules/actions';
import ListingsModule from './modules';

const {
    ListingsState,
    useListingsDispatch,
} = ListingsModule;

const {
    setPage,
    setRowsPerPage,
} = ListingsAction;

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
                            <Button color="primary">
                                <Link
                                    className={classes.tableLink}
                                    to={`/listings-view/${row._id}`}
                                >
                                    View
                                </Link>
                            </Button>
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

    const dispatch = useListingsDispatch();
    const listState = ListingsState();
    const mountedRef = useRef(true);

    const {
        page,
        total,
        limit,
        items,
        status,
    } = listState;

    const handleChangePage = (_, newPage: number) => {
        setPage(dispatch, { page: newPage });
    };

    const handleChangeRowsPerPage = (newRows: number) => {
        setRowsPerPage(dispatch, { rows: newRows });
        setPage(dispatch, { page: 0 });
    };

    useEffect(() => {
        ListingsAction.getListings(dispatch, {
            skip: page * limit,
            limit,
            ref: mountedRef,
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
                    {status === 'GETTING' &&
                        <LinearProgress />
                    }
                    <Table aria-label="listings table">    
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
                        {total && status === 'IDLE' &&(
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

export default withRouter(ExchangeTable)

import React, { useEffect } from 'react';
import { withRouter, useParams, Link as ReactLink } from 'react-router-dom';

// Material Components
import { 
    Grid, 
    Typography,
    Paper,
    Box,
    Button,
    Link as MaterialLink,
    CircularProgress,
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'

// Styles
import useStyles from './styles';

// Modules
import ListActions from './modules/actions';
import {listViewActions} from './modules/types';
import ListModule from './modules';

const {
    ListViewState,
    useListViewDispatch,
} = ListModule;

const HeaderContent = d => {
    const classes = useStyles();
    const preventDefault = evt => evt.preventDefault();
    const { props } = d;
    
    const companyName = props.data && props.data.companyName;
    const symbol = props.data && props.data.asset && props.data.asset.symbol;
    const assetName = props.data && props.data.asset && props.data.asset.name;
    const link = props.data && props.data.explorer;
    
    return (
        <React.Fragment>
            <Box className={classes.innerContent}>
                <Grid className={classes.avatarInfo}>
                    <img src='https://place-hold.it/75' alt='Company Symbol' />
                    <Box className={classes.listItemInfo}>
                        <Typography 
                            className={classes.pageTitle} 
                            variant="h2"
                        >
                            {symbol}
                        </Typography>
                        <Typography 
                            className={classes.subTitle} 
                            component="p"
                        >
                            {assetName}
                        </Typography>
                    </Box>
                </Grid>
                <Box className={classes.listPrice}>
                    <Typography 
                        className={classes.listTitle} 
                        component="p"
                    >
                        Price:
                    </Typography>
                    <Typography 
                        className={classes.pageTitle} 
                        variant="h2"
                    >
                            $0.00 
                    </Typography>
                    <Typography 
                        className={classes.listSymbol} 
                        variant="h3"
                    >
                        {symbol}
                    </Typography>
                    <Typography 
                        className={classes.listPercentage} 
                        component="p"
                    >
                        (0%)
                    </Typography>
                    
                </Box>
                <Button variant="contained" color="primary">
                    Trade
                </Button>
            </Box>
            <Grid 
                className={classes.companyContainer}
                container 
                alignItems="center"
            >
                <Typography 
                    className={classes.companyName} 
                    component="h3"
                >
                    Company Name: 
                </Typography>
                <Typography 
                    className={classes.companyValue} 
                    component="p">
                    {companyName}
                </Typography>
            </Grid>
            <MaterialLink href={link} onClick={preventDefault}>
                {link}
            </MaterialLink>
        </React.Fragment>
    );
}

function ListingsView() {
    let { id: listId } = useParams();
    const state = ListViewState();
    const dispatch = useListViewDispatch();
    const classes = useStyles();

    const name = state.data && state.data.name;
    const description = state.data && state.data.description;

    
    useEffect(() => {
        /*eslint-disable */
        ListActions.getListItem(dispatch, listId);
        /*eslint-disable */
    }, [dispatch]);

    return (
        <Grid>
            {state.isLoading ? (
                <CircularProgress size={50} className={classes.loginLoader} />
            )
                :
                <React.Fragment>
                    <Grid
                        container
                        alignItems="center"
                    >
                        <ReactLink 
                            to="/listings"  
                            className={classes.pageLink}
                        > 
                            <ChevronLeftIcon /> 
                        </ReactLink>
                        <Typography 
                            className={classes.pageTitle} 
                            variant="h1"
                        >
                            {name}
                        </Typography>
                    </Grid>
                    <Grid className={classes.cotentContainer}>
                        <Paper elevation={3} className={classes.content}>
                            <HeaderContent props={state}/>
                            <Box className={classes.listDescContainer}>
                            <Typography 
                                    className={classes.listDescTitle} 
                                    variant="h6"
                                >
                                    Description
                                </Typography>
                                <Typography 
                                    className={classes.listDesc} 
                                    variant="p"
                                >
                                    {description}
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>
                </React.Fragment>
            }
        </Grid>
    )
}

export default withRouter(ListingsView)

import React, { useEffect, useState } from 'react'
import { withRouter, useParams, Link } from 'react-router-dom';
import io from 'socket.io-client';

import { 
    Grid, 
    Typography,
} from '@material-ui/core'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'

import localStore from 'services/storageHelper';
import { ENDPOINT_URL, API_URL } from 'config';
import { numberWithCommas } from 'utils/utils';

import useStyles from './styles'

const bearerToken = localStore.getAccessToken();
function OverviewHeader (props) {
    const [ lastPrice, setLastPrice ] = useState(0);
    const { id } = useParams();
    const { data } = props;
    const classes = useStyles();
    
    const { SUBSCRIBE_API } = ENDPOINT_URL;
    const { LAST_PRICE } = SUBSCRIBE_API;

    /*eslint-disable */
    // useEffect(() => {
    //     const socket = io(`${API_URL}?token=${bearerToken}`);
        
    //     socket.on(`${LAST_PRICE.on}/${id}`, data => {
    //         setLastPrice(data);
    //     });
    //     socket.emit(LAST_PRICE.emit, id)

    //     return () => {
    //         socket.off(`${LAST_PRICE.on}/${id}`);
    //     };
    // }, []);
    /*eslint-disable */

    return (
        <Grid
            container
            alignItems="center"
            justify="space-between"
            className={classes.overviewHeader}
        >
            <section className={classes.overviewHeaderContent}> 
                <Link 
                    to="/markets"  
                    className={classes.overviewHeaderLink}> 
                    <ChevronLeftIcon /> 
                </Link>
                <Grid
                    container
                    direction="column"
                    justify="flex-start"
                >
                    <Typography 
                        className={classes.stockTitle} 
                        variant="h1"
                    >
                        {data && data.name}
                    </Typography>
                    <Typography 
                        className={classes.subTitle} 
                        variant="h3"
                    >
                        {data && data.listing.name}
                    </Typography>
                </Grid>
            </section>
            <Grid
                container
                direction="column"
                justify="center"
                item
                xs={6}
            >
                <Typography 
                    className={classes.priceTitle} 
                    variant="h3"
                >
                    Last Prices
                </Typography>
                <Typography 
                    className={classes.price} 
                    variant="h6"
                >
                    $ {numberWithCommas(lastPrice.toFixed(2))}
                </Typography>
            </Grid>
        </Grid>
    )
}

export default withRouter(OverviewHeader)

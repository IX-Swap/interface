import React from 'react'
import { withRouter } from 'react-router-dom'
import { 
    Grid, 
    Typography,
} from '@material-ui/core'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import { Link } from 'react-router-dom'

import useStyles from './styles'

function OverviewHeader (props) {
    const { data } = props;
    const classes = useStyles()
    
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
                    $0.00
                </Typography>
            </Grid>
        </Grid>
    )
}

export default withRouter(OverviewHeader)

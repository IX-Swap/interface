import React from 'react'
import { withRouter } from 'react-router-dom'
import { 
    Grid, 
    Typography,
} from '@material-ui/core'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import { Link } from 'react-router-dom'

import useStyles from './styles'

function OverviewHeader () {
    const classes = useStyles()
    
    return (
        <Grid
            container
            alignItems="center"
            justify="space-between"
            className={classes.overviewHeader}
        >
            <Grid container alignItems="center" xs={6}> 
                <Link to="/invest"> <ChevronLeftIcon /> </Link>
                <Grid
                    direction="column"
                    justify="flex-start"
                >
                    <Typography 
                        className={classes.stockTitle} 
                        variant="h1"
                    >
                        Heading
                    </Typography>
                    <Typography 
                        className={classes.subTitle} 
                        variant="h3"
                    >
                        Sub heading
                    </Typography>
                </Grid>
            </Grid>
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
                    variant="p"
                >
                    $123,456.00
                </Typography>
            </Grid>
        </Grid>
    )
}

export default withRouter(OverviewHeader)

import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

// Material Components
import { 
    Grid, 
    Typography,
} from '@material-ui/core';

// Styles
import useStyles from './styles';

function ListingsView(props) {
    const classes = useStyles();
    const { title } = props;
    
    return (
        <Grid>
            <Typography 
                className={classes.stockTitle} 
                variant="h1"
            >
                {title}
            </Typography>
        </Grid>
    )
}

ListingsView.propTypes = {
    title: PropTypes.string.isRequired,
};

ListingsView.defaultProps = {
    title: 'Listings View',
}

export default withRouter(ListingsView)

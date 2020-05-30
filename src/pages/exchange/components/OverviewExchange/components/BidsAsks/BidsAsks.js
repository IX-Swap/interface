import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Button, Typography } from '@material-ui/core';
import io from 'socket.io-client';

// Components
import { Paper } from '@material-ui/core';

// Config/Endpoints
import { ENDPOINT_URL, API_URL } from 'config';
import localStore from 'services/storageHelper';

// Modules
import PostOrderActions from './modules/actions';
import Modules from './modules';

// Styles
import useStyles from '../styles';

const { PostOrderState, usePostOrderDispatch } = Modules;
const BidsAsksHistory = (props) => {
    const { id } = props;
    const classes = useStyles();
    const bearerToken = localStore.getAccessToken();
    const _userId = localStore.getUserId();
    const socket = io(`${API_URL}?token=${bearerToken}`);

    // eslint-disable-next-line
    const [collection, setCollection] = useState(false); 
    const { SUBSCRIBE_API } = ENDPOINT_URL;
    const { BIDS_ASKS } = SUBSCRIBE_API;

    // Subscribe to the bids/asks
    // TODO: Better way to implement this locally/globally
    useEffect(() => {
        socket.emit(BIDS_ASKS.emit, id);
        socket.on(`${BIDS_ASKS.on}/${_userId}`, (data) => {
        setCollection(data);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // State for the RESET FORM fields
    const [form, setFields] = useState({
        price: 0,
        amount: 0,
        total: 0,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps

    // Handle change/update for the fields
    const updateField = (e) => {
        const { name } = e.target;
        const { value } = e.target;
        setFields({
            ...form,
            [name]: value,
        });
    };

    const sellButtonClassName = classNames(
        classes.formButton,
        classes.sellButton
    );

    const dispatch = usePostOrderDispatch();
    const orderState = PostOrderState();
    const _handleBidAsk = evt => {
        PostOrderActions.postOrder(dispatch, {
            pair: id,
            side: 'BID', 
            type: 'LIMIT', 
            price: 100, 
            amount: 10
        });
    }

    const fields = [
        {
            id: 'price',
            name: 'price',
            label: 'Price:',
            value: form.price,
            onChange: updateField,
            placeholder: 'Price...',
            type: 'number',
        },
        {
            id: 'amount',
            name: 'amount',
            label: 'Amount:',
            value: form.amount,
            onChange: updateField,
            placeholder: 'Amount...',
            type: 'number',
        },
        {
            id: 'total',
            name: 'total',
            label: 'Total:',
            value: form.total,
            onChange: updateField,
            placeholder: 'Total...',
            type: 'number',
        },
    ];

    return (
        <Paper className={classes.bidsAsksContainer}>
            <form className={classes.formContainer}>
                <div className={classes.formHeader}>
                    <Typography className={classes.formTitle} variant="h3">
                        Buy {(collection.length && collection[1].symbol)}
                    </Typography>
                    <div>
                        {(collection.length && collection[1].available || 0)}
                    </div>
                </div>
                {fields.map(field => 
                    <div className={classes.inputContainer}>
                        <label>{field.label}</label>
                        <input
                            className={classes.inputField}
                            key={field.id}
                            id={`${field.id}-buy`}
                            value={field.value}
                            onChange={field.onChange}
                            placeholder={field.placeholder}
                            type={field.type}
                            name={field.name}
                        />
                    </div>
                )}
                <Button 
                    className={classes.formButton}
                    variant="contained" 
                    color="primary" 
                    disableElevation
                    onClick={_handleBidAsk}
                >
                    BID IXPS
                </Button>
            </form>
            <form className={classes.formContainer}>
                <div className={classes.formHeader}>
                    <Typography className={classes.formTitle} variant="h3">
                        Buy {(collection.length && collection[0].symbol)}
                    </Typography>
                    <div>
                        {(collection.length && collection[0].available || 0)}
                    </div>
                </div>
                {fields.map(field => 
                    <div className={classes.inputContainer}>
                        <label className>{field.label}</label>
                        <input
                            className={classes.inputField}
                            key={field.id}
                            id={`${field.id}-sell`}
                            value={field.value}
                            onChange={field.onChange}
                            placeholder={field.placeholder}
                            type={field.type}
                            name={field.name}
                        />
                    </div>
                )}
                <Button 
                    className={sellButtonClassName}
                    variant="contained" 
                    color="primary" 
                    disableElevation
                >
                    ASK IXPS
                </Button>
            </form>
        </Paper>
    );
};

export default BidsAsksHistory;

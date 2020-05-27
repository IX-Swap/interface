import React, { useState, useEffect } from 'react';
import classNames from 'classnames'
import {
    Button,
    Typography,
} from '@material-ui/core';
import io from "socket.io-client";

// Components
import { Paper } from '@material-ui/core';

// Config/Endpoints
import { ENDPOINT_URL, API_URL } from 'config';
import localStore from 'services/storageHelper';

// Styles
import useStyles from '../styles'

const BidsAsksHistory = (props) => {
    const { id } = props;
    const classes = useStyles();
    const bearerToken = localStore.getAccessToken();
    const _userId = localStore.getUserId();
    const socket = io(`${API_URL}?token=${bearerToken}`);
    
    const [collection, setCollection] = useState(false);
    const { SUBSCRIBE_API } = ENDPOINT_URL;
    const { BIDS_ASKS } = SUBSCRIBE_API;
    
    // Subscribe to the bids/asks
    // TODO: Better way to implement this locally/globally
    useEffect(() => {
        socket.emit(BIDS_ASKS.emit, id);
        socket.on(`${BIDS_ASKS.on}/${_userId}`, data => {
            setCollection(data);
        });
    }, []);

    // State for the RESET FORM fields
    const [form, setFields] = useState({
        price: 0,
        amount: 0,
        total: 0,
    });

    // Handle change/update for the fields
    const updateField = e => {
        const name = e.target.name;
        const value = e.target.value;
        setFields({
            ...form,
            [name]: value,
        });
    };

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

    const sellButtonClassName = classNames(
        classes.formButton, 
        classes.sellButton,
    );
    
    return (
        <Paper className={classes.bidsAsksContainer}>
            <form className={classes.formContainer}>
                <div className={classes.formHeader}>
                    <Typography className={classes.formTitle} variant="h3">
                        Buy IXPS
                    </Typography>
                    <div>
                        12312312312
                    </div>
                </div>
                {fields.map(field => 
                    <div className={classes.inputContainer}>
                        <label className>{field.label}</label>
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
                >
                    BUY IXPS
                </Button>
            </form>
            <form className={classes.formContainer}>
                <div className={classes.formHeader}>
                    <Typography className={classes.formTitle} variant="h3">
                        Buy IXPS
                    </Typography>
                    <div>
                        12312312312
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
                    SELL IXPS
                </Button>
            </form>
        </Paper>
    );
};

export default BidsAsksHistory;

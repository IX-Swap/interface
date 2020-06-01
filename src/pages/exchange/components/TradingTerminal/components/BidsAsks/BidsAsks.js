import React, { useState, useEffect, useMemo } from 'react';
import classNames from 'classnames';
import { Button, Typography } from '@material-ui/core';
import io from 'socket.io-client';

// Components
import { Paper, Box, TextField } from '@material-ui/core';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';

// Config/Endpoints
import { ENDPOINT_URL, API_URL } from 'config';
import localStore from 'services/storageHelper';

// Modules
import PostOrderActions from './modules/actions';
import Modules from './modules';

// Market Modules
import MarketModules from '../../modules';

// Monitoring Module
import MonitoringModule from '../Monitoring/modules';

// Styles
import useStyles from '../styles';

const { MarketState } = MarketModules;
const { MonitoringState } = MonitoringModule;
const { PostOrderState, usePostOrderDispatch } = Modules;
const BidsAsksHistory = (props) => {
    const { id } = props;
    const classes = useStyles();
    const bearerToken = localStore.getAccessToken();
    const _userId = localStore.getUserId();
    const socket = io(`${API_URL}?token=${bearerToken}`);

    // Initialized Asks/Bids History state for  Payload
    const asksBidsHistoryData = MonitoringState();
    const marketStateData = MarketState();

    const { items } = marketStateData;
    const marketListItem = items.length && items.find(item => item._id === id);

    // eslint-disable-next-line
    const [collection, setCollection] = useState(false); 
    const { SUBSCRIBE_API } = ENDPOINT_URL;
    const { BIDS_ASKS } = SUBSCRIBE_API;

    // State for the RESET FORM fields
    const [bidForm, setBidFields] = useState({
        price: 0,
        amount: 0,
        total: 0,
    });

    const [askForm, setAskFields] = useState({
        price: 0,
        amount: 0,
        total: 0,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps

    // Handle change/update for the fields
    const updateBidField = (e) => {
        const { name } = e.target;
        const { value } = e.target;
        setBidFields({
            ...bidForm,
            [name]: value,
        });
    };

    const updateAskField = (e) => {
        const { name } = e.target;
        const { value } = e.target;
        setAskFields({
            ...askForm,
            [name]: value,
        });
    };

    // Subscribe to the bids/asks
    // TODO: Better way to implement this locally/globally
    /*eslint-disable */
    useEffect(() => {
        socket.emit(BIDS_ASKS.emit, id);
        socket.on(`${BIDS_ASKS.on}/${_userId}`, (data) => {
            setCollection(data);
        });
    }, []); 
    /*eslint-disable */

    // Update FORM values when toggling asks/bids history
    /*eslint-disable */
    useMemo(() => {
        setBidFields(asksBidsHistoryData)
        setAskFields(asksBidsHistoryData)
    }, [asksBidsHistoryData]); 
    /*eslint-disable */

    const sellButtonClassName = classNames(
        classes.formButton,
        classes.sellButton
    );

    const dispatch = usePostOrderDispatch();
    const _handlePostOrder = side => {
        const isBid = side.toLowerCase() === 'bid';
        PostOrderActions.postOrder(dispatch, {
            pair: id,
            side: side, 
            type: 'LIMIT', 
            price: isBid ? bidForm.price : askForm.price, 
            amount: isBid ? bidForm.amount : askForm.amount,
        });
    }

    const bidFields = [
      {
          id: 'price',
          name: 'price',
          label: 'Price:',
          value: bidForm.price,
          onChange: updateBidField,
          placeholder: 'Price...',
          type: 'number',
      },
      {
          id: 'amount',
          name: 'amount',
          label: 'Amount:',
          value: bidForm.amount,
          onChange: updateBidField,
          placeholder: 'Amount...',
          type: 'number',
      },
      {
          id: 'total',
          name: 'total',
          label: 'Total:',
          value: bidForm.total,
          onChange: updateBidField,
          placeholder: 'Total...',
          type: 'number',
      },
  ];

  const askFields = [
    {
        id: 'price',
        name: 'price',
        label: 'Price:',
        value: askForm.price,
        onChange: updateAskField,
        placeholder: 'Price...',
        type: 'number',
    },
    {
        id: 'amount',
        name: 'amount',
        label: 'Amount:',
        value: askForm.amount,
        onChange: updateAskField,
        placeholder: 'Amount...',
        type: 'number',
    },
    {
        id: 'total',
        name: 'total',
        label: 'Total:',
        value: askForm.total,
        onChange: updateAskField,
        placeholder: 'Total...',
        type: 'number',
    },
];

    const isQuoteItem = collection && collection.length && collection.find(item => item.assetId === marketListItem?.quote?._id);
    const isListingItem = collection && collection.length && collection.find(item => item.assetId !== marketListItem?.quote?._id);

    return (
        <Paper className={classes.bidsAsksContainer}>
            <form className={classes.formContainer}>
                <Box className={classes.formHeader}>
                    <Typography className={classes.formTitle} variant="h3">
                        Buy {isQuoteItem?.symbol}
                    </Typography>
                    <Box className={classes.formValue}>
                        <AccountBalanceWalletIcon color="action" /> 
                        <span className={classes.availableBalance}>
                            {isQuoteItem?.available}
                        </span>
                        {isQuoteItem?.symbol}
                    </Box>
                </Box>
                {bidFields.map(field => {
                  const totalAmount = bidForm.amount * bidForm.price;
                    
                  return (
                      <Box className={classes.inputContainer}>
                          <label>{field.label}</label>
                          <input
                              className={classes.inputField}
                              key={field.id}
                              id={`${field.id}-bid`}
                              value={field.id === 'total' ? totalAmount : field.value}
                              onChange={field.onChange} // eslint-disable-line
                              placeholder={field.placeholder}
                              type={field.type}
                              name={field.name}
                              min={0}
                              disabled={field.id === 'total'}
                          />
                      </Box>
                  );
                })}
                <Button 
                    className={classes.formButton}
                    variant="contained" 
                    color="primary" 
                    disableElevation
                    onClick={() => _handlePostOrder('BID')}
                    disabled={isQuoteItem?.balance < 0}
                >
                    Buy IXPS
                </Button>
            </form>
            <form className={classes.formContainer}>
                <Box className={classes.formHeader}>
                    <Typography className={classes.formTitle} variant="h3">
                        Sell {isQuoteItem?.symbol}
                    </Typography>
                    <Box className={classes.formValue}>
                        <AccountBalanceWalletIcon color="action" /> 
                        <span className={classes.availableBalance}>
                            {isListingItem?.available}
                        </span>
                        {isListingItem?.symbol}
                    </Box>
                </Box>
                {askFields.map(field => {
                  const totalAmount = askForm.amount * askForm.price;
                    
                  return (
                      <Box className={classes.inputContainer}>
                          <label>{field.label}</label>
                          <input
                              className={classes.inputField}
                              key={field.id}
                              id={`${field.id}-sell`}
                              value={field.id === 'total' ? totalAmount : field.value}
                              onChange={field.onChange} // eslint-disable-line
                              placeholder={field.placeholder}
                              type={field.type}
                              name={field.name}
                              min={0}
                              disabled={field.id === 'total'}
                          />
                      </Box>
                  );
                })}
                <Button 
                    className={sellButtonClassName}
                    variant="contained" 
                    color="primary" 
                    onClick={() => _handlePostOrder('ASK')}
                    disableElevation
                    disabled={isListingItem?.balance < 0}
                >
                    Sell IXPS
                </Button>
            </form>
        </Paper>
    );
};

export default BidsAsksHistory;
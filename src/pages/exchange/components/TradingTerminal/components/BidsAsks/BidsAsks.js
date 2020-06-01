import React, { useState, useEffect, useMemo } from 'react';
import classNames from 'classnames';
import { Button, Typography } from '@material-ui/core';
import io from 'socket.io-client';

// Components
import { Paper, Box } from '@material-ui/core';
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
const {
  // PostOrderState,
  usePostOrderDispatch,
} = Modules;
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
  const marketListItem = items.length && items.find((item) => item._id === id);

  // eslint-disable-next-line
    const [collection, setCollection] = useState(false); 
  const { SUBSCRIBE_API } = ENDPOINT_URL;
  const { BIDS_ASKS } = SUBSCRIBE_API;

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

  // Subscribe to the bids/asks
  // TODO: Better way to implement this locally/globally
  useEffect(() => {
    socket.emit(BIDS_ASKS.emit, id);
    socket.on(`${BIDS_ASKS.on}/${_userId}`, (data) => {
      setCollection(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update FORM values when toggling asks/bids history
  useMemo(() => {
    setFields(asksBidsHistoryData);
  }, [asksBidsHistoryData]);

  const sellButtonClassName = classNames(
    classes.formButton,
    classes.sellButton
  );

  const dispatch = usePostOrderDispatch();
  // const orderState = PostOrderState();

  const _handlePostOrder = (side) => {
    PostOrderActions.postOrder(dispatch, {
      pair: id,
      side,
      type: 'LIMIT',
      price: form.price,
      amount: form.amount,
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

  const isQuoteItem =
    collection &&
    collection.length &&
    collection.find((item) => item.assetId === marketListItem?.quote?._id);
  const isListingItem =
    collection &&
    collection.length &&
    collection.find((item) => item.assetId !== marketListItem?.quote?._id);

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
        {fields.map((field) => (
          <Box className={classes.inputContainer}>
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
          </Box>
        ))}
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
        {fields.map((field) => (
          <Box className={classes.inputContainer}>
            <label>{field.label}</label>
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
          </Box>
        ))}
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

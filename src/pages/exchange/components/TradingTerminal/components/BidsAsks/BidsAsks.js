import React, { useState, useEffect, useMemo } from 'react';
import classNames from 'classnames';
import { Button, Typography } from '@material-ui/core';

// Components
import { Paper, Box } from '@material-ui/core';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';

// Config/Endpoints
import { ENDPOINT_URL } from 'config';
import localStore from 'services/storageHelper';

// Modules
import { subscribeToSocket } from 'services/socket';
import { numberWithCommas } from 'utils/utils';
import NumberFormat from 'react-number-format';
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
const { usePostOrderDispatch } = Modules;
const BidsAsksHistory = (props) => {
  const { id } = props;
  const classes = useStyles();
  const _userId = localStore.getUserId();

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
        const socket = subscribeToSocket();
        socket.emit(BIDS_ASKS.emit, id);
        socket.on(`${BIDS_ASKS.on}/${_userId}`, (data) => {
            setCollection(data);
        });

        return () => {
            socket.off(`${BIDS_ASKS.on}/${_userId}`);
        };
    }, [id]);
    /*eslint-disable */

    // Update FORM values when toggling asks/bids history
    /*eslint-disable */
    useMemo (() => {
      switch (asksBidsHistoryData.side) {
        case 'asks': return setBidFields(asksBidsHistoryData);
        case 'bids': return setAskFields(asksBidsHistoryData);
        default:
          setBidFields(asksBidsHistoryData);
          setAskFields(asksBidsHistoryData);
      }
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

    let isQuoteItem = collection && collection.length && collection.find(item => item.assetId === marketListItem?.quote?._id);
    let isListingItem = collection && collection.length && collection.find(item => item.assetId === marketListItem?.listing?.asset?._id);

    const quoteCurrency = marketListItem?.quote?.numberFormat?.currency;
    const listCurrency = marketListItem?.listing?.asset?.numberFormat?.currency;

    return (
      <Paper className={classes.bidsAsksContainer}>
        <form className={classes.formContainer}>
          <Box className={classes.formHeader}>
            <Typography className={classes.formTitle} variant="h3">
              Buy {marketListItem?.listing?.asset?.numberFormat?.currency}
            </Typography>
            <Box className={classes.formValue}>
              <AccountBalanceWalletIcon color="action" />
              <span className={classes.availableBalance}>
                {numberWithCommas((isQuoteItem?.available || 0).toFixed(4))}
              </span>
              {marketListItem?.quote?.numberFormat?.currency}
            </Box>
          </Box>
          {bidFields.map((field, i) => {
            let totalAmount = bidForm.max * bidForm.price;
            let totalPcs = bidForm.max;
            if (totalAmount > (isQuoteItem ? isQuoteItem.available : 0)) {
              totalAmount = isQuoteItem ? (isQuoteItem.available / bidForm.price) * bidForm.price : 0;
              totalPcs =  isQuoteItem ? isQuoteItem.available / bidForm.price : 0;
            }

            const getValue = (id) => {
              switch(id) {
                case 'total': return totalAmount;
                case 'amount': return totalPcs;
                default: return field.value;
              }
            }

            return (
              <Box key={i} className={classes.inputContainer}>
                <label className={classes.label}>{field.label}</label>
                <NumberFormat
                  className={classes.inputField}
                  allowEmptyFormatting
                  value={getValue(field.id) || ''}
                  disabled={field.id === "total"}
                  inputMode="numeric"
                  thousandSeparator
                  prefix={`${
                    field.id === "amount" ? listCurrency : quoteCurrency
                  } `}
                  onValueChange={(values) => {
                    field.onChange({
                      target: {
                        name: field.name,
                        value: values.value,
                      },
                    });
                  }}
                  isNumericString
                />
              </Box>
            );
          })}
          <Button
            className={classes.formButton}
            variant="contained"
            color="primary"
            disableElevation
            onClick={() => _handlePostOrder("BID")}
            disabled={isQuoteItem?.balance < 0}
          >
            Buy {marketListItem?.listing?.asset?.numberFormat?.currency}
          </Button>
        </form>
        <form className={classes.formContainer}>
          <Box className={classes.formHeader}>
            <Typography className={classes.formTitle} variant="h3">
              Sell {marketListItem?.listing?.asset?.numberFormat?.currency}
            </Typography>
            <Box className={classes.formValue}>
              <AccountBalanceWalletIcon color="action" />
              <span className={classes.availableBalance}>
                {numberWithCommas((isListingItem?.available || 0).toFixed(4))}
              </span>
              {marketListItem?.listing?.asset?.numberFormat?.currency}
            </Box>
          </Box>
          {askFields.map((field, i) => {
            let totalAmount = askForm.max * askForm.price;
            let totalPcs = askForm.max;
            if (totalPcs > (isListingItem ? isListingItem.available : 0)) {
              totalAmount = isListingItem ? isListingItem.available * askForm.price : 0;
              totalPcs = isListingItem.available;
            }

            const getValue = (id) => {
              switch (id) {
                case 'total': return totalAmount;
                case 'amount': return totalPcs;
                default: return field.value;
              }
            }

            return (
              <Box key={i} className={classes.inputContainer}>
                <label className={classes.label}>{field.label}</label>
                <NumberFormat
                  className={classes.inputField}
                  allowEmptyFormatting
                  value={getValue(field.id)}
                  disabled={field.id === "total"}
                  inputMode="numeric"
                  thousandSeparator
                  prefix={`${
                    field.id === "amount" ? listCurrency : quoteCurrency
                  } `}
                  onValueChange={(values) => {
                    field.onChange({
                      target: {
                        name: field.name,
                        value: values.value,
                      },
                    });
                  }}
                  isNumericString
                />
              </Box>
            );
          })}
          <Button
            className={sellButtonClassName}
            variant="contained"
            color="primary"
            onClick={() => _handlePostOrder("ASK")}
            disableElevation
            disabled={isListingItem?.balance < 0}
          >
            Sell {marketListItem?.listing?.asset?.numberFormat?.currency}
          </Button>
        </form>
      </Paper>
    );
};

export default BidsAsksHistory;

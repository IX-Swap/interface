/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from 'react';
import { withRouter, Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import moment from 'moment';

// Material Components
import ArrowUpwardRoundedIcon from '@material-ui/icons/ArrowUpwardRounded';
import ArrowDownwardRoundedIcon from '@material-ui/icons/ArrowDownwardRounded';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import {
  Typography,
  ButtonGroup,
  Button,
  Tooltip,
  IconButton,
} from '@material-ui/core';

// Local
import { TIME_FORMAT } from 'config';

// Utils
import { numberWithCommas } from 'utils/utils';

// Modules
import MonitoringActions from './modules/actions';
import Modules from './modules';

// Styles
import useStyles from '../styles';

const { useMonitoringDispatch } = Modules;
function Monitoring(props) {
  const lastElement = useRef(null);
  const dispatch = useMonitoringDispatch();
  const classes = useStyles();
  const [fav, setFav] = useState(false);
  const [search, setSearch] = useState(false);
  const [faveMarkets, setFaveMarkets] = useState(window.favMarkets || {});
  const [availableQuotes, setAvailableQuotes] = useState([]);
  const [quotesSelected, setQuotesSelected] = useState({});
  const { title, type, data = [], lastPrice } = props;
  const isAsksBids = props.type === 'asks' || props.type === 'bids';
  const { id } = useParams();

  useEffect(
    () => () => {
      MonitoringActions.setBidAndAsk(dispatch, {
        amount: 0,
        count: 0,
        max: 0,
        price: 0,
        total: 0,
        side: 'both',
      });
    },
    [id]
  );

  let filteredData = search || data;
  // handle on search function in the Trading Terminal
  const _onSearch = (evt) => {
    const { target } = evt;
    const { value } = target;

    // Start searching if the input value is more than 3 characters
    if (value.length > 3) {
      const filterData = data.filter(
        (d) => d.name.toLowerCase().search(value.toLowerCase()) !== -1
      );

      setSearch(filterData);
    } else {
      setSearch(data);
    }
  };

  const toggleSelected = (id) => {
    const isSelected = !quotesSelected[id];
    setQuotesSelected({
      ...quotesSelected,
      [id]: isSelected,
    });
  };

  const toggleFavoriteMarket = (id) => {
    const isSelected = !faveMarkets[id];
    const newMarkets = {
      ...faveMarkets,
      [id]: isSelected,
    };
    setFaveMarkets(newMarkets);
  };

  let _handleStorePayload = () => {};

  if (isAsksBids) {
    // SET PAYLOAD DATA FOR ORDERS
    data.reduce((acc: number, datum: any) => {
      const val = acc + datum.amount;
      datum.max = val;
      return val;
    }, 0);

    _handleStorePayload = (data, side) => {
      MonitoringActions.setBidAndAsk(dispatch, {
        ...data,
        side,
      });
    };
  }

  useEffect(() => {
    if (lastElement && lastElement.current && ['asks'].includes(type)) {
      lastElement.current.scrollTop = lastElement.current?.scrollHeight;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredData]);

  useEffect(() => {
    let mAvailableQuote = [];
    const selected = {};
    if (type === 'marketList') {
      const seen = new Set();
      mAvailableQuote = (props.data || []).filter((e) => {
        const duplicate = seen.has(e.quote._id);
        seen.add(e.quote._id);
        selected[e.quote._id] = true;
        return !duplicate;
      });
      setQuotesSelected(selected);
      setAvailableQuotes(mAvailableQuote);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (type === 'marketList' && fav) {
    filteredData = filteredData.filter((e) => faveMarkets[e._id]);
  }

  return (
    <>
      <section className={classes.monitoring}>
        {title && (
          <Typography className={classes.monitoringTitle} variant="h1">
            {title}
          </Typography>
        )}
        {type === 'bids' && (
          <section className={classes.bidsHeader}>
            <Typography
              className={classes.maxBidsTitle}
              variant="h3"
              style={{
                color: props.isBid ? '#047762' : '#b50000',
              }}
            >
              {lastPrice}
              {props.isBid ? (
                <ArrowUpwardRoundedIcon fontSize="small" />
              ) : (
                <ArrowDownwardRoundedIcon fontSize="small" />
              )}
            </Typography>
          </section>
        )}
        {type === 'asks' && (
          <ul className={classes.monitoringHeader}>
            <li>
              Price({props.quoteData?.symbol}) {lastPrice}
            </li>
            <li>Amount({props.listingData?.asset?.symbol})</li>
            <li>Total({props.quoteData?.symbol})</li>
          </ul>
        )}
        {type === 'marketList' && (
          <>
            <div className={classes.actionContainer}>
              <IconButton onClick={() => setFav(!fav)}>
                {fav ? (
                  <StarIcon fontSize="small" />
                ) : (
                  <StarBorderIcon fontSize="small" />
                )}
              </IconButton>
              <ButtonGroup
                color="primary"
                aria-label="outlined primary button group"
              >
                {availableQuotes.map((e) => (
                  <Button
                    key={e.quote._id}
                    variant={quotesSelected[e.quote._id] ? 'contained' : ''}
                    onClick={() => toggleSelected(e.quote._id)}
                    style={{ boxShadow: 'none' }}
                  >
                    {e.quote.numberFormat.currency}
                  </Button>
                ))}
              </ButtonGroup>
            </div>
            <div className={classes.searchContainer}>
              <input
                onChange={_onSearch}
                className={classes.searchInput}
                type="search"
                placeholder="search..."
              />
            </div>
            <ul className={classes.marketHeader}>
              <li className={classes.marketHeaderItem}>
                Pair <ArrowDropUpIcon fontSize="small" color="disabled" />
              </li>
              <li className={classes.marketHeaderItem}>Price</li>
            </ul>
          </>
        )}
        <ul className={classes.monitoringList} ref={lastElement}>
          {filteredData.map((d, i) => {
            const activeStyle =
              d.side?.toLowerCase() === 'bid' || type === 'bids'
                ? classes.positiveCell
                : classes.negativeCell;
            const priceStyle = classNames(
              classes.defaultListItemStyle,
              activeStyle
            );

            const amountStyle = classNames(
              classes.defaultListItemStyle,
              classes.rightAlign
            );

            const renderMonitoringEl = (item) => {
              switch (item) {
                case 'marketList':
                  return (
                    quotesSelected[d.quote._id] && (
                      <Link
                        style={{ width: '100%', justifyContent: 'flex-start' }}
                        className={classes.marketLink}
                        to={`/market-list/${d._id}`}
                      >
                        <p
                          style={{
                            width: '100%',
                            justifyContent: 'flex-start',
                          }}
                          className={classes.defaultListItemStyle}
                          data-value={i}
                        >
                          {faveMarkets[d._id] ? (
                            <StarIcon
                              fontSize="small"
                              onClick={() => toggleFavoriteMarket(d._id)}
                            />
                          ) : (
                            <StarBorderIcon
                              fontSize="small"
                              onClick={() => toggleFavoriteMarket(d._id)}
                            />
                          )}
                          {d.name}
                        </p>
                      </Link>
                    )
                  );
                case 'tradeHistory':
                  return (
                    <>
                      <p className={priceStyle}>
                        {numberWithCommas(d.price?.toFixed(4))}
                      </p>
                      <p className={amountStyle}>
                        {numberWithCommas(d.amount?.toFixed(4) || 0)}
                      </p>
                      <Tooltip
                        title={`${moment(d.createdAt).fromNow()} (${
                          d.createdAt
                        })`}
                        placement="top"
                      >
                        <p className={classes.defaultListItemStyle}>
                          {moment(d.createdAt).format(TIME_FORMAT)}
                        </p>
                      </Tooltip>
                    </>
                  );
                default:
                  const max = Math.max(...filteredData.map((e) => e.total));
                  const green = 'rgba(4, 119, 98, .1)';
                  const red = 'rgba(181, 0, 0, .1)';
                  const barStyle = {
                    width: `${(d.total / max) * 100}%`,
                    backgroundColor: type === 'bids' ? green : red,
                  };

                  return (
                    <>
                      <div className={classes.barGraph} style={barStyle} />
                      <p className={priceStyle}>
                        {numberWithCommas(d.price?.toFixed(4))}
                      </p>
                      <p className={amountStyle}>
                        {numberWithCommas(d.amount?.toFixed(4) || 0)}
                      </p>
                      <p className={classes.defaultListItemStyle}>
                        {numberWithCommas(d.total?.toFixed(4))}
                      </p>
                    </>
                  );
              }
            };

            return (
              <li
                key={i}
                className={classes.monitoringListItem}
                onClick={() => _handleStorePayload(d, type)}
              >
                {renderMonitoringEl(type)}
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}

export default withRouter(Monitoring);

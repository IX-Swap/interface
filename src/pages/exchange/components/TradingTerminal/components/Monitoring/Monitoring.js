import React, { useState } from 'react'
import { withRouter, Link } from 'react-router-dom'
import classNames from 'classnames'
import moment from 'moment';

// Material Components
import ArrowUpwardRoundedIcon from '@material-ui/icons/ArrowUpwardRounded';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import { Typography } from '@material-ui/core';

// Local
import { TIME_FORMAT } from 'config';

// Utils
import { numberWithCommas } from 'utils/utils';

// Modules
import MonitoringActions from './modules/actions';
import Modules from './modules';

// Styles
import useStyles from '../styles'

const { useMonitoringDispatch } = Modules;
function Monitoring(props) {
    const dispatch = useMonitoringDispatch();
    const classes = useStyles();
    const [ fav, setFav ] = useState(false);
    const [ search, setSearch ] = useState(false);
    const { title, type, data = [] } = props;
    const maxValue = data.length && Math.max(...data.map(d =>d.price));
    const minValue = data.length && Math.min(...data.map(d =>d.price));
    const isAsksBids = props.type === 'asks' ||  props.type === 'bids';

    let filteredData = search ? search : data;
    // handle on search function in the Trading Terminal
    const _onSearch = evt => {
        const target = evt.target;
        const value = target.value;

        // Start searching if the input value is more than 3 characters
        if (value.length > 3) {
            const filterData = data.filter(d => {
                return (
                    d.name.toLowerCase().search(value.toLowerCase()) !== -1
                );
            });

            setSearch(filterData);
        } else {
            setSearch(data);
        }
    };

    let _handleStorePayload = () => {};

    if (isAsksBids) {
        // SET PAYLOAD DATA FOR ORDERS
        _handleStorePayload = data => {
            MonitoringActions.setBidAndAsk(dispatch, data);
        }
    }

    return (
        <React.Fragment>
            <section className={classes.monitoring}>
                {title && (
                    <Typography 
                        className={classes.monitoringTitle} 
                        variant="h1"
                    >
                        {title}
                    </Typography>
                )}
                {type === 'bids' && (
                    <section className={classes.bidsHeader}>
                        <Typography 
                            className={classes.maxBidsTitle} 
                            variant="h3"
                        >
                            {maxValue}<ArrowUpwardRoundedIcon fontSize='small' />
                        </Typography>
                        <Typography 
                            className={classes.minBidsTitle} 
                            variant="h3"
                        >
                            {minValue}
                        </Typography>
                    </section>
                )}
                {type === 'asks' && (
                    <ul className={classes.monitoringHeader}>
                        <li>
                        Price({props.quoteData?.symbol}) {maxValue}
                        </li>
                        <li>
                        Amount({props.listingData?.asset?.symbol}) 
                        </li>
                        <li>
                        Total({props.quoteData?.symbol}) 
                        </li>
                    </ul>
                )}
                {type === 'marketList' && (
                    <React.Fragment>
                        <div className={classes.actionContainer}>
                            <button onClick={() => setFav(!fav)}>
                                {fav ?
                                    <StarIcon fontSize='small' />
                                    :
                                    <StarBorderIcon fontSize='small' />
                                }
                            </button>
                            {/* TODO: Implementation of the Filter Buttons */}
                            <button className={classes.actionBtn}>SGD</button>
                            <button className={classes.actionBtn}>USD</button>
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
                                Pair <ArrowDropUpIcon fontSize='small' color='disabled' />
                            </li>
                            <li className={classes.marketHeaderItem}>
                                Price
                            </li>
                        </ul>
                    </React.Fragment>
                )}
                <ul className={classes.monitoringList}>
                    {filteredData.map((d, i ) => {
                        const activeStyle = d.side?.toLowerCase() === 'bid' || type === 'bids'  ? classes.positiveCell : classes.negativeCell;
                        const priceStyle = classNames(
                            classes.defaultListItemStyle, 
                            activeStyle
                        );

                        const renderMonitoringEl = item => {
                            switch(item) {
                                case 'marketList':
                                    return (
                                        <React.Fragment>
                                            <p className={classes.defaultListItemStyle} data-value={i}>
                                                <StarBorderIcon fontSize='small' />
                                                <Link 
                                                    className={classes.marketLink}
                                                    to={`/market-list/${d._id}`}>
                                                    {d.name}
                                                </Link>
                                            </p>
                                            <p className={classes.defaultListItemStyle}>{numberWithCommas(d.amount?.toFixed(2) || 0)}</p>
                                        </React.Fragment>
                                    )
                                case 'tradeHistory':
                                    return (
                                        <React.Fragment>
                                            <p className={priceStyle}>{numberWithCommas(d.price?.toFixed(2))}</p>
                                            <p className={classes.defaultListItemStyle}>{numberWithCommas(d.amount?.toFixed(2) || 0)}</p>
                                            <p className={classes.defaultListItemStyle}>{moment(d.createdAt).format(TIME_FORMAT)}</p>
                                        </React.Fragment>
                                    );
                                default: 
                                    return (
                                        <React.Fragment>
                                            <div className={classes.graph} />
                                            <p className={priceStyle}>{numberWithCommas(d.price?.toFixed(4))}</p>
                                            <p className={classes.defaultListItemStyle}>{numberWithCommas(d.amount?.toFixed(4) || 0)}</p>
                                            <p className={classes.defaultListItemStyle}>{numberWithCommas(d.total?.toFixed(4))}</p>
                                        </React.Fragment>
                                    );
                            }
                        }

                        return (
                            <li 
                                key={i}
                                className={classes.monitoringListItem}
                                onClick={() => _handleStorePayload(d)}
                            >   
                                {renderMonitoringEl(type)}
                            </li>   
                        );
                    })}
                </ul>
            </section>
        </React.Fragment>
    )
}

export default withRouter(Monitoring)
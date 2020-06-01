import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
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

// Modules
import MonitoringActions from './modules/actions';
import Modules from './modules';

// Styles
import useStyles from '../styles'

const { MonitoringState, useMonitoringDispatch } = Modules;
function Monitoring(props) {
    const dispatch = useMonitoringDispatch();
    const state = MonitoringState();
    const classes = useStyles();
    const [ fav, setFav ] = useState(false);
    const [ search, setSearch ] = useState(false);
    const { title, type, data = [] } = props;
    const maxValue = data.length && Math.max(...data.map(d =>d.price));
    const minValue = data.length && Math.min(...data.map(d =>d.price));

    const isAsksBids = props.type === 'asks' ||  props.type === 'bids';

    let filteredData = search ? search : data;
    
    const _onSearch = evt => {
        const target = evt.target;
        const value = target.value;

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
            {title && (
                <Typography 
                    className={classes.monitoringTitle} 
                    variant="h1"
                >
                    {title}
                </Typography>
            )}
            <section className={classes.monitoring}>
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
                        Price(SGD) {maxValue}
                        </li>
                        <li>
                        Amount(IXPS) 
                        </li>
                        <li>
                        Total(SGD) 
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

                        return (
                            <li 
                                key={i}
                                className={classes.monitoringListItem}
                                onClick={() => _handleStorePayload(d)}
                            >   
                                {type === 'marketList' && ( 
                                    <p className={classes.defaultListItemStyle} data-value={i}>
                                        <StarBorderIcon fontSize='small' /> {d.name}
                                    </p>
                                )}
                                {type !== 'marketList' && (
                                    <p className={priceStyle}>{d.price}</p>
                                )}
                                <p className={classes.defaultListItemStyle}>{d.amount || 0}</p>
                                {type === 'tradeHistory' ?
                                    <p className={classes.defaultListItemStyle}>{moment(d.createdAt).format(TIME_FORMAT)}</p>
                                    :
                                    <p className={classes.defaultListItemStyle}>{d.total}</p>
                                }
                            </li>   
                        );
                    })}
                </ul>
            </section>
        </React.Fragment>
    )
}

export default withRouter(Monitoring)

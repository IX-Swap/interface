export const API_URL = process.env.REACT_APP_API_URL || '';

export const DATE_FORMAT = 'MM/DD/YYYY';
export const TIME_FORMAT = 'HH:MM:SS';

export const ENDPOINT_URL = {
    EXCHANGE_API: {
        GET_MARKET_LIST: '/exchange/markets/list',
    },
    SUBSCRIBE_API: {
        ORDER_BOOK: {
            emit: 'orderbook/get',
            on: 'orderbook',
        },
        MY_ORDERS: {
            emit: 'myorders/get',
            on: 'myorders',
        },
        TRADE_HISTORY: {
            emit: 'fills/get',
            on: 'fills',
        },
        BIDS_ASKS: {
            emit: 'balances/get',
            on: 'balances',
        },
    },
};
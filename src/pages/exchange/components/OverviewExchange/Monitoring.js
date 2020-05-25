import React from 'react'
import { withRouter } from 'react-router-dom'
import classNames from 'classnames'

// Material Components
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
// Styles
import useStyles from './styles'

const data = [
    {
        price: '9777.16',
        amount: '0.200000',
        total: '1,955.01234567',
        isPositive: false,
    },
    {
        price: '9777.16',
        amount: '0.200000',
        total: '1,955.01234567',
        isPositive: false,
    },
    {
        price: '9777.16',
        amount: '0.200000',
        total: '1,955.01234',
        isPositive: true,
    },
    {
        price: '9777.16',
        amount: '0.200000',
        total: '1,955.012348',
        isPositive: true,
    },
    {
        price: '9777.16',
        amount: '0.200000',
        total: '1,955.01234567',
        isPositive: false,
    },
    {
        price: '9777.16',
        amount: '0.200000',
        total: '1,955.01234567',
        isPositive: true,
    },
    {
        price: '9777.16',
        amount: '0.200000',
        total: '1,955.01234',
        isPositive: false,
    },
    {
        price: '9777.16',
        amount: '0.200000',
        total: '1,955.012348',
        isPositive: false,
    },
    {
        price: '9777.16',
        amount: '0.200000',
        total: '1,955.01234567',
        isPositive: true,
    },
    {
        price: '9777.16',
        amount: '0.200000',
        total: '1,955.01234567',
        isPositive: false,
    },
    {
        price: '9777.16',
        amount: '0.200000',
        total: '1,955.01234',
        isPositive: false,
    },
    {
        price: '9777.16',
        amount: '0.200000',
        total: '1,955.012348',
        isPositive: false,
    },
    {
        price: '9777.16',
        amount: '0.200000',
        total: '1,955.01234567',
        isPositive: false,
    },
    {
        price: '9777.16',
        amount: '0.200000',
        total: '1,955.01234567',
        isPositive: false,
    },
    {
        price: '9777.16',
        amount: '0.200000',
        total: '1,955.01234',
        isPositive: false,
    },
    {
        price: '9777.16',
        amount: '0.200000',
        total: '1,955.012348',
        isPositive: false,
    },
    {
        price: '9777.16',
        amount: '0.200000',
        total: '1,955.01234567',
        isPositive: false,
    },
    {
        price: '9777.16',
        amount: '0.200000',
        total: '1,955.01234567',
        isPositive: false,
    },
    {
        price: '9777.16',
        amount: '0.200000',
        total: '1,955.01234',
        isPositive: false,
    },
    {
        price: '9777.16',
        amount: '0.200000',
        total: '1,955.012348',
        isPositive: false,
    },
    {
        price: '9777.16',
        amount: '0.200000',
        total: '1,955.01234567',
        isPositive: false,
    },
    {
        price: '9777.16',
        amount: '0.200000',
        total: '1,955.01234567',
        isPositive: false,
    },
    {
        price: '9777.16',
        amount: '0.200000',
        total: '1,955.01234',
        isPositive: false,
    },
    {
        price: '9777.16',
        amount: '0.200000',
        total: '1,955.012348',
        isPositive: false,
    },
    {
        price: '9777.16',
        amount: '0.200000',
        total: '1,955.01234567',
        isPositive: false,
    },
];

function Monitoring(props) {
    const { title } = props; 
    const classes = useStyles()
    console.log('classes.monitoringListValue', classes.monitoringListValue);
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
                <ul className={classes.monitoringHeader}>
                    <li>
                    Price(SGD) 
                    </li>
                    <li>
                    Amount(IXPS) 
                    </li>
                    <li>
                    Total(SGD) 
                    </li>
                </ul>
                <ul className={classes.monitoringList}>
                    {data.map((d, i ) => {
                        const activeStyle = d.isPositive ? classes.positiveCell : classes.negativeCell;
                        return (
                            <li 
                                key={i}
                                className={classes.monitoringListItem}
                            >
                                <p className={classNames(classes.defaultListItemStyle, activeStyle)}>{d.price}</p>
                                <p className={classes.defaultListItemStyle}>{d.amount}</p>
                                <p className={classes.defaultListItemStyle}>{d.total}</p>
                            </li>   
                        );
                    })}
                </ul>
            </section>
        </React.Fragment>
    )
}

export default withRouter(Monitoring)

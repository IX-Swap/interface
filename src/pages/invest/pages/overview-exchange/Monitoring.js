import React from 'react'
import { withRouter } from 'react-router-dom'

import useStyles from './styles'

const data = [
    {
        price: '9777.16',
        amount: '0.200000',
        total: '1,955.01234567',
    },
    {
        price: '9777.16',
        amount: '0.200000',
        total: '1,955.01234567',
    },
    {
        price: '9777.16',
        amount: '0.200000',
        total: '1,955.01234',
    },
    {
        price: '9777.16',
        amount: '0.200000',
        total: '1,955.012348',
    }
];

function Monitoring() {
    const classes = useStyles()
    
    return (
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
                {data.map((d, i ) =>
                    <li 
                        key={i}
                        className={classes.monitoringListItem}
                    >
                        <p className={classes.monitoringListValue}>{d.price}</p>
                        <p className={classes.monitoringListValue}>{d.amount}</p>
                        <p className={classes.monitoringListValue}>{d.total}</p>
                    </li>    
                )}
            </ul>
        </section>
    )
}

export default withRouter(Monitoring)

import React from 'react'
import { Grid, Typography } from '@mui/material'

export const CryptoHoldingContent = () => {
  return (
    <>
      <Grid container justifyContent='center' spacing={2}>
        <Grid item>
          <Typography mb={2} color={'text.secondary'} fontWeight={800}>
            1. Proof of cryptocurrency holdings
          </Typography>
          <Typography color={'text.secondary'} fontWeight={500}>
            You can submit statements or clear screenshots of wallets/exchange
            balance showing holdings of BTC, ETH, USDC. Statement/screenshot
            should clearly show your: <br /> (1) your full name; <br /> (2) date
            of statement; <br />
            (3) the value of your cryptocurrencies holdings for the coins
            mentioned above, and <br /> (4) the exchange or wallet providers
            name <br />
            <br />
            Exchanges and wallets from Tier 1 exchanges, digital asset banks
            e.g. Coin Hako, Binance, Gemini, Crypto.com, Meta Mask, Kucoin,
            Kraken, Gate.io, Coinbase, Sygnum may be accepted.
          </Typography>
        </Grid>
        <Grid item>
          <Typography mb={2} color={'text.secondary'} fontWeight={800}>
            2. Acceptable valuation for cryptocurrencies
          </Typography>
          <Typography color={'text.secondary'} fontWeight={500}>
            Cryptocurrency holdings will be accepted as part of your net
            personal asset at 50% value for BTC/ETH, and 90% for USDC, to
            account for market volatility that has been observed. <br /> E.g.
            USD 10,000 worth of BTC will be valued at USD 5,000. Similarly, USD
            10,000 worth of USDC will be valued at USD 9,000. <br />
            InvestaX may review and revise these coins and discount rates at
            regular intervals as market conditions change.
          </Typography>
        </Grid>
        <Grid item>
          <Typography mb={2} color={'text.secondary'} fontWeight={800}>
            3. Qualifying as an Accredited Investor based on your cryptocurrency
            holdings
          </Typography>
          <Typography color={'text.secondary'} fontWeight={500}>
            Your cryptocurrency holdings are accepted as your "net personal
            assets”. To qualify as an accredited investor you will have to meet
            the following criteria: <br /> Have net personal assets exceeding
            S$2,000,000 (or its equivalent in foreign currency), of which net
            equity of the individual’s primary residence is no more than
            S$1,000,000. <br />
            We currently accept three cryptocurrencies – BTC, ETH, and USDC.{' '}
            <br /> BTC and ETH will be valued at 50% and USDC will be valued at
            90% to account for market volatility.
          </Typography>
          <br />
          <Typography color={'text.secondary'} fontWeight={500}>
            1. If you submit CSV files as proof of cryptocurrency holdings, we
            may come back to you with some more clarifications. We will assess
            each CSV file submitted as a proof of cryptocurrency holdings on a
            case by case basis.
          </Typography>
          <br />
          <Typography color={'text.secondary'} fontWeight={500}>
            2. We will accept and assess the statements from exchanges or wallet
            screenshots on a case by case basis.
          </Typography>
          <br />
          <Typography color={'text.secondary'} fontWeight={500}>
            This means USD 10,000 worth of BTC will be valued at USD 5,000.
            Similarly, USD 10,000 worth of USDC will be valued at USD 9,000.{' '}
            <br />
            InvestaX will review these coins and discount rates at regular
            intervals as market conditions change.
          </Typography>
        </Grid>
      </Grid>
    </>
  )
}

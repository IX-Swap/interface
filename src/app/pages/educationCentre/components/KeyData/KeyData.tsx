import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography
} from '@material-ui/core'
import { Security } from 'app/pages/educationCentre/components/Securities/SecurityCard'
import { hasValue } from 'helpers/forms'
import { formatMoney } from 'helpers/numbers'
import React from 'react'

export interface KeyDataProps {
  data: Security
}

export const KeyData = ({ data }: KeyDataProps) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Table>
          <TableBody>
            {hasValue(data.marketCapitalization) ? (
              <TableRow hover>
                <TableCell>Estimated Market Capitalization:</TableCell>
                <TableCell align='right'>
                  <Typography variant='subtitle1'>
                    {formatMoney(data.marketCapitalization ?? 0, '$')}
                  </Typography>
                </TableCell>
              </TableRow>
            ) : null}

            {hasValue(data.currentPrice) ? (
              <TableRow hover>
                <TableCell>Current Price:</TableCell>
                <TableCell align='right'>
                  <Typography variant='subtitle1'>
                    {formatMoney(data.currentPrice ?? 0, '$')}
                  </Typography>
                </TableCell>
              </TableRow>
            ) : null}

            {hasValue(data.issuanceDate) ? (
              <TableRow hover>
                <TableCell>Issuance Date:</TableCell>
                <TableCell align='right'>
                  <Typography variant='subtitle1'>
                    {data.issuanceDate}
                  </Typography>
                </TableCell>
              </TableRow>
            ) : null}

            {hasValue(data.country) ? (
              <TableRow hover>
                <TableCell>Country:</TableCell>
                <TableCell align='right'>
                  <Typography variant='subtitle1'>{data.country}</Typography>
                </TableCell>
              </TableRow>
            ) : null}

            {hasValue(data.industry) ? (
              <TableRow hover>
                <TableCell>Industry:</TableCell>
                <TableCell align='right'>
                  <Typography variant='subtitle1'>{data.industry}</Typography>
                </TableCell>
              </TableRow>
            ) : null}

            {hasValue(data.protocol) ? (
              <TableRow hover>
                <TableCell>Protocol:</TableCell>
                <TableCell align='right'>
                  <Typography variant='subtitle1'>{data.protocol}</Typography>
                </TableCell>
              </TableRow>
            ) : null}

            {hasValue(data.exchange) ? (
              <TableRow hover>
                <TableCell>Exchange:</TableCell>
                <TableCell align='right'>
                  <Typography variant='subtitle1'>{data.exchange}</Typography>
                </TableCell>
              </TableRow>
            ) : null}

            {hasValue(data.tokenSupply) ? (
              <TableRow hover>
                <TableCell>Token Supply:</TableCell>
                <TableCell align='right'>
                  <Typography variant='subtitle1'>
                    {data.tokenSupply}
                  </Typography>
                </TableCell>
              </TableRow>
            ) : null}

            {hasValue(data.tokensOffered) ? (
              <TableRow hover>
                <TableCell>Tokens Offered:</TableCell>
                <TableCell align='right'>
                  <Typography variant='subtitle1'>
                    {data.tokensOffered}
                  </Typography>
                </TableCell>
              </TableRow>
            ) : null}

            {hasValue(data.reserved) ? (
              <TableRow hover>
                <TableCell>Tokens Reserved:</TableCell>
                <TableCell align='right'>
                  <Typography variant='subtitle1'>{data.reserved}</Typography>
                </TableCell>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </Grid>
    </Grid>
  )
}

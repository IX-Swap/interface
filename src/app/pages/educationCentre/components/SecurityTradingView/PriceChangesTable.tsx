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
import React from 'react'

export interface PriceChangesTableProps {
  data: Security
}

export const PriceChangesTable = ({ data }: PriceChangesTableProps) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant='h5'>Price Changes</Typography>
      </Grid>
      <Grid item xs={12}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>24 Hours</TableCell>
              <TableCell align='right'>
                {hasValue(data.priceChange24Hours)
                  ? `${data.priceChange24Hours?.toFixed(2) ?? 0}%`
                  : '-'}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>1 Week</TableCell>
              <TableCell align='right'>
                {hasValue(data.priceChange1Week)
                  ? `${data.priceChange1Week?.toFixed(2) ?? 0}%`
                  : '-'}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>1 Month</TableCell>
              <TableCell align='right'>
                {hasValue(data.priceChange1Month)
                  ? `${data.priceChange1Month?.toFixed(2) ?? 0}%`
                  : '-'}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>YTD</TableCell>
              <TableCell align='right'>
                {hasValue(data.priceChangeYTD)
                  ? `${data.priceChangeYTD?.toFixed(2) ?? 0}%`
                  : '-'}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>1 Year</TableCell>
              <TableCell align='right'>
                {hasValue(data.priceChange1Year)
                  ? `${data.priceChange1Year?.toFixed(2) ?? 0}%`
                  : '-'}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Grid>
    </Grid>
  )
}

import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography
} from '@material-ui/core'
import { Security } from 'app/pages/home/components/Securities/SecurityCard'
import { hasValue } from 'helpers/forms'
import { formatMoney } from 'helpers/numbers'
import React from 'react'

export interface YearlyAnalysisProps {
  data: Security
}

export const YearlyAnalysis = ({ data }: YearlyAnalysisProps) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant='h5'>Yearly Analysis</Typography>
      </Grid>
      <Grid item xs={12}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>High</TableCell>
              <TableCell align='right'>
                {hasValue(data.oneYearLowPrice)
                  ? formatMoney(data.oneYearLowPrice ?? 0, '$')
                  : '-'}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Low</TableCell>
              <TableCell align='right'>
                {hasValue(data.oneYearHighPrice)
                  ? formatMoney(data.oneYearHighPrice ?? 0, '$')
                  : '-'}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Median </TableCell>
              <TableCell align='right'>
                {hasValue(data.oneYearMedianPrice)
                  ? formatMoney(data.oneYearMedianPrice ?? 0, '$')
                  : '-'}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Average</TableCell>
              <TableCell align='right'>
                {hasValue(data.oneYearAveragePrice)
                  ? formatMoney(data.oneYearAveragePrice ?? 0, '$')
                  : '-'}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Average Monthly Return </TableCell>
              <TableCell align='right'></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Average Daily Volume </TableCell>
              <TableCell align='right'>
                {hasValue(data.oneYearAverageDailyVolume)
                  ? formatMoney(data.oneYearAverageDailyVolume ?? 0, '$')
                  : '-'}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Grid>
    </Grid>
  )
}

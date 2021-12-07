import {
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography
} from '@material-ui/core'
import { FundingLinearProgress } from 'app/pages/educationCentre/components/Funding/FundingLinearProgress'
import { Security } from 'app/pages/educationCentre/components/Securities/SecurityCard'
import React from 'react'

export interface FundingProps {
  data: Security
}

export const Funding = ({ data }: FundingProps) => {
  const fundingGoal = parseInt(
    data.fundingGoal?.substring(1).replace(',', '') ?? '0'
  )
  const amountRaised = parseInt(
    data.amountRaised?.substring(1).replace(',', '') ?? '0'
  )

  const progressValue = (amountRaised / fundingGoal) * 100

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Box display='flex' justifyContent='space-between'>
          <Box width='100%' mr={2}>
            <FundingLinearProgress
              variant='determinate'
              value={progressValue > 100 ? 100 : progressValue}
            />
          </Box>
          <Box>
            <Typography
              variant='h5'
              style={{ lineHeight: '40px' }}
              align='center'
              noWrap
            >
              {progressValue.toFixed(0)}%
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Table>
          <TableBody>
            <TableRow hover>
              <TableCell>Funding Goal:</TableCell>
              <TableCell align='right'>
                <Typography variant='subtitle1'>{data.fundingGoal}</Typography>
              </TableCell>
            </TableRow>
            <TableRow hover>
              <TableCell>Estimated Amount Raised: </TableCell>
              <TableCell align='right'>
                <Typography variant='subtitle1'>{data.amountRaised}</Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Grid>
    </Grid>
  )
}

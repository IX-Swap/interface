import React from 'react'
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '@material-ui/core'

// components
import { Button } from '../../../components/Wrappers/Wrappers'

const states = {
  sent: 'success',
  pending: 'warning',
  declined: 'secondary',
  success: 'success'
}

export default function TransactionsTable({ data }) {
  return (
    <Table className='mb-0'>
      <TableHead>
        <TableRow>
          <TableCell>Txn Hash</TableCell>
          <TableCell>Block</TableCell>
          <TableCell>Timestamp</TableCell>
          <TableCell>From</TableCell>
          <TableCell>To</TableCell>
          <TableCell>Amount</TableCell>
          <TableCell>Status</TableCell>
        </TableRow>
      </TableHead>
        <TableBody>
          {data.map(({ txnHash, block, timestamp, from, to, amount, status }, i) => (
            <TableRow key={i}>
              <TableCell className='pl-3 fw-normal'>{addressShortener(txnHash)}</TableCell>
              <TableCell>{block}</TableCell>
              <TableCell>{timestamp}</TableCell>
              <TableCell>{addressShortener(from)}</TableCell>
              <TableCell>{addressShortener(to)}</TableCell>
              <TableCell>{amount}</TableCell>
              <TableCell>
                <Button
                  color={states[status.toLowerCase()]}
                  size='small'
                  className='px-2'
                  variant='contained'
                >
                  {status}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
    </Table>
  )
}

function addressShortener (address) {
  return address.substring(0, 4) + '...' + address.substring(address.length, address.length - 4)
}

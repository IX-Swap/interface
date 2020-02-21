import React from 'react'
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '@material-ui/core'
import { Link } from 'react-router-dom'
// components
import { Button } from '../../../components/Wrappers'

const states = {
  complete: 'success',
  open: 'blue',
  pending: 'warning'
}


export default function TableComponent ({ data, location }) {
  return (
    <Table className='mb-0'>
      <TableHead>
        <TableRow>
          <TableCell>Symbol</TableCell>
          <TableCell>Name</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((dso, i) => (
          <TableRow key={i} hover onClick={() => location.history.push(`/app/offering/${dso.symbol}`)}>
            <TableCell className='pl-3 fw-normal'>{dso.symbol}</TableCell>
            <TableCell>{dso.name}</TableCell>
            <TableCell>
              <Button
                color={'complete'}
                size='small'
                className='px-2'
                variant='contained'
              >
                Complete
              </Button>
              </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

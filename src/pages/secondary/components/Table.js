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
          <TableCell>Serial</TableCell>
          <TableCell>Structure</TableCell>
          <TableCell>Type</TableCell>
          <TableCell>Raised</TableCell>
          <TableCell>Total Stupply</TableCell>
          <TableCell>Status</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((offer, i) => (
          <TableRow key={i} hover onClick={() => location.history.push(`/app/exchange/${offer.overview.serialNumber}`)}>
            <TableCell className='pl-3 fw-normal'>{offer.overview.serialNumber}</TableCell>
            <TableCell>{offer.overview.capitalStructure}</TableCell>
            <TableCell>{offer.overview.investmentType}</TableCell>
            <TableCell>{offer.information.percentRaised}</TableCell>
            <TableCell>{offer.overview.totalSupply}</TableCell>
            <TableCell>
              <Button
                color={states[offer.overview.status.toLowerCase()]}
                size='small'
                className='px-2'
                variant='contained'
              >
                {offer.overview.status}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

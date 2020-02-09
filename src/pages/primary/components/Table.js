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
          <TableCell key={0}>Serial</TableCell>
          <TableCell key={1}>Structure</TableCell>
          <TableCell key={2}>Type</TableCell>
          <TableCell key={3}>Raised</TableCell>
          <TableCell key={4}>Total Stupply</TableCell>
          <TableCell key={5}>Status</TableCell>

        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((offer, i) => {
          const { overview, information } = offer
          return (<TableRow key={i} hover onClick={() => location.history.push(`/app/offering/${overview.serialNumber}`)}>
            <TableCell>{overview.serialNumber}</TableCell>
            <TableCell>{overview.capitalStructure}</TableCell>
            <TableCell>{overview.investmentType}</TableCell>
            <TableCell>{information.percentRaised}</TableCell>
            <TableCell>{overview.totalSupply}</TableCell>
            <TableCell>
              <Button
                color={states[overview.status.toLowerCase()]}
                size='small'
                className='px-2'
                variant='contained'
              >
                {overview.status}
              </Button>
            </TableCell>
          </TableRow>
        )})}
      </TableBody>
    </Table>
  )
}

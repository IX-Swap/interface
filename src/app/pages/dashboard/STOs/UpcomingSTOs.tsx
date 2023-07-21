import React from 'react'
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box
} from '@mui/material'
import { FieldContainer } from 'ui/FieldContainer/FieldContainer'

function createData(name: string, status: string, date: string) {
  return { name, status, date }
}

const rows = [
  createData('NovaTech', 'Launch', '10/07/2023'),
  createData('Quantum', 'Launch', '10/07/2023'),
  createData('Apex Dynamics', 'Launch', '10/07/2023')
]

const tableCellStyles = {
  paddingLeft: 0,
  paddingRight: 0,
  borderTop: '1px solid #EDF2FA',
  borderBottom: 0
}

export const UpcomingSTOs = () => {
  return (
    <FieldContainer>
      <Typography variant='h5' color={'otpInput.color'}>
        Calendar
      </Typography>
      <TableContainer component={Paper} sx={{ marginTop: '15px' }}>
        <Table aria-label='Upcoming STOs'>
          <TableHead>
            <TableRow>
              <TableCell sx={{ ...tableCellStyles }}>
                <Typography color={'text.secondary'}>STO</Typography>
              </TableCell>
              <TableCell align='right' sx={{ ...tableCellStyles }}>
                <Typography color={'text.secondary'}>Status</Typography>
              </TableCell>
              <TableCell align='right' sx={{ ...tableCellStyles }}>
                <Typography color={'text.secondary'}>Date</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow sx={{ ...tableCellStyles }} key={row.name}>
                <TableCell sx={{ ...tableCellStyles }}>
                  <Box display={'flex'} gap={1}>
                    <Typography color={'otpInput.color'}>{row.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell
                  align='right'
                  sx={{ ...tableCellStyles, color: '#6ABC10' }}
                >
                  {row.status}
                </TableCell>
                <TableCell
                  align='right'
                  sx={{ ...tableCellStyles, color: '#6ABC10' }}
                >
                  <Typography color={'text.secondary'}>{row.date}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </FieldContainer>
  )
}

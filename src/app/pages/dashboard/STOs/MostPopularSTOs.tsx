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

function createData(name: string, symbol: string, volume: number) {
  return { name, symbol, volume }
}

const rows = [
  createData('Avalanche', 'AVAX', 5.7),
  createData('Terra', 'LUNA', 5.7),
  createData('Polygon', 'MATIC', 5.7)
]

const tableCellStyles = {
  paddingLeft: 0,
  paddingRight: 0,
  borderTop: '1px solid #EDF2FA',
  borderBottom: 0
}

export const MostPopularSTOs = () => {
  return (
    <FieldContainer>
      <Typography variant='h5' color={'otpInput.color'}>
        Most Popular
      </Typography>
      <TableContainer component={Paper} sx={{ marginTop: '15px' }}>
        <Table aria-label='Most Popular STOs'>
          <TableHead>
            <TableRow>
              <TableCell sx={{ ...tableCellStyles }}>
                <Typography color={'text.secondary'}>STO</Typography>
              </TableCell>
              <TableCell align='right' sx={{ ...tableCellStyles }}>
                <Typography color={'text.secondary'}>Volume (24h)</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow sx={{ ...tableCellStyles }} key={row.symbol}>
                <TableCell sx={{ ...tableCellStyles }}>
                  <Box display={'flex'} gap={1}>
                    <Typography color={'otpInput.color'}>{row.name}</Typography>
                    <Typography color={'#778194'} sx={{ opacity: 0.5 }}>
                      {row.symbol}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell
                  align='right'
                  sx={{ ...tableCellStyles, color: '#6ABC10' }}
                >
                  {row.volume} %
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </FieldContainer>
  )
}

import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  TableSortLabel,
} from '@mui/material'
import { styled } from '@mui/system'
import { TYPE } from 'theme'
import { ReactComponent as Serenity } from '../../../assets/images/serenity.svg'
import { ReactComponent as USDC } from '../../../assets/images/usdcNew.svg'
import { EmptyTable } from '../Dashboard/EmptyTable'

interface Trade {
  time: string
  tokenPrice: number
  address: string
  amount: number
  type: string
  changedAmt: number
}

const initialData: Trade[] = [
  {
    time: '01/10/2024 03:48AM SGT',
    tokenPrice: 100,
    address: '0x123456789',
    amount: 10,
    changedAmt: 10.03,
    type: 'Buy',
  },
  {
    time: '01/10/2024 03:48AM SGT',
    tokenPrice: 110,
    address: '0x987654321',
    amount: 20,
    changedAmt: 8.03,
    type: 'Sell',
  },
  {
    time: '01/10/2024 03:48AM SGT',
    tokenPrice: 100,
    address: '0x123456789',
    amount: 10,
    changedAmt: 12.03,
    type: 'Buy',
  },
  {
    time: '01/10/2024 03:48AM SGT',
    tokenPrice: 110,
    address: '0x987654321',
    amount: 20,
    changedAmt: 11.03,
    type: 'Sell',
  },
  {
    time: '01/10/2024 03:48AM SGT',
    tokenPrice: 100,
    address: '0x123456789',
    amount: 10,
    changedAmt: 7.03,
    type: 'Buy',
  },
  {
    time: '01/10/2024 03:48AM SGT',
    tokenPrice: 110,
    address: '0x987654321',
    amount: 20,
    changedAmt: 1.03,
    type: 'Sell',
  },
  {
    time: '01/10/2024 03:48AM SGT',
    tokenPrice: 100,
    address: '0x123456789',
    amount: 10,
    changedAmt: 80.3,
    type: 'Buy',
  },
  {
    time: '01/10/2024 03:48AM SGT',
    tokenPrice: 110,
    address: '0x987654321',
    amount: 20,
    changedAmt: 10.3,
    type: 'Sell',
  },
  {
    time: '01/10/2024 03:48AM SGT',
    tokenPrice: 100,
    address: '0x123456789',
    amount: 10,
    changedAmt: 10.3,
    type: 'Buy',
  },
  {
    time: '01/10/2024 03:48AM SGT',
    tokenPrice: 110,
    address: '0x987654321',
    amount: 20,
    changedAmt: 10.3,
    type: 'Sell',
  },
]

const StyledTableCell = styled(TableCell)({
  fontSize: '14px',
  fontWeight: 500,
  color: '#8F8FB2',
})

const StyledDivBuy = styled('div')({
  border: '1px solid #1FBA6633',
  borderRadius: '4px',
  fontSize: '13px',
  fontWeight: 500,
  color: '#1FBA66',
  width: 'fit-content',
  backgroundColor: '#E9FAF0',
  padding: '6px 12px',
})

const StyledDivSell = styled('div')({
  border: '1px solid #FF616133',
  borderRadius: '4px',
  fontSize: '13px',
  fontWeight: 500,
  backgroundColor: '#FFEFF0',
  color: '#FF6161',
  padding: '6px 12px',
  width: 'fit-content',
})

const VerticalLine = styled('div')({
  width: '1px',
  height: '20px',
  backgroundColor: '#e5e5ff',
  margin: '7px 10px',
})

export default function TradeHistory() {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [data, setData] = useState<Trade[]>(initialData)
  const [orderBy, setOrderBy] = useState<string>('')
  const [order, setOrder] = useState<'asc' | 'desc'>('asc')

  const handleSort = (property: keyof Trade) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrderBy(property)
    setOrder(isAsc ? 'desc' : 'asc')
    setData((prevData) =>
      [...prevData].sort((a, b) => {
        const aValue = a[property]
        const bValue = b[property]

        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return isAsc ? aValue - bValue : bValue - aValue
        }

        return isAsc
          ? aValue.toString().localeCompare(bValue.toString())
          : bValue.toString().localeCompare(aValue.toString())
      })
    )
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <>
      <TYPE.title5 style={{ marginTop: '30px' }}>Trade History</TYPE.title5>
      <Paper style={{ boxShadow: 'none' }}>
        <TableContainer style={{ margin: '10px 0px', boxShadow: 'none' }}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>
                  <TableSortLabel
                    active={orderBy === 'time'}
                    direction={orderBy === 'time' ? order : 'asc'}
                    onClick={() => handleSort('time')}
                  >
                    Time
                  </TableSortLabel>
                </StyledTableCell>
                <StyledTableCell>
                  <TableSortLabel
                    active={orderBy === 'tokenPrice'}
                    direction={orderBy === 'tokenPrice' ? order : 'asc'}
                    onClick={() => handleSort('tokenPrice')}
                  >
                    Token Price
                  </TableSortLabel>
                </StyledTableCell>
                <StyledTableCell>
                  <TableSortLabel
                    active={orderBy === 'address'}
                    direction={orderBy === 'address' ? order : 'asc'}
                    onClick={() => handleSort('address')}
                  >
                    Address
                  </TableSortLabel>
                </StyledTableCell>
                <StyledTableCell>
                  <TableSortLabel
                    active={orderBy === 'amount'}
                    direction={orderBy === 'amount' ? order : 'asc'}
                    onClick={() => handleSort('amount')}
                  >
                    Amount
                  </TableSortLabel>
                </StyledTableCell>
                <StyledTableCell>
                  <TableSortLabel
                    active={orderBy === 'type'}
                    direction={orderBy === 'type' ? order : 'asc'}
                    onClick={() => handleSort('type')}
                  >
                    Type
                  </TableSortLabel>
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5}>
                    <EmptyTable isSearch={true} />
                  </TableCell>
                </TableRow>
              ) : (
                data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <span>{row.time.split(' ')[0]}</span>{' '}
                      <span style={{ color: '#8F8FB2' }}>{row.time.split(' ')[1]}</span>{' '}
                    </TableCell>
                    <TableCell>${row.tokenPrice}</TableCell>
                    <TableCell style={{ color: '#8F8FB2' }}>{row.address}</TableCell>
                    <TableCell style={{ display: 'flex', gap: '8px' }}>
                      <Serenity />
                      {row.amount}k <VerticalLine /> <USDC />{' '}
                      <span style={{ color: index <= 4 ? '#FF6161' : '#1FBA66' }}>{row.changedAmt}k </span>
                    </TableCell>
                    {row.type === 'Buy' ? (
                      <StyledTableCell>
                        <StyledDivBuy>{row.type}</StyledDivBuy>
                      </StyledTableCell>
                    ) : (
                      <StyledTableCell>
                        <StyledDivSell>{row.type}</StyledDivSell>
                      </StyledTableCell>
                    )}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  )
}

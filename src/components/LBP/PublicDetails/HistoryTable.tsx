import React, { useState, useMemo, useCallback } from 'react'
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
import { useSubgraphQuery } from 'hooks/useSubgraphQuery'
import { useWeb3React } from '@web3-react/core'
import { unixTimeToFormat } from 'utils/time'
import { ethers } from 'ethers'
import { getTokenOption } from 'pages/LBP/components/Tokenomics'

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

const composeLatestTradeQuery = (lbpAddress: string) => {
  return `
    {
      trades(where:{ pool_:{ id:"${lbpAddress}"}}, orderBy: blockTimestamp, orderDirection: desc) {
          amountOut
          amountIn
          blockNumber
          blockTimestamp
          swapFee
          transactionHash
          type
          usdPrice
          id
          pool {
            id
            shareAddress
            assetAddress
          }
          caller {
            id
          }
      }
    }
  `
}

export default function TradeHistory() {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [data, setData] = useState<Trade[]>(initialData)
  const [orderBy, setOrderBy] = useState<string>('')
  const [order, setOrder] = useState<'asc' | 'desc'>('asc')

  const { chainId } = useWeb3React()

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

  const getShareDecimals = (tokenAddress: string) => 18 // hardcoded for now

  const getAssetTokenDecimals = useCallback(
    (tokenAddress: string) => {
      if (!chainId) return 0

      const token = getTokenOption(ethers.utils.getAddress(tokenAddress), chainId)
      const decimals = token?.tokenDecimals
      console.info('Decimals of token', tokenAddress, 'is', decimals)
      return decimals
    },
    [chainId]
  )

  const subgraphData = useSubgraphQuery({
    feature: 'LBP',
    chainId,
    query: composeLatestTradeQuery('0x66b4e8ee377e5026edf2c48238d17068560af0e5'),
    pollingInterval: 2000,
    autoPolling: true,
  })

  const trades = useMemo(() => {
    return subgraphData?.trades || []
  }, [subgraphData])

  console.info('trades', trades)

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
                trades.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell>
                      <span>{unixTimeToFormat({ time: row.blockTimestamp })}</span>{' '}
                      {/* <span style={{ color: '#8F8FB2' }}>{row.time.split(' ')[1]}</span>{' '} */}
                    </TableCell>
                    <TableCell>${parseFloat(row.usdPrice || 0).toFixed(2)}</TableCell>
                    <TableCell style={{ color: '#8F8FB2' }}>{row?.caller?.id}</TableCell>
                    <TableCell style={{ display: 'flex', gap: '8px' }}>
                      {parseFloat(
                        ethers.utils.formatUnits(
                          row.amountIn,
                          row.type === 'BUY'
                            ? getAssetTokenDecimals(row.pool.assetAddress)
                            : getShareDecimals(row.pool.shareAddress)
                        )
                      ).toFixed(3)}
                      {row.type == 'BUY' ? <USDC /> : <Serenity />}
                      <VerticalLine />
                      {parseFloat(
                        ethers.utils.formatUnits(
                          row.amountOut,
                          row.type === 'SELL'
                            ? getAssetTokenDecimals(row.pool.assetAddress)
                            : getShareDecimals(row.pool.shareAddress)
                        )
                      ).toFixed(3)}
                      {row.type == 'SELL' ? <USDC /> : <Serenity />}
                      <span style={{ color: index <= 4 ? '#FF6161' : '#1FBA66' }}>{row.changedAmt} </span>
                    </TableCell>
                    {row.type === 'BUY' ? (
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

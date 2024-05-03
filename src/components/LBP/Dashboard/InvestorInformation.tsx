import React, { useState, useEffect } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import TablePagination from '@mui/material/TablePagination'
import TableSortLabel from '@mui/material/TableSortLabel'
import { useGetInvestorInfo } from 'state/lbp/hooks'
import { TYPE } from 'theme'
import styled from 'styled-components'

interface TableProps {
  lbpId: number
}

const ExtractButton = styled.button`
  padding: 14px 24px;
  background: none;
  color: #6666ff;
  border: 1px solid #e6e6ff;
  cursor: pointer;
  border-radius: 6px;
`

function InvestorInformation({ lbpId }: TableProps) {
  const [investorInfo, setInvestorInfo] = useState<any>()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [orderBy, setOrderBy] = useState<string>('investorName')
  const [order, setOrder] = useState<'asc' | 'desc'>('asc')
  const getInvestorInfo = useGetInvestorInfo()

  useEffect(() => {
    getInvestorInfo(lbpId).then((data) => {
      return setInvestorInfo(data)
    })
  }, [lbpId, getInvestorInfo])

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrderBy(property)
    setOrder(isAsc ? 'desc' : 'asc')
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const downloadCsv = () => {
    const csvContent = 'data:text/csv;charset=utf-8,' + encodeURIComponent(convertToCsv(investorInfo))
    const link = document.createElement('a')
    link.setAttribute('href', csvContent)
    link.setAttribute('download', 'investor_information.csv')
    document.body.appendChild(link)
    link.click()
  }
  const convertToCsv = (data: any[]) => {
    const header = Object.keys(data[0]).join(',')
    const rows = data.map((obj) => Object.values(obj).join(','))
    return [header, ...rows].join('\n')
  }

  const sortedData = investorInfo?.slice()?.sort((a: any, b: any) => {
    const isAsc = order === 'asc'
    if (a[orderBy] < b[orderBy]) {
      return isAsc ? -1 : 1
    }
    if (a[orderBy] > b[orderBy]) {
      return isAsc ? 1 : -1
    }
    return 0
  })

  const emptyRows = Math.max(0, (1 + page) * rowsPerPage - investorInfo?.length)

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
        <TYPE.title5 style={{ marginBottom: '20px' }}>Investor Information</TYPE.title5>
        <ExtractButton onClick={downloadCsv}>Extract Data</ExtractButton>
      </div>
      <TableContainer style={{ boxShadow: 'none' }} component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ textAlign: 'left' }}>
                <TableSortLabel
                  active={orderBy === 'investorName'}
                  direction={orderBy === 'investorName' ? order : 'asc'}
                  onClick={() => handleRequestSort('investorName')}
                >
                  Investor Name
                </TableSortLabel>
              </TableCell>
              <TableCell style={{ textAlign: 'right' }}>
                <TableSortLabel
                  active={orderBy === 'assetsSpent'}
                  direction={orderBy === 'assetsSpent' ? order : 'asc'}
                  onClick={() => handleRequestSort('assetsSpent')}
                >
                  Assets Spent
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((row: any) => (
              <TableRow key={row.investorName}>
                <TableCell component="th" scope="row" style={{ textAlign: 'left' }}>
                  {row.investorName}
                </TableCell>
                <TableCell style={{ textAlign: 'right' }}>{row.assetsSpent}</TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={investorInfo?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  )
}

export default InvestorInformation

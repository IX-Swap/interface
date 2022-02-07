import {
  Box,
  Grid,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material'
import { LoadingIndicator } from 'app/components/LoadingIndicator/LoadingIndicator'
import { NoData } from 'app/components/NoData/NoData'
import { Security } from 'app/pages/educationCentre/components/Securities/SecurityCard'
import React, { useState } from 'react'

export interface SecuritiesTableColumn {
  id: keyof Security
  label: string
  align?: 'right' | 'left'
}

export const columns: SecuritiesTableColumn[] = [
  {
    id: 'firm',
    label: 'Issuing Firm'
  },
  {
    id: 'ticker',
    label: 'Ticker'
  },
  {
    id: 'issuePrice',
    label: 'Issue Price',
    align: 'right'
  },
  {
    id: 'fundingGoal',
    label: 'Funding Goal',
    align: 'right'
  },
  {
    id: 'totalCapitalization',
    label: 'Total Capitalization',
    align: 'right'
  },
  {
    id: 'website',
    label: 'Website'
  },
  {
    id: 'industry',
    label: 'Industry'
  },
  {
    id: 'country',
    label: 'Country'
  },
  {
    id: 'assetClass',
    label: 'Security Type'
  }
]

export interface SecuritiesTableViewProps {
  data?: Security[]
  isLoading: boolean
}

export const SecuritiesTableView = ({
  data,
  isLoading
}: SecuritiesTableViewProps) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(25)

  if (isLoading) {
    return (
      <Box width='100%' height='100%' position='relative' paddingTop={24}>
        <LoadingIndicator />
      </Box>
    )
  }

  if (data === undefined) {
    return null
  }

  if (data.length < 1) {
    return <NoData title='No data found' />
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Paper elevation={0} variant='outlined'>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TableContainer style={{ maxHeight: 400 }}>
            <Table stickyHeader style={{ borderCollapse: 'collapse' }}>
              <TableHead>
                <TableRow>
                  {columns.map(column => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ backgroundColor: '#121937', color: '#FFF' }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody style={{ borderBottom: '1px solid #DDD' }}>
                {data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(item => (
                    <TableRow key={item.ticker}>
                      {columns.map(column => (
                        <TableCell>
                          {column.id === 'website' ? (
                            <Link target='_blank' href={item[column.id] ?? ''}>
                              visit
                            </Link>
                          ) : (
                            item[column.id]
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12}>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50, 100]}
            component='div'
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Grid>
      </Grid>
    </Paper>
  )
}

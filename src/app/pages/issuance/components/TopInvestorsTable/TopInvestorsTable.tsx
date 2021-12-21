import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@material-ui/core'
import { TopInvestorsRow } from 'app/pages/issuance/components/TopInvestorsTable/TopInvestorsRow'
import { TableCellItem } from 'types/table'
import { ChartTitle } from 'app/pages/issuance/components/IssuanceLanding/ChartTitle'
import Box from '@material-ui/core/Box'
import { useStyles } from './shared.styles'
import { InsightCard } from 'app/pages/issuance/components/InsightCard'
import { TopInvestor } from 'types/vccDashboard'
import { Skeleton } from '@material-ui/lab'

const headCells: TableCellItem[] = [
  { label: 'Sub-Fund', align: 'left' },
  { label: 'Investor Name', align: 'left' },
  { label: 'Amount', align: 'right' }
]

export interface TopInvestorsTableProps {
  investors: TopInvestor[] | undefined
  title: string
  isLoading: boolean
}

export const TopInvestorsTable = ({
  investors,
  title,
  isLoading
}: TopInvestorsTableProps) => {
  const classes = useStyles()

  if (isLoading) {
    return (
      <InsightCard>
        <Box padding={3} paddingBottom={1} className={classes.wrapper}>
          <ChartTitle title={<Skeleton width={180} />} />
          <Box py={1}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    {headCells.map(({ label, align }) => (
                      <TableCell align={align} className={classes.headColumn}>
                        <Skeleton width={80} />
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Skeleton />
                    </TableCell>
                    <TableCell>
                      <Skeleton />
                    </TableCell>
                    <TableCell>
                      <Skeleton />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Skeleton />
                    </TableCell>
                    <TableCell>
                      <Skeleton />
                    </TableCell>
                    <TableCell>
                      <Skeleton />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Skeleton />
                    </TableCell>
                    <TableCell>
                      <Skeleton />
                    </TableCell>
                    <TableCell>
                      <Skeleton />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Skeleton />
                    </TableCell>
                    <TableCell>
                      <Skeleton />
                    </TableCell>
                    <TableCell>
                      <Skeleton />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Skeleton />
                    </TableCell>
                    <TableCell>
                      <Skeleton />
                    </TableCell>
                    <TableCell>
                      <Skeleton />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </InsightCard>
    )
  }

  return (
    <InsightCard>
      <Box padding={3} paddingBottom={1} className={classes.wrapper}>
        <ChartTitle title={title} />
        <Box py={1}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {headCells.map(({ label, align }) => (
                    <TableCell align={align} className={classes.headColumn}>
                      {label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {investors?.map(({ dsoName, investorName, amount }) => (
                  <TopInvestorsRow
                    subFund={dsoName}
                    name={investorName}
                    amount={amount}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </InsightCard>
  )
}

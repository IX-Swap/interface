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

const headCells: TableCellItem[] = [
  { label: 'Sub-Fund', align: 'left' },
  { label: 'Investor Name', align: 'left' },
  { label: 'Amount', align: 'right' }
]

export interface TopInvestorsTableProps {
  investors: TopInvestor[] | undefined
}

export const TopInvestorsTable = ({ investors }: TopInvestorsTableProps) => {
  const classes = useStyles()

  if (investors === undefined || investors.length < 1) {
    return null
  }

  return (
    <InsightCard>
      <Box padding={3} paddingBottom={1} className={classes.wrapper}>
        <ChartTitle title='Top Investors From Closed' />
        <Box padding={1}>
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
                {investors.map(({ dsoName, investorName, amount }) => (
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

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
import { ChartTitle } from 'app/pages/issuance/components/IssuanceLanding/ChartTitle'
import Box from '@material-ui/core/Box'
import { useStyles } from './shared.styles'
import { InsightCard } from 'app/pages/issuance/components/InsightCard'
import { TopInvestor } from 'types/vccDashboard'
import { TopInvestorsTableSkeleton } from './TopInvestorsTableSkeleton'
import { headCells } from './data'

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
    return <TopInvestorsTableSkeleton />
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

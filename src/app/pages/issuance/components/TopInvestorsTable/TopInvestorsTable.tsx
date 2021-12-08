import React from 'react'
import { InsightCard } from 'app/pages/issuance/components/CapTable/InsightCard'
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

const headCells: TableCellItem[] = [
  { label: 'Sub-Fund', align: 'left' },
  { label: 'Investor Name', align: 'left' },
  { label: 'Amount', align: 'right' }
]

// TODO Remove this after complete backend api endpoint
const rows = [
  { subFund: 'IXD SF 1', name: 'Justina Jones', amount: 3125612 },
  { subFund: 'IXD SF 2', name: 'Geovany Runolfsson', amount: 3125612 },
  { subFund: 'IXD SF 3', name: 'Nichole Mertz', amount: 3125612 },
  { subFund: 'IXD SF 4', name: 'Emilia Morar', amount: 3125612 },
  { subFund: 'IXD SF 5', name: 'Issac Bauch', amount: 3125612 }
]

export const TopInvestorsTable = () => {
  const classes = useStyles()
  // TODO Add real data this after complete backend api endpoint

  return (
    <InsightCard>
      <Box padding={3} paddingBottom={1} className={classes.wrapper}>
        <ChartTitle title='Total Tokens' />
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
              {rows.map(({ subFund, name, amount }) => (
                <TopInvestorsRow
                  subFund={subFund}
                  name={name}
                  amount={amount}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </InsightCard>
  )
}

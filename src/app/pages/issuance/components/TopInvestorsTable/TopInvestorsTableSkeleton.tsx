import React from 'react'
import Box from '@material-ui/core/Box'
import { Skeleton } from '@material-ui/lab'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@material-ui/core'
import { ChartTitle } from '../IssuanceLanding/ChartTitle'
import { InsightCard } from '../InsightCard'
import { headCells } from './data'
import { useStyles } from './shared.styles'

export const TopInvestorsTableSkeleton = () => {
  const classes = useStyles()

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
                {new Array(4).fill(null).map(() => (
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
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </InsightCard>
  )
}

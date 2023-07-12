import { Box, Grid } from '@mui/material'
import { TextInputSearchFilter } from 'app/components/TextInputSearchFilter'
import { columns } from 'app/pages/accounts/components/CurrentHoldingsTable/columns'
// import { TableView } from 'components/TableWithPagination/TableView'
import { TableView } from 'ui/UIKit/TablesKit/components/TableView/TableView'
import { exchange as exchangeUrl } from 'config/apiURL'
import { exchange as exchangeQueryKeys } from 'config/queryKeys'
import { getIdFromObj } from 'helpers/strings'
import { useAuth } from 'hooks/auth/useAuth'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import React from 'react'
import { useTheme } from '@mui/styles'

export interface Holding {
  _id: string
  pair: string
  name: string
  investedAmount: number
  unitPrice: number
  totalAmount: number
}

export const CurrentHoldingsTable = () => {
  const theme = useTheme()
  const { user } = useAuth()
  const userId = getIdFromObj(user)
  const { getFilterValue } = useQueryFilter()

  const filter = {
    search: getFilterValue('search')
  }

  return (
    <Grid container direction='column'>
      <Grid item>
        <Box
          p={3}
          bgcolor={theme.palette.backgrounds.light}
          sx={{
            borderTop: `1px solid ${theme.palette.divider}`,
            borderBottomLeftRadius: '10px',
            borderBottomRightRadius: '10px'
          }}
        >
          <TextInputSearchFilter
            fullWidth
            placeholder='Search'
            inputAdornmentPosition='start'
          />
        </Box>
      </Grid>
      <Grid item mt={5}>
        <TableView<Holding>
          uri={exchangeUrl.currentHoldings(userId)}
          name={exchangeQueryKeys.userHoldings(userId)}
          columns={columns}
          filter={filter}
          paperProps={{ variant: 'elevation', elevation: 0 }}
        />
      </Grid>
    </Grid>
  )
}

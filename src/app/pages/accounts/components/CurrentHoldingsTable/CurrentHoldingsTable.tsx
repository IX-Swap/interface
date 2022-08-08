import { Box, Grid } from '@mui/material'
import { TextInputSearchFilter } from 'app/components/TextInputSearchFilter'
import { columns } from 'app/pages/accounts/components/CurrentHoldingsTable/columns'
import { TableView } from 'components/TableWithPagination/TableView'
import { exchange as exchangeUrl } from 'config/apiURL'
import { exchange as exchangeQueryKeys } from 'config/queryKeys'
import { getIdFromObj } from 'helpers/strings'
import { useAuth } from 'hooks/auth/useAuth'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import React from 'react'

export interface Holding {
  _id: string
  pair: string
  name: string
  investedAmount: number
  unitPrice: number
  totalAmount: number
}

export const CurrentHoldingsTable = () => {
  const { user } = useAuth()
  const userId = getIdFromObj(user)
  const { getFilterValue } = useQueryFilter()

  const filter = {
    search: getFilterValue('search')
  }

  return (
    <Grid container direction='column' spacing={2}>
      <Grid item style={{ maxHeight: 70 }}>
        <Grid
          container
          justifyContent='space-between'
          style={{ paddingLeft: 24, paddingRight: 24 }}
        >
          <Grid item xs={12} md={6}>
            <Box width={350}>
              <TextInputSearchFilter
                fullWidth
                placeholder='Search'
                inputAdornmentPosition='end'
              />
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
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

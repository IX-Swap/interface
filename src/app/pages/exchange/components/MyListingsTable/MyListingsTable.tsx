import React from 'react'
import { getIdFromObj } from 'helpers/strings'
import { useAuth } from 'hooks/auth/useAuth'
import { VSpacer } from 'components/VSpacer'
import { TableView } from 'components/TableWithPagination/TableView'
import { columns } from 'app/pages/exchange/components/MyListingsTable/columns'
import { listings } from 'config/apiURL'
import { Listing } from 'types/listing'
import { Actions } from 'app/pages/exchange/components/MyListingsTable/Actions'
import { Box, Grid } from '@material-ui/core'
import { AddListingButton } from './AddListingButton'
import { SearchFilter } from 'app/components/SearchFilter'
import { useSearchFilter } from 'hooks/filters/useSearchFilter'
import { listingsQueryKeys } from 'config/queryKeys'

export const MyListingsTable = () => {
  const { user } = useAuth()
  const userId = getIdFromObj(user)
  const { filter } = useSearchFilter()
  return (
    <>
      <VSpacer size={'small'} />
      <Grid container justifyContent='space-between' alignItems='center'>
        <Grid item xs={12} md={4}>
          <Box width={256} pt={2}>
            <SearchFilter
              fullWidth
              placeholder='Search'
              inputAdornmentPosition='start'
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={2}>
          <Box display='flex' pt={2} justifyContent='flex-end'>
            <AddListingButton />
          </Box>
        </Grid>
      </Grid>
      <VSpacer size={'small'} />
      <TableView<Listing>
        name={listingsQueryKeys.getListingsList}
        uri={listings.getListByUser(userId)}
        columns={columns}
        filter={{
          ...filter,
          status: 'Draft,Submitted,Approved,Rejected' as any
        }}
        defaultRowsPerPage={5}
        hasActions
        actions={Actions}
      />
    </>
  )
}

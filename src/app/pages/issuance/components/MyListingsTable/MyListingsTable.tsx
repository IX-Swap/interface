import { Box, Grid } from '@mui/material'
import { TextInputSearchFilter } from 'app/components/TextInputSearchFilter'
import { Actions } from 'app/pages/issuance/components/MyListingsTable/Actions'
import { AddListingButton } from 'app/pages/issuance/components/MyListingsTable/AddListingButton'
import { columns } from 'app/pages/issuance/components/MyListingsTable/columns'
import { TableView } from 'components/TableWithPagination/TableView'
import { VSpacer } from 'components/VSpacer'
import { listings } from 'config/apiURL'
import { listingsQueryKeys } from 'config/queryKeys'
import { getIdFromObj } from 'helpers/strings'
import { useAuth } from 'hooks/auth/useAuth'
import { useSearchFilter } from 'hooks/filters/useSearchFilter'
import React from 'react'
import { Listing } from 'types/listing'

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
            <TextInputSearchFilter
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

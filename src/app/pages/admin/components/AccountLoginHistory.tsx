import React, { useRef } from 'react'
import { TableView } from 'components/TableWithPagination/TableView'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import { authURL } from 'config/apiURL'
import { authQueryKeys } from 'config/queryKeys'
import { columns } from 'app/pages/admin/components/columns'
import { LoginHistory } from 'types/user'
import { Grid } from '@mui/material'
import { SearchFilter } from 'app/components/SearchFilter'
import { useParams } from 'react-router-dom'

export const AccountLoginHistory = () => {
  const { userId } = useParams<{ userId: string }>()
  const { getFilterValue } = useQueryFilter()

  const ref = useRef(null)
  const filter = {
    search: getFilterValue('search')
  }

  return (
    <Grid container spacing={3} direction='column'>
      <Grid item xs={12} md={4}>
        <SearchFilter
          fullWidth
          inputAdornmentPosition='end'
          placeholder='Search'
        />
      </Grid>
      <Grid item>
        <TableView<LoginHistory>
          innerRef={ref}
          uri={authURL.getLoginHistory(userId)}
          name={authQueryKeys.getLoginHistory(userId)}
          columns={columns}
          filter={filter}
        />
      </Grid>
    </Grid>
  )
}

import { Viewable } from 'v2/types/util'
import React from 'react'
import { Grid } from '@material-ui/core'
import { TableViewProps } from 'v2/components/TableWithPagination/TableView'
import { LayoutWithSidebar } from 'v2/app/components/LayoutWithSidebar'
import { PageHeader } from 'v2/app/components/PageHeader/PageHeader'
import { Filters } from 'v2/app/pages/authorizer/components/Filters'
import { AuthorizerTable } from './AuthorizerTable'
import { useAuthorizerFilter } from 'v2/app/pages/authorizer/hooks/useAuthorizerFilter'

export interface AuthorizerListProps<T>
  extends Omit<TableViewProps<T>, 'actions'>,
    Viewable<T> {
  idKey?: string
  title: string
}

export const AuthorizerList = <T,>(
  props: AuthorizerListProps<T>
): JSX.Element => {
  useAuthorizerFilter()

  return (
    <LayoutWithSidebar
      sidebar={() => <Filters />}
      content={() => (
        <Grid container direction='column'>
          <Grid item>
            <PageHeader />
          </Grid>
          <Grid item>
            <AuthorizerTable {...props} />
          </Grid>
        </Grid>
      )}
    />
  )
}

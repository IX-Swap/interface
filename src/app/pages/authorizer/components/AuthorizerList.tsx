import { Viewable } from 'types/util'
import React from 'react'
import { Grid } from '@material-ui/core'
import { TableViewProps } from 'components/TableWithPagination/TableView'
import { LayoutWithSidebar } from 'app/components/LayoutWithSidebar'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { Filters } from 'app/pages/authorizer/components/Filters'
import { AuthorizerTable } from './AuthorizerTable'

export interface AuthorizerListProps<T>
  extends Omit<TableViewProps<T>, 'actions'>,
    Viewable<T> {
  idKey?: string
  title: string
}

export const AuthorizerList = <T,>(props: AuthorizerListProps<T>) => {
  return (
    <LayoutWithSidebar
      secret
      sidebar={Filters}
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

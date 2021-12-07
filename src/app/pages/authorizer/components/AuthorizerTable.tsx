import { Viewable } from 'types/util'
import React from 'react'
import { withExtraActions } from 'app/pages/authorizer/components/withExtraActions'
import {
  TableView,
  TableViewProps
} from 'components/TableWithPagination/TableView'
import { useAuthorizerFilter } from '../hooks/useAuthorizerFilter'
import { useAuthorizerCategory } from 'hooks/location/useAuthorizerCategory'
import { useSelectionHelperContext } from 'components/SelectionHelper'
import { useUnmountCallback } from 'hooks/useUnmountCallback'
import { Grid } from '@material-ui/core'
import {
  AuthorizerSelectionActions,
  SelectionActions
} from 'app/pages/authorizer/components/SelectionAction/SelectionActions'
interface AuthorizerViewProps<T>
  extends Omit<TableViewProps<T>, 'actions'>,
    Viewable<T> {
  idKey?: string
  title: string
  selectable?: boolean
  selectionActions?: AuthorizerSelectionActions
  themeVariant?: 'default' | 'primary'
}

export const AuthorizerTable = <T,>(
  props: AuthorizerViewProps<T>
): JSX.Element => {
  const selectionHelperContext = useSelectionHelperContext()

  useUnmountCallback(selectionHelperContext.resetSelection)

  const {
    columns,
    name,
    uri,
    themeVariant = 'primary',
    selectable = false,
    selectionActions = {},
    hasStatus = true
  } = props

  const { filter: authFilter } = useAuthorizerFilter()
  const category = useAuthorizerCategory()

  const mergedFilters = {
    ...authFilter,
    status: category === 'commitments' ? undefined : authFilter.status,
    deploymentStatus:
      category === 'token-deployment' ? authFilter.deploymentStatus : undefined,
    isAssigned:
      category === 'virtual-accounts'
        ? authFilter.status !== 'Rejected'
        : undefined
  }

  return (
    <Grid container spacing={3}>
      {selectable && (
        <Grid item xs={12}>
          <SelectionActions actions={selectionActions} />
        </Grid>
      )}
      <Grid item xs={12}>
        <TableView<T>
          name={name}
          uri={uri}
          columns={columns}
          actions={withExtraActions<T>()}
          filter={mergedFilters}
          hasActions
          hasStatus={hasStatus}
          themeVariant={themeVariant}
          selectionHelper={selectable ? selectionHelperContext : undefined}
        />
      </Grid>
    </Grid>
  )
}

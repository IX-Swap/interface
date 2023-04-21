import { Viewable } from 'types/util'
import React from 'react'
import { withExtraActions } from 'app/pages/authorizer/components/withExtraActions'
import {
  TableView,
  TableViewProps,
  TableViewRendererProps
} from 'ui/UIKit/TablesKit/components/TableView/TableView'
import { useAuthorizerFilter } from 'app/pages/authorizer/hooks/useAuthorizerFilter'
import { useAuthorizerCategory } from 'hooks/location/useAuthorizerCategory'
import { useSelectionHelperContext } from 'components/SelectionHelper'
import { useUnmountCallback } from 'hooks/useUnmountCallback'
import { Grid } from '@mui/material'
import {
  AuthorizerSelectionActions,
  SelectionActions
} from 'app/pages/authorizer/components/SelectionAction/SelectionActions'
import { CompactTable } from 'ui/CompactTable/CompactTable'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'

interface AuthorizerViewProps<T>
  extends Omit<TableViewProps<T>, 'actions'>,
    Viewable<T> {
  idKey?: string
  title: string
  selectable?: boolean
  selectionActions?: AuthorizerSelectionActions
}

export const AuthorizerTable = <T,>(
  props: AuthorizerViewProps<T>
): JSX.Element => {
  const selectionHelperContext = useSelectionHelperContext()

  useUnmountCallback(selectionHelperContext.resetSelection)

  const {
    columns,
    compactColumns,
    name,
    uri,
    selectable = false,
    selectionActions = {}
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

  const { isTablet } = useAppBreakpoints()

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
          selectionHelper={selectable ? selectionHelperContext : undefined}
          paperProps={
            isTablet
              ? {
                  variant: 'elevation',
                  elevation: 0,
                  style: {
                    backgroundColor: 'transparent'
                  }
                }
              : undefined
          }
          noHeader={isTablet}
          paginationPlacement={isTablet ? 'both' : 'bottom'}
        >
          {isTablet
            ? (props: TableViewRendererProps<any>) => (
                <CompactTable {...props} columns={compactColumns} />
              )
            : undefined}
        </TableView>
      </Grid>
    </Grid>
  )
}

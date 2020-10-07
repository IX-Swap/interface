import { Viewable } from 'v2/types/util'
import { useStyles } from 'v2/app/pages/authorizer/components/styles'
import React from 'react'
import { Grid, Paper, Typography } from '@material-ui/core'
import { Filters } from 'v2/app/pages/authorizer/components/Filters'
import { Preview } from 'v2/app/pages/authorizer/components/Preview'
import { useAuthorizerView } from 'v2/app/pages/authorizer/hooks/useAuthorizerView'
import { withExtraActions } from 'v2/app/pages/authorizer/components/withExtraActions'
import {
  TableView,
  TableViewProps
} from 'v2/components/TableWithPagination/TableView'

interface AuthorizerViewProps<T>
  extends Omit<TableViewProps<T>, 'actions'>,
    Viewable<T> {
  idKey?: string
  title: string
}

export const AuthorizerTable = <T,>(
  props: AuthorizerViewProps<T>
): JSX.Element => {
  const { columns, idKey, name, renderView, title, uri } = props
  const classes = useStyles()
  const {
    filter,
    setFilter,
    isViewing,
    item,
    setItem,
    getColumns
  } = useAuthorizerView<T>({ idKey, uri, columns })

  if (isViewing && typeof renderView === 'function' && item !== undefined) {
    return <Preview onBack={setItem}>{renderView(item)}</Preview>
  }

  return (
    <Grid container>
      <Grid item xs={12} md={3} className={classes.filters}>
        <Filters onApplyFilter={setFilter} />
      </Grid>
      <Grid item xs={12} md={9} className={classes.content}>
        <Grid item xs={12}>
          <Typography variant='h2'>{title}</Typography>
        </Grid>
        <Grid item xs={12} style={{ marginTop: '48px' }} component={Paper}>
          <TableView<T>
            name={name}
            uri={uri}
            columns={getColumns()}
            filter={filter}
            actions={withExtraActions<T>({ onView: setItem })}
            // fakeItems={[cashWithdrawal, cashWithdrawal] as any}
            hasActions
          />
        </Grid>
      </Grid>
    </Grid>
  )
}

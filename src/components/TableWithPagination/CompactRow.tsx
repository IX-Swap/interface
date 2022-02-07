import { Grid } from '@mui/material'
import React from 'react'
import { TableColumn } from 'types/util'
import get from 'lodash/get'
import { ActionsType } from 'app/pages/authorizer/components/Actions'

export interface CompactRowProps<T> {
  data: T
  columns: Array<TableColumn<T, string>>
  actions?: ActionsType<T>
  hasActions?: boolean
}

export const CompactRow = <T,>({
  data,
  columns,
  hasActions = false,
  actions
}: CompactRowProps<T>) => {
  return (
    <Grid container spacing={1} alignItems='flex-start'>
      {columns.map(({ label, key, render }, index) =>
        index === 0 ? (
          <React.Fragment key={key}>
            <Grid item xs={8}>
              {key.length > 0 &&
                (typeof render === 'function'
                  ? render(get(data, key), data)
                  : get(data, key))}
            </Grid>
            {hasActions ? (
              <Grid item xs={4} container justifyContent='flex-end'>
                {actions?.({ item: data, cacheQueryKey: undefined }) ?? null}
              </Grid>
            ) : (
              <Grid item xs={4} />
            )}
          </React.Fragment>
        ) : (
          <React.Fragment key={key}>
            <Grid item xs={6}>
              {label}
            </Grid>
            <Grid item xs={6} style={{ textAlign: 'right', fontWeight: 600 }}>
              {key.length > 0 &&
                (typeof render === 'function'
                  ? render(get(data, key), data)
                  : get(data, key))}
            </Grid>
          </React.Fragment>
        )
      )}
    </Grid>
  )
}

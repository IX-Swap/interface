import React from 'react'
import { TableColumn, RowAction } from '../../types/util'
import {
  TableBody,
  TableRow,
  TableCell
} from '@material-ui/core'
import { get } from 'lodash'

function Items<T> ({ items, columns, hasActions = false, actions }: {items: T[]; columns: Array<TableColumn<T>>; hasActions? : boolean; actions?: RowAction<T> }) {
  return (
    <TableBody>
      {items.length ? (
        items.map((row, i: number) => (
          <TableRow hover key={i}>
            {columns.map((e) => (
              <TableCell align={e.align ?? 'left'} key={`row-${e.key}`}>
                {e.key &&
                  (e.render ? e.render(get(row, e.key), row) : get(row, e.key))}
              </TableCell>
            ))}
            {hasActions && <TableCell>{(actions?.(row)) ?? null}</TableCell>}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell align='center' colSpan={columns.length + +!!hasActions}>
            No Data
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  )
}

export default Items

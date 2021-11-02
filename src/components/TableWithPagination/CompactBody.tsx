import { TableRow, TableCell, TableBody, useTheme } from '@material-ui/core'
import React from 'react'
import {
  CompactRow,
  CompactRowProps
} from 'components/TableWithPagination/CompactRow'
import { TableViewRendererProps } from 'components/TableWithPagination/TableView'

export interface CompactBodyProps<T> extends TableViewRendererProps<T> {
  renderRow?: (props: CompactRowProps<T>) => JSX.Element
}

export const CompactBody = <T,>(props: CompactBodyProps<T>) => {
  const { columns, items, actions, hasActions, renderRow } = props
  const theme = useTheme()
  return (
    <TableBody>
      {items.map((item, i) => (
        <TableRow
          key={i}
          style={{
            backgroundColor:
              theme.palette.type === 'light'
                ? theme.palette.backgrounds.default
                : theme.palette.backgrounds.light
          }}
        >
          <TableCell>
            {renderRow !== undefined ? (
              renderRow({
                data: item,
                columns: columns,
                actions: actions,
                hasActions: hasActions
              })
            ) : (
              <CompactRow
                data={item}
                columns={columns}
                actions={actions}
                hasActions={hasActions}
              />
            )}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  )
}

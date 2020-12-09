import React from 'react'
import { Chip, Paper } from '@material-ui/core'
import { TableColumn } from 'types/util'
import { columns } from 'app/pages/invest/components/DSOTable/columns'
import { DigitalSecurityOffering, DSOTableColumn } from 'types/dso'

export interface EditableColumnsProps {
  selected: Array<TableColumn<DigitalSecurityOffering, DSOTableColumn>>
  onDeselect: (key: DSOTableColumn) => any
  onSelect: (key: DSOTableColumn) => any
}

export const EditableColumns = (props: EditableColumnsProps) => {
  const { selected, onSelect, onDeselect } = props

  return (
    <Paper>
      {columns.map(({ key }) => {
        const isSelected =
          selected.findIndex(column => column.key === key) !== -1

        return (
          <Chip
            label={key}
            variant={isSelected ? 'default' : 'outlined'}
            onClick={isSelected ? undefined : () => onSelect(key)}
            onDelete={isSelected ? () => onDeselect(key) : undefined}
          />
        )
      })}
    </Paper>
  )
}

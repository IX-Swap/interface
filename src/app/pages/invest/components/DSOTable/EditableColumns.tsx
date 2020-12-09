import React from 'react'
import { Box, Chip, Typography } from '@material-ui/core'
import { TableColumn } from 'types/util'
import { columns } from 'app/pages/invest/components/DSOTable/columns'
import { DigitalSecurityOffering, DSOTableColumn } from 'types/dso'
import { EditableColumnsWrapper } from 'ui/EditableColumnsWrapper'
import { formatCamelCasedWithSpaces } from 'helpers/strings'

export interface EditableColumnsProps {
  selected: Array<TableColumn<DigitalSecurityOffering, DSOTableColumn>>
  onDeselect: (key: DSOTableColumn) => any
  onSelect: (key: DSOTableColumn) => any
}

export const EditableColumns = (props: EditableColumnsProps) => {
  const { selected, onSelect, onDeselect } = props

  return (
    <EditableColumnsWrapper px={3.5} py={1}>
      <Typography variant='subtitle2'>Add more columns</Typography>

      <Box display='flex' py={2}>
        {columns.map(({ key }) => {
          const isSelected =
            selected.findIndex(column => column.key === key) !== -1

          return (
            <Box mr={2.5}>
              <Chip
                label={formatCamelCasedWithSpaces(key)}
                variant={isSelected ? 'default' : 'outlined'}
                onClick={isSelected ? undefined : () => onSelect(key)}
                onDelete={isSelected ? () => onDeselect(key) : undefined}
              />
            </Box>
          )
        })}
      </Box>
    </EditableColumnsWrapper>
  )
}

import React from 'react'
import { Box, Typography } from '@mui/material'
import { TableColumn } from 'types/util'
import { columns } from 'app/pages/invest/components/DSOTable/columns'
import { DigitalSecurityOffering, DSOTableColumn } from 'types/dso'
import { EditableColumnsWrapper } from 'ui/EditableColumnsWrapper'
import { ColumnsEditorItem } from './ColumnsEditorItem'

export interface ColumnsEditorProps {
  selected: Array<TableColumn<DigitalSecurityOffering, DSOTableColumn>>
  onDeselect: (key: DSOTableColumn) => any
  onSelect: (key: DSOTableColumn) => any
}

export const ColumnsEditor = (props: ColumnsEditorProps) => {
  const { selected, onSelect, onDeselect } = props
  const getIsColumnSelected = (column: DSOTableColumn) => {
    return selected.findIndex(({ key }) => key === column) !== -1
  }

  return (
    <EditableColumnsWrapper px={3.5} py={1}>
      <Typography variant='subtitle2'>Add more columns</Typography>

      <Box display='flex' flexDirection='row' flexWrap='wrap' pt={2} pb={0.5}>
        {columns.map(({ key }) => (
          <ColumnsEditorItem
            key={key}
            value={key}
            isSelected={getIsColumnSelected(key)}
            onSelect={onSelect}
            onDeselect={onDeselect}
          />
        ))}
      </Box>
    </EditableColumnsWrapper>
  )
}

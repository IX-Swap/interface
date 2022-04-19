import React from 'react'
import { Box, Grid } from '@mui/material'
import {
  DataroomRowUploader,
  DataroomRowUploaderProps
} from 'components/dataroom/DataroomRowUploader'
import { UICheckbox } from 'components/UICheckbox/UICheckbox'

export interface SelectableDataroomEditRowProps
  extends DataroomRowUploaderProps {
  isSelected: boolean
  hasSelected: boolean
  toggleItem: () => void
}

export const SelectableDataroomEditRow = (
  props: SelectableDataroomEditRowProps
) => {
  const { isSelected, toggleItem, hasSelected, ...rest } = props
  const handleDelete = () => {
    if (hasSelected) {
      toggleItem()
    }

    rest.onDelete?.()
  }

  return (
    <Grid container alignItems='center' wrap='nowrap' onClick={toggleItem}>
      {hasSelected && (
        <Box flex='1 0 50px'>
          <UICheckbox checked={isSelected} />
        </Box>
      )}
      <DataroomRowUploader {...rest} onDelete={handleDelete} />
    </Grid>
  )
}

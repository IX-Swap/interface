import React from 'react'
import { useSelectionHelperContext } from 'components/SelectionHelper'
import { Button, ButtonProps } from '@mui/material'
import { themeColors } from 'themes/old/colors'
import { useDeleteFilesArray } from 'hooks/useDeleteFilesArray'
import { SelectedDocument } from 'helpers/dataroom'

export interface DataroomDeleteSelectedProps extends ButtonProps {
  name: string
}

export const DataroomDeleteSelected = (props: DataroomDeleteSelectedProps) => {
  const { name, ...rest } = props
  const { isLoading, deleteMultiple } = useDeleteFilesArray(name)
  const { hasSelected, selectedCount } =
    useSelectionHelperContext<SelectedDocument>()

  if (!hasSelected) {
    return <div />
  }

  return (
    <Button
      {...rest}
      color='secondary'
      variant='contained'
      size='large'
      disableElevation
      onClick={deleteMultiple}
      disabled={isLoading}
      style={{ ...(rest.style ?? {}), backgroundColor: themeColors.error }}
    >
      {isLoading ? 'Deleting...' : `Delete ${selectedCount} documents`}
    </Button>
  )
}

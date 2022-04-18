import React from 'react'
import { useSelectionHelperContext } from 'components/SelectionHelper'
import { Button, ButtonProps } from '@mui/material'
import { themeColors } from 'themes/app/colors'
import { useDeleteFilesArray } from 'hooks/useDeleteFilesArray'
import { SelectedDocument } from 'helpers/dataroom'

export interface DataroomDeleteSelectedProps extends ButtonProps {
  name: string
  action?: () => void
}

export const DataroomDeleteSelected = (props: DataroomDeleteSelectedProps) => {
  const { name, action, ...rest } = props
  const { isLoading, deleteMultiple } = useDeleteFilesArray(name, action)
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

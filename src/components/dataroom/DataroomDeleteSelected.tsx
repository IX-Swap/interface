import React from 'react'
import { useSelectionHelperContext } from 'components/SelectionHelper'
import { Button } from '@material-ui/core'
import { themeColors } from 'themes/light'
import { useDeleteFilesArray } from 'hooks/useDeleteFilesArray'
import { SelectedDocument } from 'app/pages/accounts/pages/banks/components/BankDocuments'

export interface DataroomDeleteSelectedProps {
  name: string
}

export const DataroomDeleteSelected = (props: DataroomDeleteSelectedProps) => {
  const { isLoading, deleteMultiple } = useDeleteFilesArray(props.name)
  const { hasSelected, selectedCount } = useSelectionHelperContext<
    SelectedDocument
  >()

  if (!hasSelected) {
    return <div />
  }

  return (
    <Button
      color='secondary'
      variant='contained'
      size='large'
      disableElevation
      onClick={deleteMultiple}
      disabled={isLoading}
      style={{ backgroundColor: themeColors.error }}
    >
      {isLoading ? 'Deleting...' : `Delete ${selectedCount} documents`}
    </Button>
  )
}

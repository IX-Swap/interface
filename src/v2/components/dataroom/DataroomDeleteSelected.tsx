import React from 'react'
import { useSelectionHelperContext } from 'v2/components/SelectionHelper'
import { Button } from '@material-ui/core'
import { themeColors } from 'v2/themes/default'
import { useDeleteFilesArray } from 'v2/hooks/useDeleteFilesArray'
import { SelectedDocument } from 'v2/app/pages/accounts/pages/banks/components/BankDocuments'

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
      color='primary'
      variant='contained'
      size='large'
      disableElevation
      onClick={deleteMultiple}
      disabled={isLoading}
      style={{ backgroundColor: themeColors.error }}
    >
      Delete {selectedCount} documents
    </Button>
  )
}

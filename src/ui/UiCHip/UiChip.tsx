import { Chip } from '@mui/material'
import React from 'react'
import { ChipProps } from '@mui/material/Chip/Chip'
import { ReactComponent as DeleteIconLight } from 'assets/icons/chip/deleteLight.svg'
import { ReactComponent as DeleteIconDark } from 'assets/icons/chip/deleteDark.svg'
import { useTheme } from '@mui/material/styles'

export const UIChip = (props: ChipProps) => {
  const theme = useTheme()

  const getDeleteIcon = () => {
    if (theme.palette.mode === 'light' && props.onDelete !== undefined) {
      return <DeleteIconLight />
    }

    if (theme.palette.mode === 'dark' && props.onDelete !== undefined) {
      return <DeleteIconDark />
    }
  }

  return <Chip {...props} deleteIcon={getDeleteIcon()} />
}

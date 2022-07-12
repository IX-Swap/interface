import { Button, Grid } from '@mui/material'
import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { ButtonProps } from '@mui/material/Button'

export interface SpecialButtonProps extends ButtonProps {
  name: any
  isVisible: boolean
  addEmptyValue: boolean
  onClick: () => void
}

export const AddDocumentButton = ({
  name,
  isVisible,
  addEmptyValue,
  ...props
}: SpecialButtonProps) => {
  const { watch } = useFormContext()
  const documentsCount = watch(name).length
  const onClick = props.onClick

  useEffect(() => {
    if (documentsCount < 1 && onClick !== undefined && addEmptyValue) {
      onClick()
    }
  }, [documentsCount, onClick, addEmptyValue])

  if (!isVisible) {
    return null
  }
  return (
    <Grid item xs={12}>
      <Button {...props}>Add Document</Button>{' '}
    </Grid>
  )
}

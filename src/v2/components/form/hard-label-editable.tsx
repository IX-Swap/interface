import React from 'react'
import { Typography, Box, TextField } from '@material-ui/core'
import { useFormContext } from 'react-hook-form'
import { noop } from 'lodash'

interface EditableWithLabelProps {
  label: string
  value: string
  name: string
  required?: boolean
  raw?: string
  labelPosition?: 'top' | 'left'
  labelBold?: boolean
  editMode?: boolean
}

const EditableWithLabel = ({ editMode = false, required = false, label, value, name, raw, labelPosition, labelBold }: EditableWithLabelProps) => {
  const { register, errors } = useFormContext() || { register: noop }
  return (
    <Box py={2}>
      <Typography>
        <b>{label}</b>
      </Typography>
      <Box pt={1} />
      {!editMode && <Typography>{value}</Typography>}
      {editMode && (
        <TextField
          inputRef={register({ required })}
          name={name || ''}
          error={errors[name || '']}
        />
      )}
    </Box>
  )
}

export default EditableWithLabel

//
import React from 'react'
import { Box, Typography, TextField } from '@material-ui/core'
import { useFormContext } from 'react-hook-form'

const OfferDetail = (
  { label, value, edit = false, name },

  ref
) => {
  const { errors = {} } = useFormContext() || {}
  return (
    <Box py={2}>
      <Typography>
        <b>{label}</b>
      </Typography>
      <Box pt={1} />
      {!edit && <Typography>{value}</Typography>}
      {edit && (
        <TextField
          inputRef={ref({ required: true })}
          name={name || ''}
          error={errors[name || '']}
        />
      )}
    </Box>
  )
}

export default React.forwardRef(OfferDetail)

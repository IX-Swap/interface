import React, { useCallback, useRef } from 'react'
import { TextField, Box, Button, } from '@material-ui/core'

export default function UploadSection({
  name,
  label,
  emptyLabel,
  error,
  helperText,
  onChange,
  required,
  value,
  triggerValidation
}) {
  const fileInputRef = useRef()

  const handleClick = useCallback(() => {
    if (fileInputRef.current) fileInputRef.current.click()
  }, [])

  const handleFocus = useCallback(ev => {
    ev.preventDefault()
    ev.target.blur()
    if (fileInputRef.current) fileInputRef.current.click()
  }, [])

  const handleChange = useCallback(() => {
    const newFileName = fileInputRef.current.files?.[0]?.name
    if (!newFileName) return

    onChange(fileInputRef.current.files)
    triggerValidation(name)
  }, [onChange]) // eslint-disable-line react-hooks/exhaustive-deps

  const fileName = value?.[0]?.name;

  return (
    <Box display={['block', 'flex']} alignItems='center'>
      <Box flex='1 1 auto'>
        <TextField
          fullWidth
          error={error}
          label={label}
          helperText={error ? helperText : emptyLabel}
          value={fileName || ''}
          required={required}
          onFocus={handleFocus}
        />
      </Box>
      <Box pl={[0, 3]} pt={[3, 0]}>
        <Button variant='contained' color='primary' onClick={handleClick}>
          Choose&nbsp;File
        </Button>
        <input ref={fileInputRef} hidden type="file" onChange={handleChange} />
      </Box>
    </Box>
  )
}

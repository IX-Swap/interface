import React from 'react'
import { MuiColorInput } from 'mui-color-input'
import styled from 'styled-components'
import { Box } from 'rebass'

interface ColorPickerProps {
  id: string
  name: string
  value: string
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
}

const ColorPicker: React.FC<ColorPickerProps> = ({ id, name, value, setFieldValue }) => {
  return (
    <Box mt="12px">
      <ColorInputStyled
        id={id}
        name={name}
        format="hex"
        value={value}
        onChange={(value) => setFieldValue(name, value)}
        fullWidth
        variant="outlined"
      />
    </Box>
  )
}

export default ColorPicker

const ColorInputStyled = styled(MuiColorInput)`
  border-radius: 6px;
  border: 1px #e6e6ff;
  padding: 8px 12px;
  font-size: 16px;
  color: #666;
  font-size: 14px;

  &:focus-within {
    border-color: #0057b7;
  }
`

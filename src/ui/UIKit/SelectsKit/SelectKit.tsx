import { Box, FormControl, Typography } from '@mui/material'
import React, { useState } from 'react'
import { UIKitThemeWrapper } from 'ui/UIKit/UIKitThemeWrapper'
import { Select } from 'ui/Select/Select'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'
import { UICheckbox } from 'ui/UICheckbox/UICheckbox'
import { VSpacer } from 'components/VSpacer'
import { InputLabel } from 'ui/Select/InputLabel/InputLabel'

const options = [
  'Option 1',
  'Option 2',
  'Option 3',
  'Option 4',
  'Option 5',
  'Option 6'
]

export const SelectKit = () => {
  const [multipleValues, setMultipleValues] = useState<string[]>([])
  const [value, setValue] = useState<string>()

  const handleChange = (event: any) => {
    const {
      target: { value }
    } = event
    setValue(value)
  }

  const multipleHandleChange = (event: any) => {
    const {
      target: { value }
    } = event
    setMultipleValues(typeof value === 'string' ? value.split(',') : value)
  }

  return (
    <UIKitThemeWrapper>
      <Box display={'flex'}>
        <Box marginRight={12}>
          <Typography>Select</Typography>
          <VSpacer size={'medium'} />

          <FormControl sx={{ width: 266 }}>
            <InputLabel>Label</InputLabel>

            <Select
              fullWidth
              displayEmpty
              value={value}
              placeholder={'Select "Label"'}
              onChange={handleChange}
            >
              {options.map(item => {
                return <SelectItem value={item}>{item}</SelectItem>
              })}
            </Select>
          </FormControl>
        </Box>

        <Box marginRight={12}>
          <Typography>Select(Checkboxes)</Typography>
          <VSpacer size={'medium'} />

          <FormControl sx={{ width: 266 }}>
            <InputLabel>Label</InputLabel>

            <Select
              fullWidth
              multiple
              displayEmpty
              placeholder={'Select "Label"'}
              value={multipleValues}
              onChange={multipleHandleChange}
            >
              {options.map(item => {
                return (
                  <SelectItem withCheckbox value={item}>
                    <UICheckbox checked={multipleValues.includes(item)} />
                    {item}
                  </SelectItem>
                )
              })}
            </Select>
          </FormControl>
        </Box>

        <Box>
          <Typography>Select(disabled)</Typography>
          <VSpacer size={'medium'} />

          <FormControl sx={{ width: 266 }}>
            <InputLabel>Label</InputLabel>

            <Select
              fullWidth
              disabled
              displayEmpty
              value={value}
              placeholder={'Select "Label"'}
              onChange={handleChange}
            >
              {options.map(item => {
                return <SelectItem value={item}>{item}</SelectItem>
              })}
            </Select>
          </FormControl>
        </Box>
      </Box>
    </UIKitThemeWrapper>
  )
}

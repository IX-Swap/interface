import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select
} from '@material-ui/core'
import React from 'react'
import { SearchQueryFilter } from 'components/SearchQueryFilter/SearchQueryFilter'
import { hasValue } from 'helpers/forms'

const options = [
  'IXD SF 1',
  'IXD SF 2',
  'IXD SF 3',
  'IXD SF 4',
  'IXD SF 5',
  'IXD SF 6',
  'IXD SF 7'
]

export const SubFundSelect = () => {
  return (
    <SearchQueryFilter name='subfunds'>
      {({ value, onChange }) => {
        const selected = hasValue<string>(value) ? value.split(',') : []
        const isAllSelected =
          options.length > 0 && selected?.length === options.length

        const getStringValue = (selectedValues: any) => selectedValues.join(',')

        const handleChange = (event: any) => {
          const targetValue = event.target.value
          if (targetValue[targetValue.length - 1] === 'all') {
            onChange(isAllSelected ? [] : getStringValue(options))
            return
          }
          onChange(targetValue)
        }

        return (
          <FormControl variant='outlined' fullWidth style={{ width: 300 }}>
            <InputLabel id='SubFundSelect-label'>
              Select Multiple Sub-funds
            </InputLabel>
            <Select
              labelId='SubFundSelect-label'
              multiple
              value={selected}
              onChange={handleChange}
              renderValue={getStringValue}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 300,
                    width: 300
                  }
                },
                getContentAnchorEl: null,
                anchorOrigin: {
                  vertical: 'bottom',
                  horizontal: 'center'
                },
                transformOrigin: {
                  vertical: 'top',
                  horizontal: 'center'
                }
              }}
            >
              <MenuItem value='all'>
                <ListItemIcon>
                  <Checkbox
                    checked={isAllSelected}
                    indeterminate={
                      selected.length > 0 && selected.length < options.length
                    }
                  />
                </ListItemIcon>
                <ListItemText primary='Select All' />
              </MenuItem>
              {options.map(option => (
                <MenuItem key={option} value={option}>
                  <ListItemIcon>
                    <Checkbox checked={selected.includes(option)} />
                  </ListItemIcon>
                  <ListItemText primary={option} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )
      }}
    </SearchQueryFilter>
  )
}

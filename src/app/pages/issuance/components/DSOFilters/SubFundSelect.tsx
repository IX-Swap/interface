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
import { useVCCDSO } from 'app/pages/issuance/hooks/useVCCDSO'
import { DigitalSecurityOffering } from 'types/dso'

export const SubFundSelect = () => {
  const { data } = useVCCDSO()

  const options =
    data?.map((item: DigitalSecurityOffering) => ({
      name: item.tokenName,
      id: item._id
    })) ?? []

  return (
    <SearchQueryFilter name='subfunds'>
      {({ value, onChange }) => {
        const selected = hasValue<string>(value) ? value.split(',') : []
        const isAllSelected =
          options.length > 0 && selected?.length === options.length

        const getStringValue = (selectedValues: any) => {
          const names = selectedValues.map((id: string) => {
            const option = options.find((item: any) => item.id === id)
            return option?.name ?? null
          })

          return names?.filter((n: string) => n).join(',')
        }

        const handleChange = (event: any) => {
          const targetValue = event.target.value
          if (targetValue[targetValue.length - 1] === 'all') {
            onChange(
              isAllSelected
                ? []
                : options.map((option: any) => option.id).join(',')
            )
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
              {options?.length > 0 ? (
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
              ) : (
                <MenuItem value='none' disabled>
                  <ListItemText primary='No Subfunds found' />
                </MenuItem>
              )}
              {options?.map((option: any) => (
                <MenuItem key={option.id} value={option.id}>
                  <ListItemIcon>
                    <Checkbox checked={selected.includes(option.id)} />
                  </ListItemIcon>
                  <ListItemText primary={option.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )
      }}
    </SearchQueryFilter>
  )
}

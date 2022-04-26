import { FormControl, ListItemIcon, ListItemText } from '@mui/material'
import { useVCCDSO } from 'app/pages/issuance/hooks/useVCCDSO'
import { SearchQueryFilter } from 'components/SearchQueryFilter/SearchQueryFilter'
import { UICheckbox } from 'components/UICheckbox/UICheckbox'
import { hasValue } from 'helpers/forms'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import React, { useEffect } from 'react'
import { InputLabel } from 'ui/Select/InputLabel/InputLabel'
import { Select } from 'ui/Select/Select'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'

export const SubFundSelect = () => {
  const { data, isLoading } = useVCCDSO()
  const { getFilterValue, getHasValue, updateFilter } = useQueryFilter()
  const status = getFilterValue('status')
  useEffect(() => {
    if (!getHasValue('subfunds') && data !== undefined) {
      updateFilter('subfunds', data.map(dso => dso._id).join(','))
    }
    // since the functions inside useQueryFilter are not wrapped
    // in useCallback they will cause this effect to trigger more often than needed
    // also at this point it's quite hard to determine why it happens, because it's
    // related not only to the lack of useCallback
    // eslint-disable-next-line
  }, [status, data])

  const options =
    data?.map(item => ({
      name: item.tokenName,
      id: item._id
    })) ?? []

  const getStringValue = (selectedValues: any) => {
    const names = selectedValues.map((id: string) => {
      const option = options.find((item: any) => item.id === id)
      return option?.name ?? null
    })
    const result = names?.filter((n: string) => n).join(',')
    return result
  }

  return (
    <SearchQueryFilter name='subfunds'>
      {({ value, onChange }) => {
        const selected = hasValue<string>(value) ? value.split(',') : []
        const isAllSelected =
          options.length > 0 && selected?.length === options.length

        const handleChange = (event: any) => {
          const targetValue = event.target.value
          if (targetValue[targetValue.length - 1] === 'all') {
            onChange(
              isAllSelected
                ? ''
                : options?.map((option: any) => option.id).join(',')
            )
            return
          }
          onChange(targetValue)
        }

        return (
          <FormControl
            fullWidth
            variant='outlined'
            style={{ width: 300, marginTop: -12 }}
          >
            <InputLabel>Select Multiple Sub-funds</InputLabel>
            <Select
              displayEmpty
              multiple={true}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 300,
                    width: 300,
                    paddingRight: 15
                  }
                },
                anchorOrigin: {
                  vertical: 'bottom',
                  horizontal: 'center'
                },
                transformOrigin: {
                  vertical: 'top',
                  horizontal: 'center'
                }
              }}
              renderValue={values => getStringValue(values)}
              value={selected}
              onChange={handleChange}
              disabled={isLoading}
              label={undefined}
            >
              {options?.length > 0 ? (
                <SelectItem value='all'>
                  <ListItemIcon>
                    <UICheckbox
                      checked={isAllSelected}
                      indeterminate={
                        selected.length > 0 && selected.length < options.length
                      }
                    />
                  </ListItemIcon>
                  <ListItemText primary='Select All' />
                </SelectItem>
              ) : (
                <SelectItem value='none' disabled>
                  <ListItemText primary='No Subfunds found' />
                </SelectItem>
              )}
              {options?.map((option: any) => (
                <SelectItem key={option.id} value={option.id}>
                  <ListItemIcon>
                    <UICheckbox checked={selected.includes(option.id)} />
                  </ListItemIcon>
                  <ListItemText primary={option.name} />
                </SelectItem>
              ))}
            </Select>
          </FormControl>
        )
      }}
    </SearchQueryFilter>
  )
}

SubFundSelect.displayName = 'Select_SubFundSelect'

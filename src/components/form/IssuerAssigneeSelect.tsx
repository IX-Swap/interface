import React, { useState, useMemo } from 'react'
import {
  Box,
  FormControl,
  Select,
  ListSubheader,
  TextField,
  InputAdornment
} from '@mui/material'
import { InputLabel } from 'ui/Select/InputLabel/InputLabel'
import SearchIcon from '@mui/icons-material/Search'
import { useAllCorporates } from 'app/pages/identity/hooks/useAllCorporates'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'
const containsText = (text: any, searchText: string) =>
  text.toLowerCase().indexOf(searchText.toLowerCase()) > -1

export const IssuerAssigneeSelect = () => {
  const { data } = useAllCorporates({ all: true, status: 'Approved' })
  const [selectedOption, setSelectedOption] = useState(
    data?.list[0]?.companyLegalName
  )
  const [searchText, setSearchText] = useState('')

  const renderdOptions = data.list.map(data => {
    return data
  })

  const displayedOptions = useMemo(
    () =>
      renderdOptions.filter(option =>
        containsText(option?.companyLegalName, searchText)
      ),
    [searchText]
  )

  const setIssuerValue = (event: any, value: any) => {
    setSelectedOption(value?.props?.children)
    sessionStorage.setItem('issuerId', value?.props?.value)
  }
  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel placeholder='Select Issuer Assignee'>
          Issuer Assignee
        </InputLabel>
        <Select
          MenuProps={{ autoFocus: false }}
          labelId='search-select-label'
          placeholder='Select Issuer Assignee'
          value={selectedOption}
          onChange={setIssuerValue}
          onClose={() => setSearchText('')}
          renderValue={() => selectedOption}
        >
          <ListSubheader>
            <TextField
              size='small'
              autoFocus
              placeholder='Select Issuer Assignee'
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
              onChange={e => setSearchText(e.target.value)}
              onKeyDown={e => {
                if (e.key !== 'Escape') {
                  e.stopPropagation()
                }
              }}
            />
          </ListSubheader>
          {displayedOptions?.map((option, i) => (
            <SelectItem key={i} value={option?.user?._id}>
              {option?.companyLegalName}
            </SelectItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

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
import { useLocation } from 'react-router-dom'
const containsText = (text: any, searchText: string) =>
  text.toLowerCase().indexOf(searchText.toLowerCase()) > -1

export const IssuerAssigneeSelect = () => {
  const location = useLocation()
  const isEdit: boolean = location.pathname.includes('edit')
  const { data } = useAllCorporates({ all: true, status: 'Approved' })
  const corporateIdIndex: any = sessionStorage.getItem('corporateIdIndex')
  const [selectedOption, setSelectedOption] = useState(
    data?.list[corporateIdIndex ? corporateIdIndex : 0]?.companyLegalName
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
    const index = value?.key.split('$')[1]
    sessionStorage.setItem('corporateId', data?.list[index]?._id)
    sessionStorage.setItem('corporateIdIndex', index)
  }
  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel placeholder='Select Issuer Assignee'>
          Issuer Assignee
        </InputLabel>
        <Select
          disabled={isEdit}
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

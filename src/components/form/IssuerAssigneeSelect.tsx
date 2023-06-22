import React, { useState, useMemo, useEffect } from 'react'
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
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'
import { useLocation } from 'react-router-dom'
const containsText = (text: any, searchText: string) =>
  text.toLowerCase().indexOf(searchText.toLowerCase()) > -1

export type IssuerAssigneeSelectProps = {
  InputProps: any
}

export const IssuerAssigneeSelect = (props: IssuerAssigneeSelectProps) => {
  // const location = useLocation()
  // const isEdit: boolean = location.pathname.includes('edit')
  const corporateIdIndex = parseFloat(
    sessionStorage.getItem('corporateIdIndex')
  )
  const [selectedOption, setSelectedOption] = useState('')
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    setSelectedOption(
      `${
        props.InputProps?.data?.list[corporateIdIndex ? corporateIdIndex : 0]
          ?.companyLegalName
      } - ${
        props?.InputProps?.data?.list[corporateIdIndex ? corporateIdIndex : 0]
          ?.registrationNumber
      } - ${
        props?.InputProps?.data?.list[corporateIdIndex ? corporateIdIndex : 0]
          ?.user?.email
      }`
    )
  }, [props.InputProps?.data?.list])

  const [searchText, setSearchText] = useState('')

  const renderdOptions = props?.InputProps?.data?.list?.map((data: any) => {
    return data
  })

  const displayedOptions = useMemo(
    () =>
      renderdOptions.filter((option: { companyLegalName: string }) =>
        containsText(option?.companyLegalName, searchText)
      ),
    [searchText]
  )

  const setIssuerValue = (event: any, value: any) => {
    setSelectedOption(value?.props?.children)
    sessionStorage.setItem('issuerId', value?.props?.value)
    const index = value?.key.split('$')[1]
    sessionStorage.setItem(
      'corporateId',
      props?.InputProps?.data?.list[index]?._id
    )
    sessionStorage.setItem('corporateIdIndex', index)
  }
  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel placeholder='Select Issuer Assignee'>
          Issuer Assignee
        </InputLabel>
        <Select
          // disabled={isEdit}
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
          {displayedOptions?.map(
            (
              option: {
                user: {
                  _id: string | number | readonly string[] | undefined
                  email: string
                }
                companyLegalName: string
                registrationNumber: string
              },
              i: React.Key | null | undefined
            ) => (
              <SelectItem key={i} value={option?.user?._id}>
                {`${option?.companyLegalName} - ${option?.registrationNumber} - ${option?.user?.email}`}
                {/* {option?.companyLegalName} */}
              </SelectItem>
            )
          )}
        </Select>
      </FormControl>
    </Box>
  )
}

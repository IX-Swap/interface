/* eslint-disable @typescript-eslint/restrict-template-expressions */
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
  const location = useLocation()
  const isEdit: boolean = location.pathname.includes('edit')
  const [selectedOption, setSelectedOption] = useState('')
  useEffect(() => {
    console.log(props?.InputProps?.data?.list[0]?.companyLegalName, 'tetstst')
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    if (isEdit) {
      setSelectedOption(
        `${
          props?.InputProps?.editableData?.corporate?.companyLegalName
            ? props?.InputProps?.editableData?.corporate?.companyLegalName
            : ''
        } - ${
          props?.InputProps?.editableData?.corporate?.companyLegalName
            ? props?.InputProps?.editableData?.corporate?.registrationNumber
            : ''
        } - ${
          props?.InputProps?.editableData?.corporate?.companyLegalName
            ? props?.InputProps?.editableData?.corporate?.email
            : ''
        }`
      )
    } 
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
    console.log(value, 'vavavav')
    setSelectedOption(value?.props?.children)
    sessionStorage.setItem('issuerId', value?.props?.value)
    sessionStorage.setItem('corpoName', value?.props?.children)
    const corporateId = value?.key.split('$')[1]
    sessionStorage.setItem('corporateId', corporateId)
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
                _id: string
                user: {
                  _id: string | number | readonly string[] | undefined
                  email: string
                }
                companyLegalName: string
                registrationNumber: string
              },
              i: React.Key | null | undefined
            ) => (
              <SelectItem key={option?._id} value={option?.user?._id}>
                {`${option?.companyLegalName} - ${option?.registrationNumber} - ${option?.user?.email}`}
              </SelectItem>
            )
          )}
        </Select>
      </FormControl>
    </Box>
  )
}

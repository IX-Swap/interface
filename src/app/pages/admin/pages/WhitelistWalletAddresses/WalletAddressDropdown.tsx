import React from 'react'
import { FormControl, Box, Typography } from '@mui/material'
import { InputLabel } from 'ui/Select/InputLabel/InputLabel'
import { SelectProps } from 'ui/Select/Select'
import { Autocomplete } from 'ui/Select/Autocomplete'
import { useWalletAddresses } from 'app/pages/accounts/hooks/useWalletAddresses'
import { renderAddressColumn } from 'helpers/rendering'
import { renderIndividualOrCompanyName } from 'helpers/tables'

export const WalletAddressDropdown = (props: Partial<SelectProps>) => {
  const { data } = useWalletAddresses(false)

  if (data === undefined || data.length < 1) {
    return null
  }

  const options = data?.map(data => {
    console.log(data)
    return {
      label: data.address,
      render: (
        <Box
          display={'flex'}
          width={'100%'}
          alignItems='center'
          justifyContent={'space-between'}
          gap={1}
        >
          <Typography>
            {renderIndividualOrCompanyName(
              data?.identity?.individual?.firstName,
              data
            )}
          </Typography>
          <Typography color='tooltip.color'>
            {renderAddressColumn(data.address, false)}
          </Typography>
        </Box>
      ),
      value: data.address
    }
  })

  return (
    <FormControl fullWidth variant='outlined'>
      <InputLabel>Wallet Address</InputLabel>

      <Autocomplete
        options={options}
        placeholder='Select Wallet Address'
        {...props}
      />
    </FormControl>
  )
}

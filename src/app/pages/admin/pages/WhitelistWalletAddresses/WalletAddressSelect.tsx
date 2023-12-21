import React from 'react'
import { FormControl, Box, Typography } from '@mui/material'
import { InputLabel } from 'ui/Select/InputLabel/InputLabel'
import { SelectProps } from 'ui/Select/Select'
import { Autocomplete } from 'ui/Select/Autocomplete/Autocomplete'
import { useWalletAddresses } from 'app/pages/accounts/hooks/useWalletAddresses'
import { renderAddressColumn } from 'helpers/rendering'
import { renderIndividualOrCompanyName } from 'helpers/tables'

export const WalletAddressSelect = (props: Partial<SelectProps>) => {
  const { data } = useWalletAddresses('Approved', false, 500)

  if (data === undefined || data.length < 1) {
    return null
  }

  const options = data?.map((data: any) => {
    const name = renderIndividualOrCompanyName(
      data?.identity?.individual?.firstName,
      data
    )
    return {
      label: [name, data.address],
      render: (
        <Box
          display={'flex'}
          width={'100%'}
          alignItems='center'
          justifyContent={'space-between'}
          gap={1}
        >
          <Typography>{name}</Typography>
          <Typography color='tooltip.color'>
            {renderAddressColumn(data.address, false)}
          </Typography>
        </Box>
      ),
      value: [data.address, data?.user?._id].join('_')
    }
  })

  return (
    <FormControl fullWidth variant='outlined'>
      <InputLabel>Wallet Address</InputLabel>

      <Autocomplete
        {...props}
        placeholder='Select Wallet Address'
        options={options}
      />
    </FormControl>
  )
}

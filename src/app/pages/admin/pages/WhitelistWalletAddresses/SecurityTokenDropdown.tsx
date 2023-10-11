import React from 'react'
import { FormControl, Box, Typography } from '@mui/material'
import { InputLabel } from 'ui/Select/InputLabel/InputLabel'
import { SelectProps } from 'ui/Select/Select'
import { Autocomplete } from 'ui/Select/Autocomplete'
import { useAssetsData } from 'hooks/asset/useAssetsData'

export const SecurityTokenDropdown = (props: Partial<SelectProps>) => {
  const { data } = useAssetsData('Security')

  if (data === undefined || data.list.length < 1) {
    return null
  }

  const options = data?.list?.map(data => {
    return {
      label: [data.symbol, data.name, data?.network?.name],
      render: (
        <Box display={'flex'} alignItems='center' gap={1}>
          <Typography color='tooltip.color'>{data.symbol}</Typography>
          <Typography>{data.name}</Typography>
          <Box
            color='tooltip.color'
            sx={{
              backgroundColor: '#F0F2F7B2',
              paddingX: 1,
              paddingY: 0.5,
              borderRadius: '4px'
            }}
          >
            {data?.network?.name}
          </Box>
        </Box>
      ),
      value: data._id
    }
  })

  return (
    <FormControl fullWidth variant='outlined'>
      <InputLabel>Security Token</InputLabel>

      <Autocomplete
        {...props}
        placeholder='Select Security Token'
        options={options}
      />
    </FormControl>
  )
}

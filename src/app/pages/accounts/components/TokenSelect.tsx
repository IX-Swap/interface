import { SelectProps, FormControl } from '@mui/material'
// import { useGetCustody } from 'app/pages/accounts/hooks/useGetCustody'
// import { useGetTokenHoldings } from 'app/pages/accounts/hooks/useGetTokenHoldings'
import { useAssetsData } from 'hooks/asset/useAssetsData'
import React from 'react'
import { InputLabel } from 'ui/Select/InputLabel/InputLabel'
import { Autocomplete } from 'ui/Select/Autocomplete/Autocomplete'
import { SecurityTokenSelectItem } from 'ui/Select/SelectItem/SecurityToken/SecurityToken'

export const TokenSelect = React.forwardRef((props: SelectProps) => {
  //   const { data, isLoading } = useGetTokenHoldings()
  const { data, isLoading } = useAssetsData('Security', 500, true)

  if (isLoading || data === undefined || data.list.length < 1) {
    return null
  }

  const options = data?.list?.map(token => {
    return {
      label: [token?.symbol, token?.name, token?.network?.name],
      render: <SecurityTokenSelectItem sto={token} />,
      value: token
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
})

TokenSelect.defaultProps = {
  label: 'No tokens'
}

TokenSelect.displayName = 'Select_TokenSelect'

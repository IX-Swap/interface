import { SelectProps, FormControl } from '@mui/material'
import { useAssetsData } from 'hooks/asset/useAssetsData'
import React from 'react'
import { InputLabel } from 'ui/Select/InputLabel/InputLabel'
import { Autocomplete } from 'ui/Select/Autocomplete/Autocomplete'
import { SecurityTokenSelectItem } from 'ui/Select/SelectItem/SecurityToken/SecurityToken'

export const DeployedSecurityTokenSelect = React.forwardRef(
  (props: SelectProps) => {
    const { data, isLoading } = useAssetsData(
      props.type ?? 'Security',
      500,
      true
    )

    const hasTokens = !isLoading && data !== undefined && data.list.length > 0
    const options = !hasTokens
      ? []
      : data?.list?.map(token => {
          return {
            label: [token?.symbol, token?.name, token?.network?.name],
            render: <SecurityTokenSelectItem sto={token} />,
            value: token
          }
        })

    return (
      <FormControl fullWidth variant='outlined'>
        <InputLabel>{props.label ?? 'Select Security Token'}</InputLabel>

        <Autocomplete
          {...props}
          placeholder={
            hasTokens
              ? // eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-base-to-string
                `Select ${props.label ?? 'Select Security Token'}`
              : 'No tokens available'
          }
          disabled={isLoading || !hasTokens}
          options={options}
        />
      </FormControl>
    )
  }
)

DeployedSecurityTokenSelect.defaultProps = {
  label: 'No tokens'
}

DeployedSecurityTokenSelect.displayName = 'Select_DeployedSecurityTokenSelect'

import { SelectProps, FormControl, Box, Button } from '@mui/material'
// import { useGetCustody } from 'app/pages/accounts/hooks/useGetCustody'
import { useGetTokenHoldings } from 'app/pages/accounts/hooks/useGetTokenHoldings'
import React from 'react'
import { InputLabel } from 'ui/Select/InputLabel/InputLabel'
import { Autocomplete } from 'ui/Select/Autocomplete/Autocomplete'
import { SecurityTokenSelectItem } from 'ui/Select/SelectItem/SecurityToken/SecurityToken'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { InvestRoute } from 'app/pages/invest/router/config'

export const TokenHoldingsSelect = React.forwardRef((props: SelectProps) => {
  const { data, isLoading } = useGetTokenHoldings(props.type ?? 'Security')

  const hasTokens = !isLoading && data !== undefined && data.length > 0
  const options = !hasTokens
    ? []
    : data?.map(token => {
        return {
          label: [
            token?.asset?.symbol,
            token?.asset?.name,
            token?.asset?.network?.name
          ],
          render: <SecurityTokenSelectItem sto={token?.asset} />,
          value: token
        }
      })

  return (
    <FormControl fullWidth variant='outlined'>
      <InputLabel>{props.label ?? 'Select Security Token'}</InputLabel>

      <Box display={'flex'} gap={2}>
        <Autocomplete
          {...props}
          placeholder={
            hasTokens
              ? // eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-base-to-string
                `Select ${props.label ?? 'Select Security Token'}`
              : `You do not have a ${
                  props.type === 'Security' ? 'security token' : 'stablecoin'
                }`
          }
          disabled={isLoading || !hasTokens}
          options={options}
        />

        {!hasTokens && (
          <Button
            variant='contained'
            size='medium'
            sx={{ whiteSpace: 'nowrap' }}
            disableElevation
            component={AppRouterLinkComponent}
            to={InvestRoute.primaryOfferings}
          >
            Invest in STO
          </Button>
        )}
      </Box>
    </FormControl>
  )
})

TokenHoldingsSelect.defaultProps = {
  label: 'No tokens'
}

TokenHoldingsSelect.displayName = 'Select_TokenHoldingsSelect'

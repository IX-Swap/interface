import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Grid } from '@material-ui/core'
import { VSpacer } from 'components/VSpacer'
import { Alert } from '@material-ui/lab'
import { useAllNetworks } from 'app/pages/accounts/pages/withdrawalAddresses/hooks/useAllNetworks'

export const TOTAL_UNITS_WARNING =
  'Once the token is deployed you cannot change the total numbers of units.'

export const DSOTotalUnitsInfo = () => {
  const { watch } = useFormContext()
  const networkId = watch('network')
  const { data } = useAllNetworks()
  const selectedNetwork = data?.find(network => network._id === networkId)

  if (
    data === undefined ||
    selectedNetwork === undefined ||
    selectedNetwork?.networkCode === undefined ||
    !selectedNetwork.networkCode.startsWith('ALGO')
  ) {
    return null
  }

  return (
    <Grid item data-testid='dso-total-units-info'>
      <VSpacer size='small' />
      <Alert severity='info'>{TOTAL_UNITS_WARNING}</Alert>
    </Grid>
  )
}

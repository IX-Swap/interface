import React from 'react'
import { DigitalSecurityOffering } from 'v2/types/dso'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { DSOTitle } from 'v2/app/components/DSO/components/DSOTitle'
import { Asset } from 'v2/types/asset'
import { formatMoney } from 'v2/helpers/numbers'
import { useBalancesByAssetId } from 'v2/hooks/balance/useBalancesByAssetId'

export interface CommitmentViewHeaderProps {
  dso: DigitalSecurityOffering
  currency: Asset
  estimated: number
}

const useStyles = makeStyles(() => ({
  label: {
    fontWeight: 'bold',
    color: '#999999',
    fontSize: '0.95em'
  },
  value: {
    fontWeight: 'bold',
    fontSize: '1.45em'
  }
}))

const AssetBalance = ({ asset }: { asset: string }) => {
  const { data, isLoading } = useBalancesByAssetId(asset)

  if (isLoading) {
    return null
  }

  return (
    <BalanceHeader
      label='Account Balance'
      value={formatMoney(
        data.map[asset].available ?? 0,
        data.map[asset].numberFormat.currency
      )}
    />
  )
}

const BalanceHeader = ({ label, value }: { label: string; value: string }) => {
  const classes = useStyles()

  return (
    <Grid item xs={3} container justify='center' direction='column'>
      <Typography className={classes.label}>{label}:</Typography>
      <Typography className={classes.value}>{value}</Typography>
    </Grid>
  )
}

export const CommitmentViewHeader = (props: CommitmentViewHeaderProps) => {
  const { dso, currency, estimated } = props

  return (
    <Grid container justify='space-between'>
      <Grid item xs={6}>
        <DSOTitle dso={dso} />
      </Grid>
      <AssetBalance asset={currency._id} />
      <BalanceHeader
        label='Estimated Value'
        value={formatMoney(estimated, currency.symbol)}
      />
    </Grid>
  )
}

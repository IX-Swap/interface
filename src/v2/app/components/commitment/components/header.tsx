import React, { useEffect } from 'react'
import { useBalancesStore } from '../../../../context/balances'
import { Dso } from '../../../../types/dso'
import storageHelper from '../../../../helpers/storageHelper'
import { noop } from 'lodash'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import DsoTitle from '../../digital-security/title'
import { useObserver } from 'mobx-react'
import { Asset } from '../../../../types/asset'
import { formatMoney } from '../../../../helpers/numbers'
import { useBalancesByAssetId } from 'v2/context/balances/useBalancesByAssetId'

interface CommitmentViewHeaderProps {
  dso: Dso
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
  const { data } = useBalancesByAssetId(asset)

  return useObserver(() => (
    <BalanceHeader
      label='Account Balance'
      value={formatMoney(
        data.map[asset].available ?? 0,
        data.map[asset].numberFormat.currency
      )}
    />
  ))
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

const CommitmentViewHeader = ({
  dso,
  currency,
  estimated
}: CommitmentViewHeaderProps) => {
  return (
    <Grid container justify='space-between'>
      <Grid item xs={6}>
        <DsoTitle dso={dso} />
      </Grid>
      <AssetBalance asset={currency._id} />
      <BalanceHeader
        label='Estimated Value'
        value={formatMoney(estimated, currency.symbol)}
      />
    </Grid>
  )
}

export default CommitmentViewHeader

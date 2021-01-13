import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { useFormContext } from 'react-hook-form'
import { useAssetsData } from 'hooks/asset/useAssetsData'

export const MinimumInvestment = () => {
  const { watch } = useFormContext()
  const minimumUnitInvestment = watch('minimumInvestment', 0)
  const unitPrice = watch('pricePerUnit', 0)
  const assetId = watch('currency', '')
  const { data } = useAssetsData('Currency')
  const currency = data?.map[assetId]?.symbol

  const minimumnInvestment =
    parseFloat(minimumUnitInvestment) * parseFloat(unitPrice)

  return !isNaN(minimumnInvestment) && minimumnInvestment !== 0 ? (
    <Grid
      container
      direction='column'
      justify='flex-end'
      alignItems='flex-start'
      spacing={0}
    >
      <Typography style={{ lineHeight: '100%' }} variant='subtitle1'>
        Minimum Invesment
      </Typography>
      <Typography variant='subtitle1' color='textSecondary'>
        {minimumnInvestment} {currency}
      </Typography>
    </Grid>
  ) : null
}

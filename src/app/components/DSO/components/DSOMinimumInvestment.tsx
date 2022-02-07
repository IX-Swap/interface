import React from 'react'
import { Grid, Typography } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { useAssetsData } from 'hooks/asset/useAssetsData'
import { addSymbol } from 'helpers/numbers'

export const DSOMinimumInvestment = () => {
  const { watch } = useFormContext()
  const minimumUnitInvestment = watch('minimumInvestment')
  const unitPrice = watch('pricePerUnit')
  const assetId = watch('currency')
  const { data } = useAssetsData('Currency')
  const currency = data?.map[assetId]?.symbol

  const minimumnInvestment =
    parseFloat(minimumUnitInvestment) * parseFloat(unitPrice)

  return !isNaN(minimumnInvestment) && minimumnInvestment !== 0 ? (
    <Grid
      container
      direction='column'
      justifyContent='flex-end'
      alignItems='flex-start'
      spacing={0}
    >
      <Typography style={{ lineHeight: '100%' }} variant='subtitle1'>
        Minimum Invesment
      </Typography>
      <Typography variant='subtitle1' color='textSecondary'>
        {addSymbol(minimumnInvestment, currency, true)}
      </Typography>
    </Grid>
  ) : null
}

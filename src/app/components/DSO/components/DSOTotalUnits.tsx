import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Grid, Icon, Tooltip, Typography, Box } from '@material-ui/core'
import ErrorOutlineRoundedIcon from '@material-ui/icons/ErrorOutlineRounded'
import NumberFormat from 'react-number-format'
import { moneyNumberFormat } from 'config/numberFormat'
import { DSOTotalUnitsInfo } from 'app/components/DSO/components/DSOTotalUnitsInfo'

export const DSOTotalUnits = () => {
  const { watch } = useFormContext()
  const totalAmount = watch('totalFundraisingAmount')
  const unitPrice = watch('pricePerUnit')
  const totalUnits = parseFloat(totalAmount) / parseFloat(unitPrice)

  if (isNaN(totalUnits)) return null

  return (
    <Grid
      container
      direction='column'
      justifyContent='flex-end'
      alignItems='flex-start'
    >
      <Grid item container justifyContent='flex-start' alignItems='center'>
        <Typography style={{ lineHeight: '100%' }} variant='subtitle1'>
          Total Units
        </Typography>
        <Box pr={1} />
        <Tooltip
          title='No. of units that will be deployed.'
          placement='right'
          arrow
        >
          <Icon>
            <ErrorOutlineRoundedIcon color='disabled' />
          </Icon>
        </Tooltip>
      </Grid>
      <Typography variant='subtitle1' color='textSecondary'>
        <NumberFormat
          {...moneyNumberFormat}
          value={totalUnits}
          displayType='text'
        />
      </Typography>
      <DSOTotalUnitsInfo />
    </Grid>
  )
}

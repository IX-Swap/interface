import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Grid, Icon, Tooltip, Typography, Box } from '@material-ui/core'
import ErrorOutlineRoundedIcon from '@material-ui/icons/ErrorOutlineRounded'
import NumberFormat from 'react-number-format'
import { moneyNumberFormat } from 'config/numberFormat'

export const DSOTotalUnits = () => {
  const { watch } = useFormContext()
  const totalAmount = watch('totalFundraisingAmount')
  const unitPrice = watch('pricePerUnit')
  const totalUnits = parseFloat(totalAmount) / parseFloat(unitPrice)

  return !isNaN(totalUnits) && totalUnits !== 0 ? (
    <Grid
      container
      direction='column'
      justify='flex-end'
      alignItems='flex-start'
      spacing={0}
    >
      <Grid item container justify='flex-start' alignItems='center'>
        <Typography style={{ lineHeight: '100%' }} variant='subtitle1'>
          Total Units
        </Typography>
        <Box pr={1} />
        <Tooltip
          title='No. of units investor will get under minimum investment'
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
    </Grid>
  ) : null
}

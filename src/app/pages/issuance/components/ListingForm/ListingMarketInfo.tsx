import React from 'react'
import { FormSectionHeader } from 'app/pages/identity/components/FormSectionHeader'
import { FormControlLabel, Grid, Typography } from '@mui/material'
import { TypedField } from 'components/form/TypedField'
import { RadioGroup } from 'components/form/RadioGroup'
import { useFormContext } from 'react-hook-form'
import { useAssetsData } from 'hooks/asset/useAssetsData'
import { LoadingIndicator } from 'app/components/LoadingIndicator/LoadingIndicator'
import { UIRadio } from 'components/UIRadio/UIRadio'
import { useStyles } from 'app/pages/accounts/components/CurrencySelect/CurrencySelect.styles'
import classnames from 'classnames'

export const ListingMarketInfo = () => {
  const classes = useStyles()
  const { control, watch, setValue } = useFormContext()
  const currency = watch('currency')
  const { data, isLoading } = useAssetsData('Currency')

  const currencyList = data.list.reverse()

  if (isLoading) {
    return <LoadingIndicator />
  }

  return (
    <Grid item container direction='column' spacing={5}>
      <Grid item>
        <FormSectionHeader title={'Market'} />
      </Grid>

      <Grid item container direction={'column'} spacing={1.5}>
        <Grid item>
          <Typography>
            Select the currency you would like this Digital Security to be
            traded against
          </Typography>
        </Grid>

        <Grid item>
          <TypedField
            customRenderer
            component={RadioGroup}
            name='currency'
            label=''
            control={control}
          >
            <Grid
              container
              display={'grid'}
              gap={{ xs: 1.5, md: 3 }}
              gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }}
            >
              {currencyList.map(item => {
                return (
                  <Grid
                    item
                    key={item._id}
                    data-testid='radioWrapper'
                    className={classnames(classes.button, {
                      [classes.active]: currency === item._id
                    })}
                    onClick={() => setValue('currency', item._id)}
                  >
                    <FormControlLabel
                      label={item.symbol}
                      value={item._id}
                      control={<UIRadio />}
                    />
                  </Grid>
                )
              })}
            </Grid>
          </TypedField>
        </Grid>
      </Grid>
    </Grid>
  )
}

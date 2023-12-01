import { FormControlLabel, Grid, Typography } from '@mui/material'
import { LoadingIndicator } from 'app/components/LoadingIndicator/LoadingIndicator'
import { useStyles } from 'app/pages/accounts/components/CurrencySelect/CurrencySelect.styles'
import { FormSectionHeader } from 'ui/FormSectionHeader/FormSectionHeader'
import classnames from 'classnames'
import { RadioGroup } from 'components/form/RadioGroup'
import { TypedField } from 'components/form/TypedField'
import { UIRadio } from 'components/UIRadio/UIRadio'
import { useAssetsData } from 'hooks/asset/useAssetsData'
import React, { useEffect, useMemo } from 'react'
import { useFormContext } from 'react-hook-form'

export const ListingMarketInfo = (props: any) => {
  const classes = useStyles()
  const { control, watch, setValue } = useFormContext()
  const currency = watch('currency')
  const { status, isNew, data: dsoData } = props

  const { data, isLoading } = useAssetsData('Currency')
  const currencyList = useMemo(() => data.list.reverse(), [data])

  useEffect(() => {
    if (!isLoading && data !== undefined && data.list.length > 0) {
      setValue(
        'currency',
        dsoData?.currency !== undefined
          ? dsoData?.currency?._id
          : dsoData?.markets[0]?.currency
      )
    }
  }, [
    data,
    currencyList,
    isLoading,
    setValue,
    dsoData?.markets,
    dsoData?.currency
  ])

  if (isLoading) {
    return <LoadingIndicator />
  }

  return null

  return (
    <Grid item container direction='column' spacing={5}>
      <Grid item>
        <FormSectionHeader title={'Market'} />
      </Grid>

      <Grid item container direction={'column'} spacing={1.5}>
        <Grid item>
          <Typography>
            Select the currency you would like this Security Token to be traded
            against
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
              style={{
                // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                opacity: status === 'Approved' && !isNew ? '.3' : 'initial',
                filter:
                  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                  status === 'Approved' && !isNew ? 'grayscale(1)' : 'none'
              }}
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
                    style={{
                      pointerEvents:
                        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                        status === 'Approved' && !isNew ? 'none' : 'auto'
                    }}
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

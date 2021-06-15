import React from 'react'
import { VSpacer } from 'components/VSpacer'
import { FormSectionHeader } from 'app/pages/identity/components/FormSectionHeader'
import { FormControlLabel, Grid, Radio, Typography } from '@material-ui/core'
import { TypedField } from 'components/form/TypedField'
import { RadioGroup } from 'components/form/RadioGroup'
import { useFormContext } from 'react-hook-form'
import { useAssetsData } from 'hooks/asset/useAssetsData'
import getSymbolFromCurrency from 'currency-symbol-map'
import { LoadingIndicator } from 'app/components/LoadingIndicator/LoadingIndicator'

export const ListingMarketInfo = () => {
  const { control } = useFormContext()
  const { data, isLoading } = useAssetsData('Currency')

  if (isLoading) {
    return <LoadingIndicator />
  }

  return (
    <Grid item>
      <Grid container direction='column'>
        <Grid item>
          <FormSectionHeader
            title={
              <>
                <Typography variant={'h3'}>Market</Typography>
                <VSpacer size={'small'} />
                <Typography>
                  Creating a market allows investors to trade this Digital
                  Security on the OTC market or Exchange using their preferred
                  currency
                </Typography>
              </>
            }
          />
        </Grid>

        <Grid item>
          <Typography>
            Select the currency you would like this Digital Security to be
            traded against
          </Typography>
          <VSpacer size={'small'} />
          {/* @ts-ignore */}
          <TypedField
            customRenderer
            component={RadioGroup}
            name='currency'
            label=''
            control={control}
          >
            {data.list.map(item => {
              return (
                <FormControlLabel
                  // eslint-disable-next-line
                  label={`${item.name} (${getSymbolFromCurrency(item.symbol)})`}
                  value={item._id}
                  control={<Radio />}
                />
              )
            })}
          </TypedField>
        </Grid>

        <Grid item>
          <VSpacer size={'small'} />
          <Typography>Where do you want to list this Market?</Typography>
          <VSpacer size={'small'} />
          {/* @ts-ignore */}
          <TypedField
            customRenderer
            component={RadioGroup}
            name='marketType'
            label=''
            control={control}
          >
            <Grid container spacing={3}>
              <Grid item>
                <FormControlLabel
                  label='Exchange'
                  value='Exchange'
                  control={<Radio />}
                />
              </Grid>
            </Grid>
          </TypedField>
        </Grid>
      </Grid>
    </Grid>
  )
}

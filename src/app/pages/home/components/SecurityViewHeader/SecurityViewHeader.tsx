import { Avatar, Box, Grid, Typography } from '@material-ui/core'
import { Security } from 'app/pages/home/components/Securities/SecurityCard'
import { LabelledValue } from 'components/LabelledValue'
import { hasValue } from 'helpers/forms'
import { formatMoney } from 'helpers/numbers'
import React from 'react'

export interface SecurityViewHeaderProps {
  data: Security
}

export const SecurityViewHeader = ({ data }: SecurityViewHeaderProps) => {
  return (
    <Grid container spacing={3} justify='space-between'>
      <Grid item>
        <Grid container spacing={3}>
          <Grid item>
            {data.logo !== undefined ? (
              <Avatar
                variant='square'
                src={data.logo?.publicUrl ?? ''}
                alt={data.ticker ?? ''}
                style={{
                  width: 150,
                  height: 'auto',
                  objectFit: 'contain'
                }}
              />
            ) : null}
          </Grid>
          <Grid item>
            <Grid
              container
              direction='column'
              justify='center'
              style={{ height: '100%' }}
            >
              <Grid item>
                <Typography variant='subtitle1' style={{ fontSize: 20 }}>
                  {data.ticker}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant='subtitle1' style={{ fontWeight: 400 }}>
                  {data.firm}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item style={{ paddingTop: 20 }}>
        <Grid container spacing={3} justify='flex-end'>
          <Grid item>
            <LabelledValue
              label='Current Price:'
              value={
                hasValue(data.currentPrice) &&
                hasValue(data.priceChange24Hours) ? (
                  <Typography style={{ fontWeight: 'bold' }}>
                    {formatMoney(data.currentPrice ?? 0, '$')}
                    <Box ml={1} component='span' style={{ opacity: 0.7 }}>
                      {data.priceChange24Hours}%
                    </Box>
                  </Typography>
                ) : undefined
              }
              valueWeight='bold'
              labelWeight='thin'
            />
          </Grid>
          <Grid item>
            <LabelledValue
              label='Issuance Platform:'
              value={data.issuancePlatform}
              valueWeight='bold'
              labelWeight='thin'
            />
          </Grid>
          <Grid item>
            <LabelledValue
              label='Exchange:'
              value={data.exchange}
              valueWeight='bold'
              labelWeight='thin'
            />
          </Grid>
          <Grid item>
            <LabelledValue
              label='Status:'
              value={data.status}
              valueWeight='bold'
              labelWeight='thin'
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  Grid,
  Typography
} from '@material-ui/core'
import { EducationCentreRoute } from 'app/pages/educationCentre/router/config'
import { AppRouterLink } from 'components/AppRouterLink'
import { LabelledValue } from 'components/LabelledValue'
import { stringTruncate } from 'config/utils'
import { hasValue } from 'helpers/forms'
import { formatMoney } from 'helpers/numbers'
import React from 'react'
import { generatePath } from 'react-router-dom'

export interface Activity {
  date: string
  price: number
}

export interface Security {
  ticker?: string | null
  logo?: {
    publicUrl?: string | null
  }
  description: string | null
  firm?: string | null
  priceChange24Hours?: number | null
  priceChange1Month?: number | null
  priceChange1Week?: number | null
  priceChange1Year?: number | null
  priceChangeYTD?: number | null
  assetClass?: string | null
  industry?: string | null
  country?: string | null
  status?: string | null
  currentPrice?: number | null
  issuePrice?: string | null
  fundingGoal?: string | null
  totalCapitalization?: string | null
  website?: string | null
  amountRaised?: string | null
  protocol?: string | null
  issuancePlatform?: string | null
  exchange?: string | null
  oneYearAverageDailyVolume?: number | null
  oneYearMedianPrice?: number | null
  oneYearLowPrice?: number | null
  oneYearHighPrice?: number | null
  oneYearAveragePrice?: number | null
  marketCapitalization?: number | null
  issuanceDate?: string | null
  tokenSupply?: string | null
  tokensOffered?: string | null
  issuerPriceTimeseries?: [] | null
  reserved?: string | null
}

export const SecurityCard = ({
  description,
  assetClass,
  industry,
  country,
  status,
  currentPrice,
  priceChange24Hours,
  logo,
  ticker,
  firm
}: Security) => {
  return (
    <Card
      elevation={0}
      style={{
        backgroundColor: '#121937',
        color: 'rgba(255,255,255,.7)',
        height: '100%'
      }}
    >
      <CardActionArea
        style={{ height: '100%', color: '#FFF' }}
        component={AppRouterLink}
        to={generatePath(EducationCentreRoute.security, {
          ticker: ticker ?? ''
        })}
      >
        <Box padding={4} height='100%' display='flex'>
          <Grid
            container
            direction='column'
            spacing={4}
            justifyContent='space-between'
          >
            <Grid item>
              <Grid
                container
                spacing={2}
                justifyContent='space-between'
                alignItems='center'
                wrap='nowrap'
              >
                <Grid item xs={2}>
                  {logo !== undefined ? (
                    <Avatar
                      variant='square'
                      src={logo?.publicUrl ?? ''}
                      alt={ticker ?? ''}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain'
                      }}
                    />
                  ) : null}
                </Grid>
                <Grid item xs={10}>
                  <Grid
                    container
                    justifyContent='space-between'
                    wrap='nowrap'
                    spacing={1}
                  >
                    <Grid item>
                      <Grid
                        container
                        direction='column'
                        justifyContent='center'
                        style={{ height: '100%' }}
                      >
                        <Grid item>
                          <Typography
                            variant='subtitle1'
                            style={{ color: '#FFF', fontSize: 20 }}
                          >
                            {ticker}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography
                            variant='subtitle1'
                            style={{ fontWeight: 400 }}
                          >
                            {firm}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Grid
                        container
                        direction='column'
                        justifyContent='center'
                        style={{ height: '100%' }}
                      >
                        <Grid item>
                          <Typography
                            variant='subtitle1'
                            align='right'
                            style={{ color: '#FFF' }}
                            noWrap
                          >
                            {hasValue(currentPrice) &&
                              formatMoney(currentPrice ?? 0, '$')}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant='body1' align='right' noWrap>
                            {hasValue(priceChange24Hours)
                              ? `${priceChange24Hours ?? 0}%`
                              : null}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant='body1'>
                {stringTruncate(description ?? '', 190)}
              </Typography>
            </Grid>
            <Grid item>
              <Grid container spacing={2} justifyContent='space-between'>
                <Grid item>
                  <LabelledValue
                    labelWeight='default'
                    labelColor='dark'
                    label='Security Type:'
                    valueColor='#FFF'
                    labelFontSize={12}
                    valueFontSize={12}
                    value={assetClass}
                  />
                </Grid>
                <Grid item>
                  <LabelledValue
                    labelWeight='default'
                    labelColor='dark'
                    label='Industry:'
                    valueColor='#FFF'
                    labelFontSize={12}
                    valueFontSize={12}
                    value={industry}
                  />
                </Grid>
                <Grid item>
                  <LabelledValue
                    labelWeight='default'
                    labelColor='dark'
                    label='Country:'
                    valueColor='#FFF'
                    labelFontSize={12}
                    valueFontSize={12}
                    value={country}
                  />
                </Grid>
                <Grid item>
                  <LabelledValue
                    labelWeight='default'
                    labelColor='dark'
                    label='Status:'
                    valueColor='#FFF'
                    labelFontSize={12}
                    valueFontSize={12}
                    value={status}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </CardActionArea>
    </Card>
  )
}

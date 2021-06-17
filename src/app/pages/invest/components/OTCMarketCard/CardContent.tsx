import React from 'react'
import { DigitalSecurityOffering } from 'types/dso'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { renderStringToHTML } from 'app/components/DSO/utils'
import useStyles from 'app/pages/invest/components/OTCMarketCard/CardContent.style'
import { LabelledValue } from 'components/LabelledValue'
import { formatMoney } from 'helpers/numbers'
import { VSpacer } from 'components/VSpacer'
import getSymbolFromCurrency from 'currency-symbol-map'

export interface CardContentProps {
  // TODO Add interface after complete final version backend api
  data: DigitalSecurityOffering | any
  type: 'Primary' | 'OTC'
}

export const CardContent = (props: CardContentProps) => {
  const { data, type } = props
  const classes = useStyles()

  return (
    <Box>
      <Grid container direction='column'>
        <Grid item>
          <Typography>
            <div className={classes.introduction}>
              {renderStringToHTML(
                type === 'Primary' ? data.introduction : data.description
              )}
            </div>
          </Typography>
        </Grid>
        <Grid item>
          <VSpacer size='small' />
          <LabelledValue
            item
            reverse
            valueWeight='custom'
            labelWeight='default'
            valueFontSize={16}
            labelFontSize={14}
            label='Token Symbol'
            value={data.tokenSymbol}
          />
        </Grid>

        <Grid item>
          <VSpacer size='small' />
          <LabelledValue
            item
            reverse
            valueWeight='custom'
            labelWeight='default'
            valueFontSize={16}
            labelFontSize={14}
            label={
              type === 'Primary' ? 'Minimum Investment' : 'Min. Trade Amount'
            }
            // TODO Remove this after add new interface for data prop
            // eslint-disable-next-line
            value={`${data.tokenSymbol} ${
              // TODO Remove this after add new interface for data prop
              // eslint-disable-next-line
              type === 'Primary'
                ? data.minimumInvestment
                : data.minimumTradeUnits
            }`}
          />
        </Grid>

        <Grid item>
          <VSpacer size='small' />
          <LabelledValue
            item
            reverse
            valueWeight='custom'
            labelWeight='default'
            valueFontSize={16}
            labelFontSize={14}
            label={type === 'Primary' ? 'Raised Amount' : 'Target Fundraise'}
            value={formatMoney(
              type === 'Primary'
                ? data.totalFundraisingAmount
                : data.raisedAmount,
              // TODO Remove fake data after added new field on backend api
              getSymbolFromCurrency(
                type === 'Primary' ? data.currency.symbol : 'SGD'
              )
            )}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

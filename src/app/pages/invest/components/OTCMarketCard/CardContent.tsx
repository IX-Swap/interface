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
  dso: DigitalSecurityOffering
}

export const CardContent = (props: CardContentProps) => {
  const { dso } = props
  const classes = useStyles()

  return (
    <Box>
      <Grid container direction='column'>
        <Grid item>
          <Typography>
            <div className={classes.introduction}>
              {renderStringToHTML(dso.introduction)}
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
            value={dso.tokenSymbol}
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
            label='Minimum Investment'
            value={dso.minimumInvestment}
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
            label='Raised Amount'
            value={formatMoney(
              dso.totalFundraisingAmount,
              getSymbolFromCurrency(dso.currency.symbol)
            )}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

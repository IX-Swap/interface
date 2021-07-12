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

export interface CardContentProps {
  // TODO Add interface after complete final version backend api
  data: DigitalSecurityOffering | any
  type: 'Primary' | 'OTC'
}

export const CardContent = (props: CardContentProps) => {
  const { data, type } = props
  const classes = useStyles()
  const minimumInvestmentPrice =
    data.minimumInvestment !== undefined
      ? formatMoney(
          data.minimumInvestment * data.pricePerUnit,
          data.currency.symbol
        )
      : 0

  return (
    <Box>
      <Grid container direction='column'>
        <Grid item>
          {type === 'OTC' ? (
            <Typography className={classes.introduction}>
              {renderStringToHTML(data.description)}
            </Typography>
          ) : (
            <>
              <VSpacer size='small' />
              <LabelledValue
                item
                row
                valueWeight='custom'
                labelWeight='default'
                valueFontSize={16}
                labelFontSize={14}
                label='Closing Date:'
                value={data.completionDate}
              />
            </>
          )}
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
            label={type === 'OTC' ? 'Token Symbol' : 'Expected Return'}
            value={
              type === 'OTC'
                ? data.tokenSymbol
                : (data.capitalStructure === 'Debt'
                    ? data.interestRate
                    : data.grossIRR
                  )
                    .toString()
                    .concat('%')
            }
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
              type === 'Primary'
                ? 'Min. Investment Amount'
                : 'Min. Trade Amount'
            }
            value={
              type === 'Primary'
                ? minimumInvestmentPrice
                : // TODO Remove this after add new interface for data prop
                  // eslint-disable-next-line
                  `${data.tokenSymbol} ${data.minimumTradeUnits}`
            }
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
              type === 'Primary' ? data.currency.symbol : 'SGD'
            )}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

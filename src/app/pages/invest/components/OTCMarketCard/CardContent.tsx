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
import { percentageToNumber } from 'app/pages/issuance/utils'

export interface CardContentProps {
  data: DigitalSecurityOffering | any
  type: 'Primary' | 'OTC' | 'TopOffers'
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
                : percentageToNumber(
                    data.capitalStructure === 'Debt'
                      ? data.interestRate
                      : data.grossIRR
                  )
                    ?.toFixed(2)
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
              type !== 'OTC' ? 'Min. Investment Amount' : 'Min. Trade Amount'
            }
            value={
              type !== 'OTC'
                ? minimumInvestmentPrice
                : // eslint-disable-next-line
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
            label={
              type !== 'OTC' ? 'Total Fundraising Amount' : 'Target Fundraise'
            }
            value={formatMoney(
              type !== 'OTC' ? data.totalFundraisingAmount : data.raisedAmount,
              type !== 'OTC' ? data.currency.symbol : 'SGD'
            )}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

import React from 'react'
import { DigitalSecurityOffering } from 'types/dso'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import useStyles from 'app/pages/invest/components/OTCMarketCard/OTCMarketCard.styles'
import { CardCover } from 'app/pages/invest/components/OTCMarketCard/CardCover'
import { CardContent } from 'app/pages/invest/components/OTCMarketCard/CardContent'
import { Grid } from '@material-ui/core'
import { PrimaryInvestLink } from 'app/pages/invest/components/OTCMarketCard/PrimaryInvestLink'

export interface OTCMarketCardProps {
  type: 'Primary' | 'OTC'
  data: DigitalSecurityOffering
  viewURL: string
}

export const OTCMarketCard = (props: OTCMarketCardProps) => {
  const { data, viewURL, type } = props
  const classes = useStyles()

  return (
    <Card
      className={classes.root}
      variant='outlined'
      elevation={0}
      style={{ flexDirection: 'column' }}
    >
      <Box px={3} pt={2.5} pb={5} height='100%'>
        <CardCover type={type} data={data} viewURL={viewURL} />
        <CardContent type={type} data={data} />
        <Grid container item justify='flex-end'>
          <PrimaryInvestLink type={type} data={data} />
        </Grid>
      </Box>
    </Card>
  )
}

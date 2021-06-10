import React from 'react'
import { DigitalSecurityOffering } from 'types/dso'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import useStyles from 'app/pages/invest/components/OTCMarketCard/OTCMarketCard.styles'
import { CardCover } from 'app/pages/invest/components/OTCMarketCard/CardCover'
import { CardContent } from 'app/pages/invest/components/OTCMarketCard/CardContent'
import { DSOInvestLink } from 'app/components/DSO/components/DSOInvestLink'
import { Grid } from '@material-ui/core'

export interface OTCMarketCardProps {
  dso: DigitalSecurityOffering
  viewURL: string
}

export const OTCMarketCard = (props: OTCMarketCardProps) => {
  const { dso, viewURL } = props
  const classes = useStyles()

  return (
    <Card
      className={classes.root}
      variant='outlined'
      elevation={0}
      style={{ flexDirection: 'column' }}
    >
      <Box px={3} pt={2.5} pb={5} height='100%'>
        <CardCover dso={dso} viewURL={viewURL} />
        <CardContent dso={dso} />
        <Grid container item justify='flex-end'>
          <DSOInvestLink dso={dso} variant={'text'} />
        </Grid>
      </Box>
    </Card>
  )
}

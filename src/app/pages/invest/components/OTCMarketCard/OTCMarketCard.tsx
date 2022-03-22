import React from 'react'
import { DigitalSecurityOffering } from 'types/dso'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import useStyles from 'app/pages/invest/components/OTCMarketCard/OTCMarketCard.styles'
import { CardCover } from 'app/pages/invest/components/OTCMarketCard/CardCover'
import { CardContent } from 'app/pages/invest/components/OTCMarketCard/CardContent'
import { Button, Grid } from '@mui/material'
import { PrimaryInvestLink } from 'app/pages/invest/components/OTCMarketCard/PrimaryInvestLink'
import Typography from '@mui/material/Typography'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { VSpacer } from 'components/VSpacer'
import classNames from 'classnames'

export interface OTCMarketCardProps {
  type: 'Primary' | 'OTC' | 'TopOffers'
  data: DigitalSecurityOffering
  viewURL: string
}

export const OTCMarketCard = (props: OTCMarketCardProps) => {
  const { data, viewURL, type } = props
  const classes = useStyles()
  const getCapitalStructureCustomClasses = (capitalStructure: string) => {
    if (capitalStructure === 'Hybrid') {
      return classes.hybrid
    }
    if (capitalStructure === 'Debt') {
      return classes.debt
    }
    return classes.equity
  }

  return (
    <Card
      data-testid='primaryDsoCard'
      className={classes.root}
      variant='outlined'
      elevation={0}
      style={{ flexDirection: 'column' }}
    >
      <Box px={3} pt={2.5} pb={5} height='100%'>
        <CardCover type={type} data={data} viewURL={viewURL} />
        <CardContent type={type} data={data} />
        {type !== 'OTC' ? (
          <>
            <VSpacer size='small' />
            <Button
              className={classes.link}
              component={AppRouterLinkComponent}
              to={viewURL}
              params={{ dsoId: data._id, issuerId: data.createdBy }}
              variant='text'
              color='primary'
            >
              Learn More
            </Button>
          </>
        ) : null}

        <Grid
          container
          item
          justifyContent='space-between'
          alignItems={'center'}
        >
          {type !== 'OTC' ? (
            <Typography
              className={classNames(
                classes.capitalStructure,
                getCapitalStructureCustomClasses(data.capitalStructure)
              )}
            >
              {data.capitalStructure.toUpperCase()}
            </Typography>
          ) : null}
          <PrimaryInvestLink type={type} data={data} />
        </Grid>
      </Box>
    </Card>
  )
}

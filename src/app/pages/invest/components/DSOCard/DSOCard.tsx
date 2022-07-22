import React from 'react'
import { DigitalSecurityOffering } from 'types/dso'
import Card from '@mui/material/Card'
import useStyles from './DSOCard.styles'
import { Button, Grid } from '@mui/material'
import { DSOCardAction } from 'app/pages/invest/components/DSOCard/DSOCardAction'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { DSOCardCover } from 'app/pages/invest/components/DSOCard/DSOCardCover'
import { DSOLogo } from 'app/components/DSO/components/DSOLogo'
import { PrimaryCardContent } from 'app/pages/invest/components/DSOCard/PrimaryCardContent'
import { OTCCardContent } from 'app/pages/invest/components/DSOCard/OTCCardContent'

export interface DSOCardProps {
  type: 'Primary' | 'OTC' | 'TopOffers'
  data: DigitalSecurityOffering
  viewURL: string
}

export const DSOCard = (props: DSOCardProps) => {
  const classes = useStyles()
  const typeWithLogo = ['OTC', 'TopOffers']

  const { data, viewURL, type } = props

  return (
    <Card
      data-testid='primaryDsoCard'
      className={classes.container}
      variant='outlined'
      elevation={0}
      style={{ flexDirection: 'column' }}
    >
      {type !== 'OTC' && (
        <DSOCardCover type={type} data={data} viewURL={viewURL} />
      )}

      <Grid
        container
        justifyContent={'center'}
        alignItems={'center'}
        className={classes.logoWrapper}
      >
        <Grid item>
          <DSOLogo
            uri={typeWithLogo.includes(type) ? '/dataroom/raw/' : undefined}
            size={80}
            dsoId={type === 'Primary' ? data._id : data.logo}
            variant='circular'
            className={classes.logo}
          />
        </Grid>
      </Grid>

      {type === 'OTC' ? (
        <OTCCardContent data={data} />
      ) : (
        <PrimaryCardContent data={data} />
      )}

      {/* TODO Uncomment and add value from api response when backend part will be completed */}
      {/* <Typography className={classes.status}> */}
      {/*  Accredited Investors only */}
      {/* </Typography> */}

      <Grid container item justifyContent='space-between' alignItems={'center'}>
        <DSOCardAction type={type} data={data} />
        {type !== 'OTC' ? (
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
        ) : null}
      </Grid>
    </Card>
  )
}

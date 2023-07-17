import React from 'react'
import { DigitalSecurityOffering } from 'types/dso'
import Card from '@mui/material/Card'
import useStyles from './STOCard.styles'
import { Box, Button, Grid } from '@mui/material'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { DSOLogo } from 'app/components/DSO/components/DSOLogo'
import { STODetails } from 'app/pages/invest/components/STOCard/STODetails'
import { Avatar } from 'components/Avatar'

export interface STOCardProps {
  type: 'Primary' | 'OTC' | 'TopOffers'
  data: DigitalSecurityOffering
  viewURL: string
  refetch: () => void
}

export const STOCard = (props: STOCardProps) => {
  const classes = useStyles()
  const typeWithLogo = ['OTC', 'TopOffers']
  const { data, viewURL, type } = props

  return (
    <Card
      data-testid='primaryDsoCard'
      className={classes.container}
      variant='outlined'
      elevation={0}
      style={{ flexDirection: 'column', padding: 0 }}
    >
      <Avatar
        documentId={data.coverImg}
        size={['100%', '295px']}
        cursor='default'
      >
        <Box bgcolor={'#E6ECFF'} width={'100%'} height={'100%'} />
      </Avatar>

      <Box px={3} pb={3}>
        <Grid
          container
          justifyContent={'start'}
          alignItems={'center'}
          className={classes.logoWrapper}
          mt={'-30px'}
        >
          <Grid item>
            <DSOLogo
              uri={typeWithLogo.includes(type) ? '/dataroom/raw/' : undefined}
              size={64}
              dsoId={type === 'Primary' ? data._id : data.logo}
              variant='circular'
              className={classes.logo}
            />
          </Grid>
        </Grid>

        <STODetails data={data} />

        <Grid
          container
          item
          justifyContent='space-between'
          alignItems={'center'}
        >
          <Button
            className={classes.link}
            component={AppRouterLinkComponent}
            to={viewURL}
            params={
              type === 'OTC'
                ? { dsoId: data.dso, issuerId: data.user }
                : { dsoId: data._id, issuerId: data.user }
            }
            variant='outlined'
            color='primary'
          >
            {data.status === 'Approved' ? 'Learn More' : 'Complete STO'}
          </Button>
        </Grid>
      </Box>
    </Card>
  )
}

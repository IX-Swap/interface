import { Button, Grid } from '@mui/material'
import { SelectionIdentityCard } from 'app/pages/identity/components/SelectionIdentityCard/SelectionIdentityCard'
import React from 'react'
import { ReactComponent as CorporateImage } from 'assets/images/corporate.svg'
import { ReactComponent as IssuerImage } from 'assets/images/issuer.svg'
import { ReactComponent as IndividualImage } from 'assets/images/individual.svg'
import { Icon } from 'ui/Icons/Icon'
import { IdentityRoute } from 'app/pages/identity/router/config'

export const IdentitySelectionView = () => {
  return (
    <Grid container spacing={3} justifyContent='center'>
      <Grid item>
        <SelectionIdentityCard
          title='Individual'
          description='Suitable for users who are individual investors'
          image={<IndividualImage />}
          actionButton={
            <Button
              disableElevation
              fullWidth
              variant='outlined'
              href={IdentityRoute.createIndividual}
              startIcon={<Icon name='plus' />}
            >
              Individual Identity
            </Button>
          }
        />
      </Grid>
      <Grid item>
        <SelectionIdentityCard
          title='Corporate'
          description='Suitable for users who want to invest via a corporate capacity'
          image={<CorporateImage />}
          actionButton={
            <Button
              disableElevation
              fullWidth
              variant='outlined'
              href={IdentityRoute.createCorporate}
              startIcon={<Icon name='plus' />}
            >
              Corporate Identity
            </Button>
          }
        />
      </Grid>
      <Grid item>
        <SelectionIdentityCard
          title='Issuer'
          description='Suitable for users who want to use platform for fundraising'
          image={<IssuerImage />}
          actionButton={
            <Button
              disableElevation
              fullWidth
              variant='outlined'
              href={IdentityRoute.createIssuer}
              startIcon={<Icon name='plus' />}
            >
              Issuer Identity
            </Button>
          }
        />
      </Grid>
    </Grid>
  )
}

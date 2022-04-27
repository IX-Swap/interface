import { Button, Grid } from '@mui/material'
import { CorporateIdentityCard } from 'app/pages/identity/components/CorporateIdentityCard/CorporateIdentityCard'
import React from 'react'
import { ReactComponent as CorporateImage } from 'assets/images/corporate.svg'
import { ReactComponent as IssuerImage } from 'assets/images/issuer.svg'
import { Icon } from 'ui/Icons/Icon'
import { IdentityRoute } from 'app/pages/identity/router/config'

export const IdentitySelectionView = () => {
  return (
    <Grid container spacing={3} justifyContent='center'>
      <Grid item>
        <CorporateIdentityCard
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
        <CorporateIdentityCard
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
      <Grid item xs={12} container justifyContent='center'>
        <Button
          disableElevation
          variant='outlined'
          href={IdentityRoute.createIndividual}
          startIcon={<Icon name='plus' />}
        >
          Individual Identity
        </Button>
      </Grid>
    </Grid>
  )
}

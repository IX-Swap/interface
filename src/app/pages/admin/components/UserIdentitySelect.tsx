import { Button, FormControl, Grid, MenuItem, Typography } from '@mui/material'
import { useStyles } from 'app/pages/admin/components/UserIdentitySelect.styles'
import { AdminRoute } from 'app/pages/admin/router/config'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import React, { useState } from 'react'
import { UserIdentityCreatedStatus } from 'types/user'
import { TextFieldSelect } from 'components/form/TextFieldSelect'

export interface UserIdentitySelectProps {
  userIdentities: UserIdentityCreatedStatus
  userId: string
}

export const UserIdentitySelect = ({
  userIdentities,
  userId
}: UserIdentitySelectProps) => {
  const hasIndividual = userIdentities.individual
  const hasInvestor = userIdentities.investors
  const hasIssuer = userIdentities.issuers
  const hasIdentity = hasIndividual || hasInvestor || hasIssuer

  const { active, root } = useStyles()
  const [identity, setIdentity] = useState(
    !hasIdentity ? 'no identity' : 'individual'
  )

  const getPath = () => {
    if (identity === 'issuers') {
      return AdminRoute.createIssuerIdentity
    }
    if (identity === 'investors') {
      return AdminRoute.createCorporateIdentity
    }
    if (identity === 'individual') {
      return AdminRoute.createIndividualIdentity
    }
    return AdminRoute.users
  }

  const issuerActive = identity === 'issuers'
  const investorActive = identity === 'investors'
  const individualActive = identity === 'individual'

  const getDisabled = () => {
    if ((issuerActive && hasInvestor) || (investorActive && hasIssuer)) {
      return true
    }

    if (issuerActive || investorActive || individualActive) {
      return false
    }

    return true
  }

  return (
    <Grid container spacing={1} justifyContent='flex-start' alignItems='center'>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <TextFieldSelect
            value={identity}
            onChange={value => setIdentity(value?.target.value)}
            variant='outlined'
            fullWidth
          >
            {!hasIdentity ? (
              <MenuItem value='no identity'>
                <Typography classes={{ root: active }}>
                  No Identity Created Yet
                </Typography>
              </MenuItem>
            ) : null}
            <MenuItem value='individual'>
              <Typography classes={{ root: hasIndividual ? active : root }}>
                Individual Investor
              </Typography>
            </MenuItem>
            <MenuItem value='investors'>
              <Typography classes={{ root: hasInvestor ? active : root }}>
                Corporate Investor
              </Typography>
            </MenuItem>
            <MenuItem value='issuers'>
              <Typography classes={{ root: hasIssuer ? active : root }}>
                Issuer (Raise Capital)
              </Typography>
            </MenuItem>
          </TextFieldSelect>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <Button
          component={AppRouterLinkComponent}
          to={getPath()}
          params={{ userId }}
          variant='outlined'
          color='primary'
          disabled={getDisabled()}
        >
          Create Identity
        </Button>
      </Grid>
    </Grid>
  )
}

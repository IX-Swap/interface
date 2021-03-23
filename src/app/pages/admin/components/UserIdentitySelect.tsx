import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography
} from '@material-ui/core'
import { useStyles } from 'app/pages/admin/components/UserIdentitySelect.styles'
import { useIdentitiesRouter } from 'app/pages/_identity/router'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import React, { useState } from 'react'
import { UserIdentityCreatedStatus } from 'types/user'

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
  const { paths: identityPaths } = useIdentitiesRouter()
  const { active, root } = useStyles()
  const [identity, setIdentity] = useState(!hasIdentity ? 'no identity' : '')

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setIdentity(event.target.value as string)
  }

  const getPath = () => {
    if (identity === 'issuers') {
      return identityPaths.createIssuer
    }
    if (identity === 'investors') {
      return identityPaths.createCorporate
    }
    return identityPaths.createIndividual
  }

  const getDisabled = () => {
    if (
      (identity === 'issuers' && !hasIssuer) ||
      (identity === 'investors' && !hasInvestor) ||
      (identity === 'individual' && !hasIndividual)
    ) {
      return false
    }

    return true
  }

  return (
    <Grid container spacing={1} justify='flex-start' alignItems='center'>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel variant='outlined'>Identity Status</InputLabel>
          <Select
            value={identity}
            onChange={handleChange}
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
          </Select>
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

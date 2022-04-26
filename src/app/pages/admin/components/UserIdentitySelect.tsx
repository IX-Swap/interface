import { Button, FormControl, Grid, Typography } from '@mui/material'
import { useStyles } from 'app/pages/admin/components/UserIdentitySelect.styles'
import { AdminRoute } from 'app/pages/admin/router/config'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import React, { useState } from 'react'
import { UserIdentityCreatedStatus } from 'types/user'
import { InputLabel } from 'ui/Select/InputLabel/InputLabel'
import { Select } from 'ui/Select/Select'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'
export interface UserIdentitySelectProps {
  userIdentities: UserIdentityCreatedStatus
  userId: string
}
type IdentityType = 'no identity' | 'individual' | 'investors' | 'issuers'

const labelMap: { [key in IdentityType]: string } = {
  'no identity': 'No Identity Created Yet',
  individual: 'Individual Investor',
  investors: 'Corporate Investor',
  issuers: 'Issuer (Raise Capital)'
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
  const [identity, setIdentity] = useState<IdentityType>(
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
      <Grid item xs={7}>
        <FormControl>
          <InputLabel>Identity Status</InputLabel>
          <Select
            value={identity}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 300,
                  width: 250,
                  paddingRight: 15
                }
              }
            }}
            renderValue={value => labelMap[value as IdentityType]}
            onChange={value => setIdentity(value?.target.value as IdentityType)}
            fullWidth
          >
            {!hasIdentity ? (
              <SelectItem value='no identity'>
                <Typography classes={{ root: active }}>
                  No Identity Created Yet
                </Typography>
              </SelectItem>
            ) : null}
            <SelectItem value='individual'>
              <Typography classes={{ root: hasIndividual ? active : root }}>
                Individual Investor
              </Typography>
            </SelectItem>
            <SelectItem value='investors'>
              <Typography classes={{ root: hasInvestor ? active : root }}>
                Corporate Investor
              </Typography>
            </SelectItem>
            <SelectItem value='issuers'>
              <Typography classes={{ root: hasIssuer ? active : root }}>
                Issuer (Raise Capital)
              </Typography>
            </SelectItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
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

UserIdentitySelect.displayName = 'TextField_UserIdentitySelect'

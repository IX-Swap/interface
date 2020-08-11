import React, { useEffect } from 'react'
import { useObserver } from 'mobx-react'
import { noop } from 'lodash'
import { Grid, Box, Button } from '@material-ui/core'

import { useStore as useGlobalIdentityStore } from '../../../../../context/identity'
import { useStore as useIdentityPageStore } from '../context'
import storageHelper from '../../../../../helpers/storageHelper'
import IdentitySection from '../../../components/identity-forms/components/section'
import UserInfoComponent from '../../../components/identity-forms/components/user-info'
import CompanyInformation from '../../../components/identity-forms/components/company-info'
import {
  IndividualIdentity,
  CorporateIdentity
} from '../../../../../types/identity'
import { useRouteMatch, useHistory } from 'react-router-dom'

const Identity = () => {
  const identityStore = useGlobalIdentityStore()
  const identityPageStore = useIdentityPageStore()
  const match = useRouteMatch()
  const history = useHistory()

  useEffect(() => {
    identityStore
      .getIdentities(storageHelper.getUserId())
      .then(noop)
      .catch(noop)
  }, [identityStore])

  const onClickIndividual = (row: IndividualIdentity) => {
    identityPageStore.setIndividualIdentity(row)
    history.push(`${match.path}individual`)
  }

  const onClickCorporate = (row: CorporateIdentity) => {
    identityPageStore.setCorporateIdentity(row)
    history.push(`${match.path}corporate`)
  }

  return useObserver(() => {
    const name = `${identityStore.individualIdentity?.firstName} ${identityStore.individualIdentity?.lastName}`

    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box position='relative'>
            <IdentitySection title={`Individual Identity (${name})`}>
              {identityStore.individualIdentity && (
                <UserInfoComponent
                  identity={identityStore.individualIdentity}
                  useOwnEmail
                  editMode={false}
                />
              )}
            </IdentitySection>
            <Box position='absolute' right='5em' top='0.8em'>
              <Button
                color='primary'
                onClick={() => {
                  if (identityStore.individualIdentity) {
                    onClickIndividual(identityStore.individualIdentity)
                  }
                }}
              >
                <b>View</b>
              </Button>
            </Box>
          </Box>
        </Grid>

        {identityStore.corporateIdentities?.map(identity => {
          return (
            <Grid item xs={12} key={identity._id}>
              <Box position='relative'>
                <IdentitySection
                  title={`Corporate Identity (${identity.companyLegalName})`}
                >
                  {identityStore.individualIdentity && (
                    <CompanyInformation
                      corporate={identity}
                      useOwnEmail={false}
                      editMode={false}
                    />
                  )}
                </IdentitySection>
                <Box position='absolute' right='5em' top='0.8em'>
                  <Button
                    color='primary'
                    onClick={() => onClickCorporate(identity)}
                  >
                    <b>View</b>
                  </Button>
                </Box>
              </Box>
            </Grid>
          )
        })}
      </Grid>
    )
  })
}

export default Identity

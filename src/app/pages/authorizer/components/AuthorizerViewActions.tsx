import { Grid } from '@mui/material'
import React, { PropsWithChildren } from 'react'
import { AuthorizableWithIdentity, DataroomFeature } from 'types/authorizer'
import { AuthorizerForm } from 'app/pages/authorizer/components/AuthorizerForm'
import { useAuthorizerCategory } from 'hooks/location/useAuthorizerCategory'
import { AuthorizerCategory } from 'types/app'
import { DigitalSecurityOffering } from 'types/dso'
import { VisibilitySwitch } from 'app/pages/authorizer/components/VisibilitySwitch'
import { AuthorizerActions } from './AuthorizerActions/AuthorizerActions'
import { FormSectionHeader } from 'ui/FormSectionHeader/FormSectionHeader'
import { FieldContainer } from 'ui/FieldContainer/FieldContainer'
import { AuthorizableStatus } from 'types/util'

export interface AuthorizerViewActionsProps<T> {
  data: T & AuthorizableWithIdentity
  feature: typeof DataroomFeature[keyof typeof DataroomFeature]
  statusFieldName?: string
}

const transactionalCategories = [
  AuthorizerCategory.CashWithdrawals,
  AuthorizerCategory.SecurityTokenWithdrawals,
  AuthorizerCategory.Commitments,
  AuthorizerCategory.Offerings,
  AuthorizerCategory.WithdrawalAddresses
]

export const AuthorizerViewActions = <T,>(
  props: PropsWithChildren<AuthorizerViewActionsProps<T>>
) => {
  const category = useAuthorizerCategory()
  const isTransaction = transactionalCategories.includes(category)
  const { data, feature, statusFieldName = 'status' } = props
  //   const hasIdentity = data.identity !== undefined
  const documents = data.authorizationDocuments ?? []
  const approvedOrRejected = ['Approved', 'Rejected'].includes(
    data[statusFieldName as keyof typeof data] as AuthorizableStatus
  )
  const showForm = !(isTransaction || approvedOrRejected)

  return (
    <Grid container direction='column' spacing={3} sx={{ paddingLeft: '25px' }}>
      <FieldContainer>
        <Grid item container direction={'column'} spacing={5}>
          <Grid item>
            <FormSectionHeader title='Authorizer Action (Optional)' />
          </Grid>
          <Grid item>
            {category !== 'virtual-accounts' && (
              <AuthorizerActions
                id={data._id}
                feature={feature}
                documents={documents}
              />
            )}

            {showForm && (
              <Grid item style={{ marginTop: 20 }}>
                <AuthorizerForm
                  status={
                    data[
                      statusFieldName as keyof typeof data
                    ] as AuthorizableStatus
                  }
                  itemId={data._id}
                  feature={feature}
                  listingType={data?.listingType}
                />
              </Grid>
            )}

            {category === AuthorizerCategory.Offerings && (
              <Grid
                container
                item
                justifyContent='flex-end'
                style={{ marginTop: 20 }}
              >
                <VisibilitySwitch
                  dso={data as unknown as DigitalSecurityOffering}
                />
              </Grid>
            )}
          </Grid>
        </Grid>
      </FieldContainer>
    </Grid>
  )
}

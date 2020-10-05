import { Grid, Typography, Box } from '@material-ui/core'
import React, { PropsWithChildren } from 'react'
import { AuthorizationDocuments } from 'v2/app/pages/authorizer/components/AuthorizationDocuments'
import { AuthorizerForm } from './AuthorizerForm'
import { AuthorizableWithIdentity, DataroomFeature } from 'v2/types/authorizer'
import { AuthorizableStatus } from './AuthorizableStatus'
import { VSpacer } from '../../../../components/VSpacer'
import { formatDateAndTime } from '../../../../helpers/dates'
import { AuthorizerIdentities } from './AuthorizerIdentities'
import { AuthorizableLevel } from './AuthorizableLevel'

export interface AuthorizerViewProps<T> {
  title: string
  data: T & AuthorizableWithIdentity
  feature: DataroomFeature
}

export const AuthorizerView = <T,>(
  props: PropsWithChildren<AuthorizerViewProps<T>>
) => {
  const { title, data, feature, children } = props
  const hasIdentity = data.identity !== undefined

  return (
    <Grid container spacing={6}>
      {hasIdentity && (
        <AuthorizerIdentities
          corporates={data.identity?.corporates}
          individual={data.identity?.individual}
        />
      )}
      <Grid item xs={hasIdentity ? 9 : 12}>
        <Grid container direction='column' spacing={3}>
          <Grid item>
            <Typography>{formatDateAndTime(data.createdAt)}</Typography>
          </Grid>

          <Grid item container justify='space-between'>
            <Typography variant='h2'>{title}</Typography>
            <Box display='flex'>
              <AuthorizableLevel level={data.level} compact={false} />
              <Box px={0.5} />
              <AuthorizableStatus status={data.status} compact={false} />
            </Box>
          </Grid>

          <Grid item>{children}</Grid>
          <VSpacer size='large' />

          <Grid item>
            <Typography variant='h3'>Authorization Documents</Typography>
            <AuthorizationDocuments
              documents={data.authorizationDocuments ?? []}
              resourceId={data._id}
              feature={feature}
            />
          </Grid>

          <Grid item>
            <AuthorizerForm
              itemId={data._id}
              defaultValues={{
                sharedWithUser: data.authorization?.sharedWithUser ?? false,
                comment: data.authorization?.comment ?? ''
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

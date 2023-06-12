import React from 'react'
import { Grid } from '@mui/material'
import { Avatar } from 'components/Avatar'
import { useUserById } from 'app/pages/admin/hooks/useUserById'
import { UserDetails } from 'app/pages/admin/components/UserDetails'
import { UserStatus } from 'app/pages/admin/components/UserStatus'
import { IndividualAccountSettings } from 'app/pages/admin/components/IndividualAccountSettings'
import { useParams } from 'react-router-dom'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { ReactComponent as AvatarPhoto } from 'assets/icons/new/avatar.svg'
import { useStyles } from '../components/UserDetails.styles'
import { VSpacer } from 'components/VSpacer'

export const ViewUser: React.FC = () => {
  const params = useParams<{ userId: string }>()
  const { data, isLoading } = useUserById(params.userId)
  const classes = useStyles()
  const { containerAvatar, whiteBackground, verticalLine } = classes
  if (isLoading || data === undefined) {
    return null
  }

  return (
    <Grid container item direction='column' style={{ display: 'table' }}>
      <Grid item>
        <PageHeader title={data?.name} />
      </Grid>

      <Grid className={whiteBackground}>
        <VSpacer size='medium' />
        <Grid item>
          <Grid container>
            <Grid item md={1} sx={{ marginLeft: '150px' }}>
              <Grid className={containerAvatar} item>
                <Avatar
                  // documentId={avatar}
                  // ownerId={userId}
                  variant='circular'
                  borderRadius={100}
                  fallback={<AvatarPhoto />}
                />
              </Grid>
            </Grid>
            <Grid item md={4}>
              <UserDetails data={data} />
            </Grid>
            <Grid className={verticalLine} item></Grid>
            <Grid item md={5}>
              <Grid container spacing={3} direction='column'>
                <Grid item>
                  <UserStatus data={data} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid>
        <IndividualAccountSettings activeRoles={data.roles.split(',')} />
      </Grid>
    </Grid>
  )
}

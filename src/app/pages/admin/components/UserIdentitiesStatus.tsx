import { ManagedUser } from 'types/user'
import React from 'react'
import { UserIdentitySelect } from 'app/pages/admin/components/UserIdentitySelect'

export interface UserIdentitiesStatusProps {
  data: ManagedUser
}

export const UserIdentitiesStatus = ({ data }: UserIdentitiesStatusProps) => {
  const { _id, identity } = data

  return <UserIdentitySelect userIdentities={identity} userId={_id} />
}

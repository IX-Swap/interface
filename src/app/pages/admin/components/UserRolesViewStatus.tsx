import User from 'types/user'
import React from 'react'
import { UserRolesSelect } from './UserRolesSelect'

export interface UserRolesStatusProps {
  data: any
}

export const UserRolesViewStatus = ({ data }: UserRolesStatusProps) => {
  const {roles } = data

  return <UserRolesSelect user={roles} />
}

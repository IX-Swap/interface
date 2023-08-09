import React from 'react'
import { ReactComponent as Icon } from 'assets/images/dashboard/account-actions/kyc.svg'
import { ActionItem } from './ActionItem'
import { AppRoute } from 'app/router/config'
import { IdentityRoute } from 'app/pages/identity/router/config'

interface KnowYourCustomerProps {
  hasStarted: boolean
  identityType: 'individual' | 'corporate'
  identityId?: string
  userId?: string
}

export const KnowYourCustomer = ({
  hasStarted = false,
  identityType,
  identityId,
  userId
}: KnowYourCustomerProps) => {
  const title = !hasStarted ? 'Apply for KYC' : 'Finish your KYC'
  const description = 'Complete your KYC to access platform features.'
  const buttonText = !hasStarted ? 'Apply Now' : 'Finish KYC'
  const buttonLink = !hasStarted
    ? `${AppRoute.identity}/${identityType}s/create`
    : identityType === 'individual'
    ? IdentityRoute.editIndividual
    : IdentityRoute.editCorporate
  const params = !hasStarted ? {} : { identityId, userId }

  return (
    <ActionItem
      icon={<Icon />}
      title={title}
      description={description}
      buttonText={buttonText}
      buttonLink={buttonLink}
      params={params}
    />
  )
}
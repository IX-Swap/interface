import React from 'react'
import { ReactComponent as Icon } from 'assets/images/dashboard/account-actions/accreditation.svg'
import { ActionItem } from './ActionItem'
import { IdentityRoute } from 'app/pages/identity/router/config'

interface AccreditationProps {
  hasStarted: boolean
  identityType: 'individual' | 'corporate'
  identityId?: string
  userId?: string
}

export const Accreditation = ({
  hasStarted = false,
  identityType,
  identityId,
  userId
}: AccreditationProps) => {
  const title = !hasStarted
    ? 'Apply for Accreditation'
    : 'Finish your Accreditation'
  const description =
    'Complete your investor declaration to access exclusive deals.'
  const buttonText = !hasStarted ? 'Apply Now' : 'Finish Accreditation'
  const buttonLink = !hasStarted
    ? identityType === 'individual'
      ? IdentityRoute.createIndividualAccreditation
      : IdentityRoute.createCorporateAccreditation
    : identityType === 'individual'
    ? IdentityRoute.editIndividualAccreditation
    : IdentityRoute.editCorporateAccreditation
  const params = { identityId, userId }

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

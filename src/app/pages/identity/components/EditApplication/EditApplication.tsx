import React from 'react'
import { Typography } from '@mui/material'
import { EditButton } from 'app/pages/identity/components/EditButton/EditButton'
import { capitalizeFirstLetter } from 'helpers/strings'

export interface EditApplicationProps {
  applicationType: 'kyc' | 'accreditation'
  identityType: 'individual' | 'corporate'
  identityId: string
  userId: string
  link: string
}

export const EditApplication: React.FC<EditApplicationProps> = ({
  applicationType,
  identityType,
  identityId,
  userId,
  link
}) => {
  const application = applicationType === 'kyc' ? 'KYC' : 'Accreditation'
  const identity = capitalizeFirstLetter(identityType)

  return (
    <>
      <Typography
        variant={'h5'}
        color={'text.primary'}
        textAlign={'center'}
        mb={4}
      >
        {`Edit ${identity} ${application}`}
      </Typography>
      <Typography
        variant={'body1'}
        color={'text.primary'}
        textAlign={'center'}
        mb={4}
      >
        You may edit your {identityType}{' '}
        {applicationType === 'kyc'
          ? applicationType.toUpperCase()
          : applicationType}{' '}
        at any point after the submission of the application, and the resulting
        changes will be subject to approval.
      </Typography>

      <EditButton
        showIcon
        fullWidth
        variant={'contained'}
        link={link}
        params={{
          identityId,
          userId
        }}
        customLabel
        sx={{
          paddingLeft: '10px !important',
          paddingRight: '10px !important',
          width: '100% !important'
        }}
      >
        Edit {application}
      </EditButton>
    </>
  )
}

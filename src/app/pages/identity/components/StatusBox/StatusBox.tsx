import React, { ReactElement } from 'react'
import { Typography, Box } from '@mui/material'
import { ReactComponent as PendingImage } from 'assets/images/kyc-accreditation-status/pending.svg'
import { ReactComponent as RejectedImage } from 'assets/images/kyc-accreditation-status/rejected.svg'
import { ReactComponent as ApprovedImage } from 'assets/images/kyc-accreditation-status/approved.svg'
import { ReactComponent as LockedImage } from 'assets/images/kyc-accreditation-status/locked.svg'
import { ReactComponent as AccreditedImage } from 'assets/images/kyc-accreditation-status/accredited.svg'
import { useStyles } from './StatusBox.styles'
import { capitalizeFirstLetter } from 'helpers/strings'

export interface StatusBoxProps {
  status: 'Pending' | 'Rejected' | 'Approved' | 'Locked' | 'Accredited' | string
  identityType: 'individual' | 'corporate'
  applicationType: 'kyc' | 'accreditation'
  investorRole?: string[]
  isForAuthorizer?: boolean
}
interface Status {
  status: string
  image: any
  className: string
  title: string
  description: string | ReactElement
}

export const StatusBox = (props: StatusBoxProps) => {
  const {
    status,
    identityType,
    applicationType,
    investorRole,
    isForAuthorizer = false
  } = props
  const { container, pending, rejected, approved, locked, accredited } =
    useStyles()
  const application = applicationType === 'kyc' ? 'KYC' : 'Accreditation'
  const identity = capitalizeFirstLetter(identityType)
  //   const infoType =
  //     applicationType === 'kyc'
  //       ? identityType === 'individual'
  //         ? 'personal'
  //         : 'corporate'
  //       : 'financial'

  const applicationStatus =
    applicationType === 'accreditation' && status === 'Approved'
      ? 'Accredited'
      : status

  const defaultStatus = {
    status: 'Pending',
    image: PendingImage,
    className: pending,
    title: `${identity} ${application} Pending Approval`,
    description: !isForAuthorizer ? (
      <>
        Your {`${identity} ${application}`} has not been approved yet. <br />
        Please check back later.
      </>
    ) : (
      <>
        You have not approved the {`${identity} ${application}`} of this user
        yet.
      </>
    )
  }

  const statusList: Status[] = [
    defaultStatus,
    {
      status: 'Rejected',
      image: RejectedImage,
      className: rejected,
      title: `${identity} ${application} Application Rejected`,
      description: `Your ${identity} ${application} has been rejected.`
    },
    {
      status: 'Approved',
      image: ApprovedImage,
      className: approved,
      title: `${identity} ${application} Application Approved`,
      description: (
        <>
          Your {`${identity} ${application}`} has been approved. <br />
          You may proceed to the Accreditation tab to apply for corporate
          accreditation.
        </>
      )
    },
    {
      status: 'Locked',
      image: LockedImage,
      className: locked,
      title: `Application for ${identity} Accreditation Locked`,
      description: (
        <>
          {`You cannot apply for ${identity} accreditation at the moment as your
          ${identity} KYC has not been approved yet.`}
          <br />
          Please try again later.
        </>
      )
    },
    {
      status: 'Accredited',
      image: AccreditedImage,
      className: accredited,
      title: `${identity} Accreditation Approved`,
      description: (
        <>
          Your {identity} Accreditation has been approved. <br />
          You are now an{' '}
          {typeof investorRole !== 'undefined' && investorRole.length > 0
            ? capitalizeFirstLetter(investorRole[0])
            : 'Accredited'}{' '}
          Investor.
        </>
      )
    }
  ]

  const filtered = statusList.find(x => x.status === applicationStatus)
  const alertStatus = typeof filtered !== 'undefined' ? filtered : defaultStatus
  const { image: Image, title, description, className } = alertStatus

  return !isForAuthorizer || status === 'Submitted' ? (
    <Box className={[container, className].join(' ')}>
      <Image />
      <Typography variant='h5'>{title}</Typography>
      <Typography>{description}</Typography>
    </Box>
  ) : null
}

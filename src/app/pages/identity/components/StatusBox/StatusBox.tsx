import React, { ReactElement } from 'react'
import { Typography, Box } from '@mui/material'
import { ReactComponent as PendingImage } from 'assets/images/kyc-accreditation-status/pending.svg'
import { ReactComponent as RejectedImage } from 'assets/images/kyc-accreditation-status/rejected.svg'
import { ReactComponent as ApprovedImage } from 'assets/images/kyc-accreditation-status/approved.svg'
import { ReactComponent as LockedImage } from 'assets/images/kyc-accreditation-status/locked.svg'
import { ReactComponent as AccreditedImage } from 'assets/images/kyc-accreditation-status/accredited.svg'
import { useStyles } from './StatusBox.styles'

export interface StatusBoxProps {
  status: 'Pending' | 'Rejected' | 'Approved' | 'Locked' | 'Accredited' | string
  identityType: 'individual' | 'corporate'
  applicationType: 'kyc' | 'accreditation'
}
interface Status {
  status: string
  image: any
  className: string
  title: string
  description: string | ReactElement
}

export const StatusBox = (props: StatusBoxProps) => {
  const { status, identityType, applicationType } = props
  const { container, pending, rejected, approved, locked, accredited } =
    useStyles()
  const application = applicationType === 'kyc' ? 'Identity' : 'Accreditation'
  const infoType =
    applicationType === 'kyc'
      ? identityType === 'individual'
        ? 'personal'
        : 'corporate'
      : 'financial'

  const defaultStatus = {
    status: 'Pending',
    image: PendingImage,
    className: pending,
    title: `${application} Pending Approval`,
    description: (
      <>
        Your {infoType} information has not been approved yet. <br />
        Please check back later.
      </>
    )
  }

  const statusList: Status[] = [
    defaultStatus,
    {
      status: 'Rejected',
      image: RejectedImage,
      className: rejected,
      title: `${application} Application Rejected`,
      description: `Your ${infoType} information has been rejected.`
    },
    {
      status: 'Approved',
      image: ApprovedImage,
      className: approved,
      title: `${application} Application Approved`,
      description: (
        <>
          Your {infoType} information has been approved. <br />
          You may proceed to the Accreditation tab to apply to become an
          Accredited Investor.
        </>
      )
    },
    {
      status: 'Locked',
      image: LockedImage,
      className: locked,
      title: 'Application for Investor Accreditation Locked',
      description: (
        <>
          You cannot apply to become an Accredited Investor at the moment as
          your personal information has not been approved yet. <br />
          Please try again later.
        </>
      )
    },
    {
      status: 'Accredited',
      image: AccreditedImage,
      className: accredited,
      title: 'Accreditation Application Approved',
      description: (
        <>
          Your financial information has been approved. <br />
          You are now an Accredited Investor.
        </>
      )
    }
  ]

  const filtered = statusList.find(x => x.status === status)
  const alertStatus = typeof filtered !== 'undefined' ? filtered : defaultStatus
  const { image: Image, title, description, className } = alertStatus

  return (
    <Box className={[container, className].join(' ')}>
      <Image />
      <Typography variant='h5'>{title}</Typography>
      <Typography>{description}</Typography>
    </Box>
  )
}

import React from 'react'
import styled from 'styled-components'

import { KycItem } from 'state/admin/actions'
import downloadIcon from 'assets/images/download.svg'
import { AccreditationStatusEnum } from 'components/Vault/enum'
import { AppLogo } from 'components/AppLogo'

import { getStatusIcon } from './utils'

interface Props {
  kyc: Record<string, any>
  userKyc?: KycItem
  onKycClick: () => void
  status: string
}

export const KycSource = ({ userKyc, onKycClick, status }: Props) => {
  if (Boolean(userKyc)) {
    const internalKyc = userKyc?.corporate || userKyc?.individual

    const name = internalKyc?.corporateName || `${internalKyc?.firstName || '-'} ${internalKyc?.lastName || '-'}`

    return (
      <InternalKycContainer onClick={onKycClick}>
        <AppLogo />
        <div>{name}</div>
      </InternalKycContainer>
    )
  }

  const downloadClick = () => {
    // To DO - add download logic
  }

  return (
    <ExternalKycContainer>
      <img src={getStatusIcon(status)} alt="icon" width="20px" height="20px" />
      InvestaX
      {status === AccreditationStatusEnum.APPROVED && (
        <DownloadContainer onClick={downloadClick}>
          <img src={downloadIcon} alt="download" />
        </DownloadContainer>
      )}
    </ExternalKycContainer>
  )
}

const InternalKycContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 8px;
  cursor: pointer;
  > img {
    width: 22px;
    height: auto;
  }
  > div {
    text-decoration: underline;
  }
`

const ExternalKycContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 8px;
`

const DownloadContainer = styled.div`
  cursor: pointer;
  height: 17px;
`

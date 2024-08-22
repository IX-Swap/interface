import React from 'react'
import styled from 'styled-components'

import { KYCStatuses } from 'pages/KYC/enum'
import { getStatusInfo } from 'pages/KYC/styleds'
import { MyKyc } from 'state/kyc/actions'
import { ReactComponent as OpenLink } from '../../assets/images/open-link.svg'
import { Flex } from 'rebass'
import { useHistory } from 'react-router-dom'
import { routes } from 'utils/routes'

interface KycStatusProps {
  kyc: MyKyc | null
  toggleWalletModal: () => void
}

const KycStatus: React.FC<KycStatusProps> = ({ kyc, toggleWalletModal }) => {
  const history = useHistory()

  const status = kyc?.status || KYCStatuses.NOT_SUBMITTED
  const { icon, text } = getStatusInfo(status)

  const handleNavigate = () => {
    history.push(routes.kyc)
    toggleWalletModal()
  }

  return (
    <div>
      <Title>KYC Status</Title>

      <BoxContainer onClick={handleNavigate}>
        <Flex alignItems="center" style={{ gap: 8 }}>
          <Status>{text}</Status>
          {icon()}
        </Flex>

        <OpenLinkButton>
          <OpenLink />
        </OpenLinkButton>
      </BoxContainer>
    </div>
  )
}

export default KycStatus

const Title = styled.div`
  color: #292933;
  font-family: Inter;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.26px;
  margin-top: 8px;
`

const BoxContainer = styled.div`
  border-radius: 8px;
  margin-top: 12px;
  border: 1px solid #e6e6ff;
  background: #fff;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  &:hover {
    border: 1px solid #6666ff;
  }
`

const Status = styled.div`
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  color: #292933;
`

const OpenLinkButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`

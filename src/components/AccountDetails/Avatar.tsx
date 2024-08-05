import React, { useState } from 'react'
import { Flex } from 'rebass'

import { ResendEmailModal } from 'pages/KYC/ResendEmailModal'
import { TYPE } from '../../theme'
import { CloseColor, CloseIcon, HeaderRow } from './styleds'
import { MyKyc } from 'state/kyc/actions'
import { ReactComponent as Edit } from '../../assets/images/edit.svg'
import { ReactComponent as DefaultAvatar } from '../../assets/images/default-avatar.svg'
import styled from 'styled-components'

interface ModalProps {
  isModalOpen: boolean
  kycType?: string
  referralCode: string
}

interface AvatarProps {
  kyc: MyKyc | null
  toggleWalletModal: () => void
}

const Avatar: React.FC<AvatarProps> = ({ kyc, toggleWalletModal }) => {
  const [modalProps, setModalProps] = useState<ModalProps>({ isModalOpen: false, referralCode: '' })

  const closeModal = () => {
    setModalProps({ isModalOpen: false, referralCode: '', kycType: undefined })
  }
  const openModal = (kycType: string) => {
    setModalProps({
      isModalOpen: true,
      kycType,
      referralCode: new URL(window.location.href).href?.split('=')[1]
        ? `/kyc/${kycType}?referralCode=${new URL(window.location.href).href?.split('=')[1]}`
        : `/kyc/${kycType}`,
    })
  }

  return (
    <>
      <ResendEmailModal {...modalProps} closeModal={closeModal} />
      <HeaderRow>
        <Flex>
          <TYPE.title7>
            {kyc?.individual?.firstName || kyc?.corporate?.corporateName ? (
              <IconNameCircle>
                {kyc?.individual?.firstName
                  ? kyc.individual.firstName.charAt(0).toUpperCase()
                  : kyc?.corporate?.corporateName?.charAt(0).toUpperCase()}
              </IconNameCircle>
            ) : (
              <DefaultAvatar />
            )}
          </TYPE.title7>

          {kyc ? (
            <div>
              {kyc?.individual?.firstName || kyc?.corporate?.corporateName ? (
                <Name>{kyc?.individual?.fullName ? kyc.individual.fullName : kyc?.corporate?.corporateName}</Name>
              ) : null}

              {kyc?.individual?.email || kyc?.corporate?.email ? (
                <>
                  <EmailItem>{kyc?.individual?.email ? kyc?.individual?.email : kyc?.corporate?.email}</EmailItem>
                  <ChangeEmail onClick={() => openModal('resend')}>
                    <Edit /> Change Email
                  </ChangeEmail>
                </>
              ) : null}
            </div>
          ) : null}
        </Flex>

        <CloseIcon onClick={toggleWalletModal}>
          <CloseColor />
        </CloseIcon>
      </HeaderRow>
    </>
  )
}

export default Avatar

const ChangeEmail = styled.div`
  cursor: pointer;
  color: #6666ff;
  font-size: 14px;
  font-weight: 400;
  display: flex;
  align-items: center;
  gap: 4px;
`

const EmailItem = styled.div`
  font-size: 12px;
  color: #666680;
  font-weight: 400;
  margin: 5px 0;
`

const Name = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #292933;
`

const IconNameCircle = styled.span`
  background: #6666ff;
  border-radius: 100%;
  padding: 8px 13px;
  color: #ffffff;
  font-weight: 600;
  margin-right: 10px;
`

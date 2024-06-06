import React from 'react'
import styled from 'styled-components'
import { TYPE } from 'theme'
import { ReactComponent as EyeIcon } from '../../assets/images/eyeIconNew.svg'
import { Line } from 'components/Line'
import { KycItem } from 'state/admin/actions'
import StatusIndicator from './Blocks/KycV2StatusIndicator'
import { EmailType } from 'pages/KYC/enum'

interface Props {
  data: KycItem
}

const IndividualFormV2 = ({ data }: Props) => {
  const renderStatusBox = (title: string, status: string) => (
    status ? (
      <StatusBox>
        <TYPE.subHeader1 color={colors.subHeader}>{title}</TYPE.subHeader1>
        <StatusCheckBox>
          <StatusIndicator status={status} />
        </StatusCheckBox>
      </StatusBox>
    ) : null
  )

  const renderInfoBox = (label: string, value: string) => {
    if (!value) return null
    return (
      <InfoBox>
        <TYPE.subHeader1 color={colors.infoLabel}>{label}</TYPE.subHeader1>
        <StatusCheckBox>
          <TYPE.subHeader1>{value}</TYPE.subHeader1>
        </StatusCheckBox>
      </InfoBox>
    )
  }

  const getSecondaryContactLabel = () => {
    switch (data?.individual?.secondaryContact) {
      case EmailType.SOCIAL_ACCOUNT:
        return 'Telegram'
      case EmailType.SECONDARY:
        return 'Business Email'
      default:
        return `${data?.individual?.secondaryContactDetails}`
    }
  }

  const getSecondaryContactValue = () => {
    switch (data?.individual?.secondaryContact) {
      case EmailType.SOCIAL_ACCOUNT:
        return `https://t.me/${data?.individual?.secondaryContactDetails}`
      case EmailType.SECONDARY:
      default:
        return `${data?.individual?.secondaryContactDetails}`
    }
  }

  return (
    <FormContainer>
      <Line />
      <StatusHeader>
        <TYPE.body4>ComplyCube Status</TYPE.body4>
        <ViewStatus>
          <EyeIcon />
          <TYPE.subHeader1 color={colors.viewStatus}>View Status</TYPE.subHeader1>
        </ViewStatus>
      </StatusHeader>

      <StatusBoxContainer>
        {renderStatusBox('AML Screening', data?.individual?.amlVerificationStatus)}
        {renderStatusBox('Document', data?.individual?.documentVerificationStatus)}
        {renderStatusBox('Identity', data?.individual?.identityVerificationStatus)}
        {renderStatusBox('Proof of Address', data?.individual?.poaVerificationStatus)}
      </StatusBoxContainer>

      <Line style={{ marginTop: '50px' }} />

      <StatusHeader>
        <TYPE.body4>Personal Information</TYPE.body4>
      </StatusHeader>
      <StatusBoxContainer>
        {renderInfoBox('First Name', data?.individual?.firstName || '-')}
        {renderInfoBox('Middle Name', data?.individual?.middleName || '-')}
        {renderInfoBox('Last Name', data?.individual?.lastName || '-')}
        {renderInfoBox('Email Address', data?.individual?.email || '-')}
      </StatusBoxContainer>

      <Line style={{ marginTop: '50px' }} />

      <StatusHeader>
        <TYPE.body4>Secondary Contact Details</TYPE.body4>
      </StatusHeader>
      <StatusBoxContainer>{renderInfoBox(getSecondaryContactLabel(), getSecondaryContactValue())}</StatusBoxContainer>

      <Line style={{ marginTop: '20px' }} />
    </FormContainer>
  )
}

const colors = {
  subHeader: '#555566',
  viewStatus: '#6666FF',
  infoLabel: '#8F8FB2',
}

const FormContainer = styled.div`
  padding: 20px;
`

const StatusHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`

const ViewStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const StatusBoxContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-top: 16px;
`

const StatusBox = styled.div`
  border: 1px solid #e6e6ff;
  border-radius: 8px;
  padding: 16px;
  width: 167px;
  height: auto;
`

const InfoBox = styled.div`
  padding: 16px;
  width: 167px;
  height: auto;
`

const StatusCheckBox = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-top: 10px;
`

export default IndividualFormV2

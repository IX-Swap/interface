import React from 'react'
import styled from 'styled-components'
import { TYPE } from 'theme'
import { ReactComponent as EyeIcon } from '../../assets/images/eyeIconNew.svg'
import { ReactComponent as Approved } from '../../assets/images/newRightCheck.svg'
import { Line } from 'components/Line'
import { PinnedContentButton } from 'components/Button'

export const IndividualFormV2 = () => {
  return (
    <FormContainer>
      <Line />
      <StatusHeader>
        <TYPE.body4>ComplyCube Status</TYPE.body4>
        <ViewStatus>
          <EyeIcon />
          <TYPE.subHeader1 color={'#6666FF'}>View Status</TYPE.subHeader1>
        </ViewStatus>
      </StatusHeader>

      <StatusBoxContainer>
        <StatusBox>
          <TYPE.subHeader1 color={'#555566'}>AML Screening</TYPE.subHeader1>
          <StatusCheckBox>
            <Approved style={{ width: '20px' }} />
            <TYPE.subHeader1>Approved</TYPE.subHeader1>
          </StatusCheckBox>
        </StatusBox>
        <StatusBox>
          <TYPE.subHeader1 color={'#555566'}>Document</TYPE.subHeader1>
          <StatusCheckBox>
            <Approved style={{ width: '20px' }} />
            <TYPE.subHeader1>Approved</TYPE.subHeader1>
          </StatusCheckBox>
        </StatusBox>
        <StatusBox>
          <TYPE.subHeader1 color={'#555566'}>Identity</TYPE.subHeader1>
          <StatusCheckBox>
            <Approved style={{ width: '20px' }} />
            <TYPE.subHeader1>Approved</TYPE.subHeader1>
          </StatusCheckBox>
        </StatusBox>
        <StatusBox>
          <TYPE.subHeader1 color={'#555566'}>Proof of Address</TYPE.subHeader1>
          <StatusCheckBox>
            <Approved style={{ width: '20px' }} />
            <TYPE.subHeader1>Approved</TYPE.subHeader1>
          </StatusCheckBox>
        </StatusBox>
      </StatusBoxContainer>
      <Line style={{ marginTop: '50px' }} />

      <StatusHeader>
        <TYPE.body4>ComplyCube Status</TYPE.body4>
      </StatusHeader>
      <StatusBoxContainer>
        <InfoBox>
          <TYPE.subHeader1 color={'#8F8FB2'}>First Name</TYPE.subHeader1>
          <StatusCheckBox>
            <TYPE.subHeader1>Kapil</TYPE.subHeader1>
          </StatusCheckBox>
        </InfoBox>
        <InfoBox>
          <TYPE.subHeader1 color={'#8F8FB2'}>Middle Name</TYPE.subHeader1>
          <StatusCheckBox>
            <TYPE.subHeader1>Kumar</TYPE.subHeader1>
          </StatusCheckBox>
        </InfoBox>
        <InfoBox>
          <TYPE.subHeader1 color={'#8F8FB2'}>Last Name</TYPE.subHeader1>
          <StatusCheckBox>
            <TYPE.subHeader1>Dave</TYPE.subHeader1>
          </StatusCheckBox>
        </InfoBox>
        <InfoBox>
          <TYPE.subHeader1 color={'#8F8FB2'}>Email Address</TYPE.subHeader1>
          <StatusCheckBox>
            <TYPE.subHeader1>kapil@investax.io</TYPE.subHeader1>
          </StatusCheckBox>
        </InfoBox>
      </StatusBoxContainer>
      <Line style={{ marginTop: '50px' }} />

      <StatusHeader>
        <TYPE.body4>Secondary Contact Details</TYPE.body4>
      </StatusHeader>
      <StatusBoxContainer>
        <InfoBox>
          <TYPE.subHeader1 color={'#8F8FB2'}>Business Email</TYPE.subHeader1>
          <StatusCheckBox>
          <TYPE.subHeader1>kapil@investax.io</TYPE.subHeader1>
          </StatusCheckBox>
        </InfoBox>
      </StatusBoxContainer>
      <Line style={{ marginTop: '20px' }} />

      <ActionContainer>
    
      <ActionContainer>
        <RejectButton>Approve</RejectButton>
        <ApproveButton>Approve</ApproveButton>
      </ActionContainer>
      </ActionContainer>
    </FormContainer>
  )
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

const ActionContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 20px;
  width: -webkit-fill-available;

`

const RejectButton = styled(PinnedContentButton)`
  background: none;
  color: #ff8282;
  border: 1px solid #e6e6ff;
`

const ApproveButton = styled(PinnedContentButton)`
  background: #1fba66;
`
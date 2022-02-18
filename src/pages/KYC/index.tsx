import React, { useCallback, FC, useState } from 'react'
import { Trans } from '@lingui/macro'
import { isMobile } from 'react-device-detect'
import { Flex } from 'rebass'

import { StyledBodyWrapper } from 'pages/CustodianV2/styleds'
import { TYPE } from 'theme'
import { KYCStatus } from './KYCStatus'
import { ButtonGradientBorder, ButtonIXSGradient } from 'components/Button'

import { IndividualKycForm } from './IndividualKycForm'
import { CorporateKycForm } from './CorporateKycForm'
import { KYCStatuses } from './enum'
import { Content, getStatusDescription, StatusCard } from './styleds'
import { ReactComponent as IndividualKYC } from '../../assets/images/individual-kyc.svg'
import { ReactComponent as CorporateKYC } from '../../assets/images/corporate-kyc.svg'
import { ReactComponent as ApprovedKYC } from '../../assets/images/approved-kyc.svg'

interface DescriptionProps {
  description: string | null
}

interface DateInfoProps {
  submittedDate?: string
  rejectedDate?: string
  approvedDate?: string
  info?: string
}

const DateInfo: FC<DateInfoProps> = ({ info, submittedDate, rejectedDate, approvedDate }: DateInfoProps) => (
  <Flex textAlign="center" color="#EDCEFF80" flexDirection="column">
    {info && (
      <TYPE.description3 marginTop="40px" marginBottom="16px" color="inherit">
        {info}
      </TYPE.description3>
    )}
    {submittedDate && <TYPE.description3 color="inherit">{`Submitted on Jan 30, 21:48 (UTC)`}</TYPE.description3>}
    {rejectedDate && <TYPE.description3 color="inherit">{`Rejected on Jan 30, 21:48 (UTC)`}</TYPE.description3>}
    {approvedDate && <TYPE.description3 color="inherit">{`Approved on Jan 30, 21:48 (UTC)`}</TYPE.description3>}
  </Flex>
)

const Description: FC<DescriptionProps> = ({ description }: DescriptionProps) => (
  <TYPE.title6 textAlign="center" margin="40px 0px" fontWeight={400}>
    {description}
  </TYPE.title6>
)

export default function KYC() {
  const status = KYCStatuses.NOT_SUBMITTED as KYCStatuses
  const description = getStatusDescription(status)
  const [selectedForm, handleSelectedForm] = useState('')

  const setIndividualForm = () => {
    handleSelectedForm('individual')
  }
  const setCorporateForm = () => {
    handleSelectedForm('corporate')
  }

  const goBack = () => {
    handleSelectedForm('')
  }

  const getKYCDescription = useCallback(() => {
    switch (status) {
      case KYCStatuses.NOT_SUBMITTED:
        return (
          <>
            <Description description={description} />
            <Flex
              width="100%"
              flexDirection={isMobile ? 'column' : 'row'}
              justifyContent="space-between"
              alignItems={isMobile ? 'center' : 'flex-start'}
            >
              <Flex marginBottom={isMobile ? '32px' : '0px'} flexDirection="column" alignItems="center">
                <IndividualKYC />
                <ButtonIXSGradient onClick={setIndividualForm} style={{ padding: '16px 24px' }} marginTop="32px">
                  <Trans>Pass KYC as Individual</Trans>
                </ButtonIXSGradient>
              </Flex>
              <Flex flexDirection="column" alignItems="center">
                <CorporateKYC />
                <ButtonGradientBorder onClick={setCorporateForm} style={{ padding: '16px 24px' }} marginTop="32px">
                  <Trans>Pass KYC as Corporate</Trans>
                </ButtonGradientBorder>
              </Flex>
            </Flex>
          </>
        )
      case KYCStatuses.REJECTED:
        return (
          <>
            <Description description={description} />
            <DateInfo submittedDate="yes" rejectedDate="yes" />
          </>
        )
      case KYCStatuses.PENDING:
        return (
          <>
            <Description description={description} />
            <DateInfo submittedDate="yes" />
          </>
        )
      case KYCStatuses.CHANGES_REQUESTED:
        return (
          <>
            <Description description={description} />
            <DateInfo submittedDate="yes" rejectedDate="yes" />
            <ButtonIXSGradient style={{ padding: '16px 24px' }} marginTop="32px">
              <Trans>Make changes and resend KYC</Trans>
            </ButtonIXSGradient>
          </>
        )
      case KYCStatuses.APPROVED:
        return (
          <Flex flexDirection="column" alignItems="center" marginTop="40px">
            <ApprovedKYC />
            <DateInfo info="Change via info@ixswap.io" submittedDate="yes" approvedDate="yes" />
          </Flex>
        )
    }
  }, [status])

  return (
    <StyledBodyWrapper>
      {!selectedForm ? (
        <StatusCard>
          <Content flexDirection="column" marginTop="40px" alignItems="center">
            <TYPE.title4 marginBottom="40px">
              <Trans>IXSwap KYC</Trans>
            </TYPE.title4>

            <KYCStatus status={status} />

            {getKYCDescription()}
          </Content>
        </StatusCard>
      ) : (
        <>
          {selectedForm === 'individual' ? <IndividualKycForm goBack={goBack} /> : <CorporateKycForm goBack={goBack} />}
        </>
      )}
    </StyledBodyWrapper>
  )
}

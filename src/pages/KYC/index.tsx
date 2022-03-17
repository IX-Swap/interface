import React, { useCallback, FC, useEffect, useState } from 'react'
import { Trans } from '@lingui/macro'
import { isMobile } from 'react-device-detect'
import { Flex } from 'rebass'
import { Link } from 'react-router-dom'
import { TYPE } from 'theme'

import { useActiveWeb3React } from 'hooks/web3'

import { ButtonGradientBorder, ButtonIXSGradient } from 'components/Button'
import { LoaderThin } from 'components/Loader/LoaderThin'
import { RowCenter } from 'components/Row'

import { StyledBodyWrapper } from 'pages/CustodianV2/styleds'
import { useGetMyKyc, useKYCState } from 'state/kyc/hooks'
import { useUserisLoggedIn } from 'state/auth/hooks'

import { KYCStatuses } from './enum'
import { KYCStatus } from './KYCStatus'
import { Content, getStatusDescription, StatusCard } from './styleds'
import { ReactComponent as IndividualKYC } from '../../assets/images/individual-kyc.svg'
import { ReactComponent as CorporateKYC } from '../../assets/images/corporate-kyc.svg'
import { ReactComponent as ApprovedKYC } from '../../assets/images/approved-kyc.svg'
import { NFTConnectWallet } from 'components/NFTConnectWallet'
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
  const { account } = useActiveWeb3React()
  const isLoggedIn = useUserisLoggedIn()

  const { kyc, loadingRequest } = useKYCState()
  const getMyKyc = useGetMyKyc()

  const [status, setStatus] = useState<KYCStatuses | undefined>(undefined)
  const [description, setDescription] = useState('')

  const onKycState = useCallback(() => {
    if (!account) {
      return
    }

    getMyKyc()
  }, [account, getMyKyc])

  useEffect(() => {
    if (!isLoggedIn) {
      return
    }

    onKycState()
  }, [isLoggedIn])

  useEffect(() => {
    console.log({ isLoggedIn })
    console.log({ loadingRequest })

    const status = kyc?.data.status || KYCStatuses.NOT_SUBMITTED
    const description = kyc?.data.message || getStatusDescription(status)

    setStatus(status)
    setDescription(description)
  }, [isLoggedIn, loadingRequest, kyc])

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
                <Link style={{ textDecoration: 'none ' }} to="/kyc/individual">
                  <ButtonIXSGradient style={{ padding: '16px 24px' }} marginTop="32px">
                    <Trans>Pass KYC as Individual</Trans>
                  </ButtonIXSGradient>
                </Link>
              </Flex>
              <Flex flexDirection="column" alignItems="center">
                <CorporateKYC />
                <Link style={{ textDecoration: 'none ' }} to="/kyc/corporate">
                  <ButtonGradientBorder style={{ padding: '16px 24px' }} marginTop="32px">
                    <Trans>Pass KYC as Corporate</Trans>
                  </ButtonGradientBorder>
                </Link>
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
            <Link
              style={{ textDecoration: 'none ' }}
              to={`/kyc/${kyc?.data.corporateKycId ? 'corporate' : 'individual'}`}
            >
              <ButtonIXSGradient style={{ padding: '16px 24px' }} marginTop="32px">
                <Trans>Make changes and resend KYC</Trans>
              </ButtonIXSGradient>
            </Link>
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

  if (!account) return <NFTConnectWallet />

  return (
    <StyledBodyWrapper>
      <StatusCard>
        {loadingRequest ? (
          <RowCenter>
            <LoaderThin size={96} />
          </RowCenter>
        ) : (
          <Content flexDirection="column" marginTop="40px" alignItems="center">
            <TYPE.title4 marginBottom="40px">
              <Trans>IXSwap KYC</Trans>
            </TYPE.title4>

            <KYCStatus status={kyc?.data.status || KYCStatuses.NOT_SUBMITTED} />

            {getKYCDescription()}
          </Content>
        )}
      </StatusCard>
    </StyledBodyWrapper>
  )
}

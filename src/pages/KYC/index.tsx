import React, { useCallback, FC, useEffect, useState, useMemo } from 'react'
import { Trans } from '@lingui/macro'
import { isMobile } from 'react-device-detect'
import { Flex } from 'rebass'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'

import { ButtonGradientBorder, ButtonIXSGradient } from 'components/Button'
import { LoaderThin } from 'components/Loader/LoaderThin'
import { RowCenter } from 'components/Row'
import { useActiveWeb3React } from 'hooks/web3'
import { TYPE } from 'theme'
import { StyledBodyWrapper } from 'pages/CustodianV2/styleds'
import { useUserisLoggedIn } from 'state/auth/hooks'
import Column from 'components/Column'
import { useUserState } from 'state/user/hooks'
import { NotAvailablePage } from 'components/NotAvailablePage'
import { usePendingSignState } from 'state/application/hooks'
import { useKYCState } from 'state/kyc/hooks'

import { KYCStatuses } from './enum'
import { KYCStatus } from './KYCStatus'
import { Content, getStatusDescription, StatusCard } from './styleds'
import { ReactComponent as IndividualKYC } from 'assets/images/individual-kyc.svg'
import { ReactComponent as CorporateKYC } from 'assets/images/corporate-kyc.svg'
import { ReactComponent as ApprovedKYC } from 'assets/images/approved-kyc.svg'
interface DescriptionProps {
  description: string | null
}

interface DateInfoProps {
  submittedDate?: string
  rejectedDate?: string
  approvedDate?: string
  changeRequestDate?: string
  info?: string
}

const DateInfo: FC<DateInfoProps> = ({
  info,
  submittedDate,
  rejectedDate,
  approvedDate,
  changeRequestDate,
}: DateInfoProps) => (
  <Flex textAlign="center" color="#EDCEFF80" flexDirection="column">
    {info && (
      <TYPE.description3 marginTop="40px" marginBottom="16px" color="inherit">
        {info}
      </TYPE.description3>
    )}
    {submittedDate && (
      <TYPE.description3 color="inherit">{`Submitted on ${dayjs(submittedDate)
        .utc()
        .format('MMM DD YYYY, HH:mm')} (UTC)`}</TYPE.description3>
    )}
    {rejectedDate && (
      <TYPE.description3 color="inherit">{`Rejected on ${dayjs(rejectedDate)
        .utc()
        .format('MMM DD YYYY, HH:mm')} (UTC)`}</TYPE.description3>
    )}
    {changeRequestDate && (
      <TYPE.description3 color="inherit">{`Change requested on ${dayjs(rejectedDate)
        .utc()
        .format('MMM DD YYYY, HH:mm')} (UTC)`}</TYPE.description3>
    )}
    {approvedDate && (
      <TYPE.description3 color="inherit">{`Approved on ${dayjs(approvedDate)
        .utc()
        .format('MMM DD YYYY, HH:mm')} (UTC)`}</TYPE.description3>
    )}
  </Flex>
)

const Description: FC<DescriptionProps> = ({ description }: DescriptionProps) => (
  <TYPE.title6 textAlign="center" margin="40px 0px" fontWeight={400}>
    {description}
  </TYPE.title6>
)

export default function KYC() {
  const { account } = useActiveWeb3React()
  const { account: userAccount } = useUserState()
  const [loading, setLoading] = useState(false)
  const isLoggedIn = useUserisLoggedIn()
  const pendingSign = usePendingSignState()

  const { kyc, loadingRequest } = useKYCState()

  const status = useMemo(() => kyc?.data?.status || KYCStatuses.NOT_SUBMITTED, [kyc])
  const description = useMemo(() => kyc?.data.message || getStatusDescription(status), [kyc, status])

  useEffect(() => {
    if (pendingSign) {
      setLoading(true)
    } else {
      setLoading(false)
    }
  }, [pendingSign])

  // useEffect(() => {
  //   const { ethereum } = window

  //   if (ethereum && ethereum.on) {
  //     ethereum.on('accountsChanged', handleAccountsChanged)

  //     return () => {
  //       if (ethereum.removeListener) {
  //         ethereum.removeListener('accountsChanged', handleAccountsChanged)
  //       }
  //     }
  //   }
  // }, [])

  // useEffect(() => {
  //   if (kyc?.data === undefined && loadingRequest) {
  //     setLoading(false)
  //   }
  // }, [kyc, loadingRequest])

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
            <DateInfo submittedDate={kyc?.data.createdAt} rejectedDate={kyc?.data.updatedAt} />
          </>
        )
      case KYCStatuses.PENDING:
        return (
          <>
            <Description description={getStatusDescription(status)} />
            <DateInfo submittedDate={kyc?.data.updatedAt || kyc?.data.createdAt} />
          </>
        )
      case KYCStatuses.CHANGES_REQUESTED:
        return (
          <>
            <Description description={description} />
            <DateInfo submittedDate={kyc?.data.createdAt} changeRequestDate={kyc?.data.updatedAt} />
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
            <DateInfo
              info="In order to make changes to your KYC please get in touch with us via kyc@ixswap.io"
              submittedDate={kyc?.data.createdAt}
              approvedDate={kyc?.data.updatedAt}
            />
          </Flex>
        )
      case KYCStatuses.DRAFT:
        return (
          <>
            <Description description={getStatusDescription(status)} />
            <DateInfo submittedDate={kyc?.data.updatedAt || kyc?.data.createdAt} />
          </>
        )
    }
  }, [status])

  if (!account) return <NotAvailablePage />

  return (
    <StyledBodyWrapper>
      <StatusCard>
        {loadingRequest || loading ? (
          <RowCenter>
            <LoaderThin size={96} />
          </RowCenter>
        ) : (
          <Column style={{ alignItems: 'center' }}>
            {(status === KYCStatuses.NOT_SUBMITTED || status === null) && (
              <TYPE.mediumHeader marginTop="24px" color="white">
                You need to pass KYC to access the full IX Swap App and trade Security Tokens
              </TYPE.mediumHeader>
            )}
            <Content
              flexDirection="column"
              marginTop={status === KYCStatuses.NOT_SUBMITTED || status === null ? '8px' : '40px'}
              alignItems="center"
            >
              <TYPE.title4 marginBottom="40px">
                <Trans>IXSwap KYC</Trans>
              </TYPE.title4>

              <KYCStatus status={kyc?.data.status || KYCStatuses.NOT_SUBMITTED} />

              {getKYCDescription()}
            </Content>
          </Column>
        )}
      </StatusCard>
    </StyledBodyWrapper>
  )
}

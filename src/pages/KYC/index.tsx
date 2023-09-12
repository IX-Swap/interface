import React, { useCallback, FC, useEffect, useState, useMemo } from 'react'
import { Trans } from '@lingui/macro'
import { isMobile } from 'react-device-detect'
import { Flex, Text } from 'rebass'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import { useCookies } from 'react-cookie'
import { useActiveWeb3React } from 'hooks/web3'
import { TYPE } from 'theme'
import { StyledBodyWrapper } from 'pages/SecurityTokens'
import Column from 'components/Column'
import { NotAvailablePage } from 'components/NotAvailablePage'
import { usePendingSignState } from 'state/application/hooks'
import { useKYCState } from 'state/kyc/hooks'
import { ReactComponent as IndividualKYC } from 'assets/images/newIndividual.svg'
import { ReactComponent as CorporateKYC } from 'assets/images/newCorporate.svg'
import { ReactComponent as ApprovedKYC } from 'assets/images/approved-kyc.svg'

import { KYCStatuses } from './enum'
import { KYCStatus } from './KYCStatus'
import { Content, getStatusDescription, StatusCard, DateInfoContainer } from './styleds'
import { useWhitelabelState } from 'state/whitelabel/hooks'
import { ButtonGradientBorder, ButtonIXSGradient, PinnedContentButton } from 'components/Button'
import { RowCenter } from 'components/Row'
import { LoaderThin } from 'components/Loader/LoaderThin'

interface DescriptionProps {
  description: string | null
}

interface DateInfoProps {
  submittedDate?: string | null
  rejectedDate?: string | null
  approvedDate?: string | null
  changeRequestDate?: string | null
  info?: string
}

const DateInfo: FC<DateInfoProps> = ({
  info,
  submittedDate,
  rejectedDate,
  approvedDate,
  changeRequestDate,
}: DateInfoProps) => (
  <DateInfoContainer>
    {info && (
      <TYPE.description3 marginTop="40px" marginBottom="16px" color="#666680">
        {info}
      </TYPE.description3>
    )}
    {submittedDate && (
      <TYPE.description3 color="#666680">{`Submitted on ${dayjs(submittedDate)
        .utc()
        .format('MMM DD YYYY, HH:mm')} (UTC)`}</TYPE.description3>
    )}
    {rejectedDate && (
      <TYPE.description3 color="#666680">{`Rejected on ${dayjs(rejectedDate)
        .utc()
        .format('MMM DD YYYY, HH:mm')} (UTC)`}</TYPE.description3>
    )}
    {changeRequestDate && (
      <TYPE.description3 color="#666680">{`Change requested on ${dayjs(rejectedDate)
        .utc()
        .format('MMM DD YYYY, HH:mm')} (UTC)`}</TYPE.description3>
    )}
    {approvedDate && (
      <TYPE.description3 color="#666680">{`Approved on ${dayjs(approvedDate)
        .utc()
        .format('MMM DD YYYY, HH:mm')} (UTC)`}</TYPE.description3>
    )}
  </DateInfoContainer>
)

const Description: FC<DescriptionProps> = ({ description }: DescriptionProps) => (
  <TYPE.title6 textAlign="center" margin={isMobile ? '20px 26px' : '20px 0px'}>
    {description}
  </TYPE.title6>
)

const KYC = () => {
  const { account } = useActiveWeb3React()
  const [loading, setLoading] = useState(false)
  const pendingSign = usePendingSignState()
  const [cookies] = useCookies(['annoucementsSeen'])
  const { config } = useWhitelabelState()
  const { kyc, loadingRequest } = useKYCState()

  const status = useMemo(() => kyc?.status || KYCStatuses.NOT_SUBMITTED, [kyc])
  const description = useMemo(() => kyc?.message || getStatusDescription(status), [kyc, status])
  const infoText = 'In order to make changes to your KYC please get in touch with us via c@ixswap.io'

  useEffect(() => {
    if (pendingSign) {
      setLoading(true)
    } else {
      setLoading(false)
    }
  }, [pendingSign])

  const getKYCDescription = useCallback(() => {
    switch (status) {
      case KYCStatuses.NOT_SUBMITTED:
        return (
          <>
            <Flex
              width="100%"
              flexDirection={isMobile ? 'column' : 'row'}
              justifyContent="space-between"
              alignItems={isMobile ? 'center' : 'flex-end'}
              sx={{ gap: '1rem', marginTop: '40px' }}
            >
              <Flex
                sx={{
                  border: '1px solid #E6E6FF',
                  marginBottom: isMobile ? '32px' : '0px',
                  padding: isMobile ? '40px 45px' : '55px 90px',
                }}
                flexDirection="column"
                alignItems="center"
              >
                <IndividualKYC />
                <>
                  <Text
                    sx={{
                      marginTop: '32px',
                      width: 'max-content',
                      fontSize: '18px',
                      fontWeight: '700',
                      color: '#292933',
                    }}
                  >
                    <Trans>Pass KYC as Individual</Trans>
                  </Text>
                  <Link style={{ textDecoration: 'none' }} to="/kyc/individual">
                    <Text sx={{ marginTop: '12px', fontSize: '13px', fontWeight: '600', color: '#6666FF' }}>
                      <Trans>Start Now</Trans>
                    </Text>
                  </Link>
                </>
              </Flex>

              <Flex
                sx={{
                  border: '1px solid #E6E6FF',
                  padding: isMobile ? '40px 40px' : '50px 90px',
                  marginBottom: isMobile ? '32px' : '0px',
                  width: 'max-content',
                }}
                flexDirection="column"
                alignItems="center"
              >
                <CorporateKYC />
                <>
                  <Text sx={{ marginTop: '32px', fontSize: '18px', fontWeight: '700', color: '#292933' }}>
                    <Trans>Pass KYC as Corporate</Trans>
                  </Text>
                </>
                <Link style={{ textDecoration: 'none ' }} to="/kyc/corporate">
                  <Text sx={{ marginTop: '12px', fontSize: '13px', fontWeight: '600', color: '#6666FF' }}>
                    <Trans>Start Now</Trans>
                  </Text>
                </Link>
              </Flex>
            </Flex>
          </>
        )

      case KYCStatuses.DRAFT:
        return (
          <>
            <Description description={description} />
            <Flex
              width="100%"
              flexDirection={isMobile ? 'column' : 'row'}
              justifyContent="center"
              alignItems={isMobile ? 'center' : 'flex-start'}
            >
              {kyc?.individual && (
                <Flex sx={{ marginBottom: isMobile ? '32px' : '0px' }} flexDirection="column" alignItems="center">
                  <IndividualKYC />
                  <Link style={{ textDecoration: 'none' }} to="/kyc/individual">
                    <PinnedContentButton sx={{ padding: '16px 24px', marginTop: '32px' }}>
                      <Trans>Continue Pass KYC as Individual</Trans>
                    </PinnedContentButton>
                  </Link>
                </Flex>
              )}

              {kyc?.corporate && (
                <Flex flexDirection="column" alignItems="center">
                  <CorporateKYC />
                  <Link style={{ textDecoration: 'none ' }} to="/kyc/corporate">
                    <ButtonGradientBorder sx={{ padding: '16px 24px', marginTop: '32px' }}>
                      <Trans>Continue Pass KYC as Corporate</Trans>
                    </ButtonGradientBorder>
                  </Link>
                </Flex>
              )}
            </Flex>
          </>
        )

      case KYCStatuses.REJECTED:
        return (
          <>
            <Description description={description} />
            <DateInfo info={infoText} submittedDate={kyc?.createdAt} rejectedDate={kyc?.updatedAt} />
          </>
        )
      case KYCStatuses.PENDING:
        return (
          <>
            <Description description={getStatusDescription(status)} />
            <DateInfo submittedDate={kyc?.updatedAt || kyc?.createdAt} />
          </>
        )
      case KYCStatuses.CHANGES_REQUESTED:
        return (
          <>
            <Description description={description} />
            <DateInfo info={infoText} submittedDate={kyc?.createdAt} changeRequestDate={kyc?.updatedAt} />
            <Link style={{ textDecoration: 'none ' }} to={`/kyc/${kyc?.corporateKycId ? 'corporate' : 'individual'}`}>
              <ButtonIXSGradient
                sx={{ padding: '16px 24px', marginTop: '32px' }}
                data-testid="makeChangesAndResendKycButton"
              >
                <Trans>Make changes and resend KYC</Trans>
              </ButtonIXSGradient>
            </Link>
          </>
        )
      case KYCStatuses.APPROVED:
        return (
          <Flex flexDirection="column" alignItems="center" marginTop="40px">
            <ApprovedKYC />
            <DateInfo info={infoText} submittedDate={kyc?.createdAt} approvedDate={kyc?.updatedAt} />
          </Flex>
        )
      case KYCStatuses.DRAFT:
        return (
          <>
            <Description description={getStatusDescription(status)} />
            <DateInfo submittedDate={kyc?.updatedAt || kyc?.createdAt} />
          </>
        )
      case KYCStatuses.IN_PROGRESS:
        return (
          <>
            <Description description={getStatusDescription(status)} />
            <DateInfo info={infoText} submittedDate={kyc?.updatedAt || kyc?.createdAt} />
          </>
        )
      case KYCStatuses.FAILED:
        return (
          <>
            <Description description={getStatusDescription(status)} />
            <DateInfo info={infoText} submittedDate={kyc?.updatedAt || kyc?.createdAt} />
          </>
        )
    }
  }, [status, description, kyc])

  if (!account) return <NotAvailablePage />

  return (
    <StyledBodyWrapper hasAnnouncement={!cookies.annoucementsSeen}>
      <StatusCard>
        {loadingRequest || loading ? (
          <RowCenter>
            <LoaderThin size={96} />
          </RowCenter>
        ) : (
          <Column style={{ alignItems: 'center' }}>
            <Content
              flexDirection="column"
              marginTop={status === KYCStatuses.NOT_SUBMITTED || status === null ? '8px' : '40px'}
              alignItems="center"
            >
              <TYPE.description3 marginTop="40px">
                <Trans>{config?.name || 'IX Swap'} KYC</Trans>
              </TYPE.description3>
              <Description description={description} />
              <KYCStatus status={kyc?.status || KYCStatuses.NOT_SUBMITTED} />
            </Content>
            {getKYCDescription()}
          </Column>
        )}
      </StatusCard>
    </StyledBodyWrapper>
  )
}

export default KYC

import React, { useCallback, FC, useEffect, useState, useMemo } from 'react'
import { Trans, t } from '@lingui/macro'
import { isMobile } from 'react-device-detect'
import { Flex, Text } from 'rebass'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import { useCookies } from 'react-cookie'
import Portal from '@reach/portal'

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
import { CenteredFixed } from 'components/LaunchpadMisc/styled'
import { KYCStatuses } from './enum'
import { KYCStatus } from './KYCStatus'
import { Content, getStatusDescription, StatusCard, DateInfoContainer } from './styleds'
import { useWhitelabelState } from 'state/whitelabel/hooks'
import { ButtonGradientBorder, ButtonIXSGradient, PinnedContentButton } from 'components/Button'
import { RowCenter } from 'components/Row'
import { LoaderThin } from 'components/Loader/LoaderThin'
import { ReactComponent as CopyIcon } from '../../assets/images/newCopyIcon.svg'
import styled from 'styled-components'
import Copy from 'components/AccountDetails/Copy'
import { useGetMe } from 'state/user/hooks'
import { EmailVerification } from './EmailVerifyModal'
import { SUPPORTED_TGE_CHAINS, TGE_CHAINS_WITH_STAKING } from 'constants/addresses'

interface DescriptionProps {
  description: string | null
}

interface DateInfoProps {
  submittedDate?: string | null
  rejectedDate?: string | null
  approvedDate?: string | null
  changeRequestDate?: string | null
  info?: any
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
      <TYPE.description3 width="252px" marginTop="10px" marginBottom="16px" fontSize="11px">
        {info}
      </TYPE.description3>
    )}
    {submittedDate && (
      <TYPE.description3 fontSize="11px" color="#B2B2BF">{`Submitted on ${dayjs(submittedDate)
        .utc()
        .format('MMM DD YYYY, HH:mm')} (UTC)`}</TYPE.description3>
    )}
    {rejectedDate && (
      <TYPE.description3 fontSize="11px" color="#B2B2BF">{`Rejected on ${dayjs(rejectedDate)
        .utc()
        .format('MMM DD YYYY, HH:mm')} (UTC)`}</TYPE.description3>
    )}
    {changeRequestDate && (
      <TYPE.description3 fontSize="11px" color="#B2B2BF">{`Change requested on ${dayjs(rejectedDate)
        .utc()
        .format('MMM DD YYYY, HH:mm')} (UTC)`}</TYPE.description3>
    )}
    {approvedDate && (
      <TYPE.description3 fontSize="11px" color="#B2B2BF">{`Approved on ${dayjs(approvedDate)
        .utc()
        .format('MMM DD YYYY, HH:mm')} (UTC)`}</TYPE.description3>
    )}
  </DateInfoContainer>
)

const Description: FC<DescriptionProps> = ({ description }: DescriptionProps) => (
  <TYPE.description3 textAlign="center" marginTop="15px" marginBottom="8px">
    {description}
  </TYPE.description3>
)

const KYC = () => {
  const { account, chainId } = useActiveWeb3React()
  const [loading, setLoading] = useState(false)
  const pendingSign = usePendingSignState()
  const [cookies] = useCookies(['annoucementsSeen'])
  const { config } = useWhitelabelState()
  const { kyc, loadingRequest } = useKYCState()
  const [isModalOpen, handleIsModalOpen] = useState(false)
  const [modalProps, setModalProps] = useState<ModalProps>({ isModalOpen: false, referralCode: '' })
  const status = useMemo(() => kyc?.status || KYCStatuses.NOT_SUBMITTED, [kyc])
  const description = useMemo(() => kyc?.message || getStatusDescription(status), [kyc, status])
  const [referralCode, setReferralCode] = useState<string | null>('')
  const getMe = useGetMe()

  interface ModalProps {
    isModalOpen: boolean
    kycType?: string
    referralCode: string
  }
  const fetchMe = useCallback(async () => {
    const result = await getMe()
    setReferralCode(result?.referralCode)
  }, [getMe, history])

  const infoText = (
    <p>
      In order to make changes to your KYC please get in touch with us via{' '}
      <a href="mailto:c@ixswap.io" style={{ textDecoration: 'none', color: '#6666FF' }}>
        c@ixswap.io
      </a>
    </p>
  )

  useEffect(() => {
    fetchMe()
    // setReferralCode(code)
    if (pendingSign) {
      setLoading(true)
    } else {
      setLoading(false)
    }
  }, [pendingSign, status, description, kyc])

  const openModal = (kycType: string) => {
    console.log('Opening modal for', kycType)
    // Pass additional props based on the selected KYC type
    setModalProps({
      isModalOpen: true,
      kycType,
      referralCode: new URL(window.location.href).href?.split('=')[1]
        ? `/kyc/${kycType}?referralCode=${new URL(window.location.href).href?.split('=')[1]}`
        : `/kyc/${kycType}`,
      // Add more props as needed
    })
  }

  const closeModal = () => {
    console.log('Closing modal')
    setModalProps({ isModalOpen: false, referralCode: '', kycType: undefined })
  }
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
                onClick={() => openModal('individual')}
                sx={{
                  border: '1px solid #E6E6FF',
                  marginBottom: isMobile ? '32px' : '0px',
                  padding: isMobile ? '40px 45px' : '55px 90px',
                  cursor: 'pointer',
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
                  {/* <Link
                    style={{ textDecoration: 'none' }}
                    to={
                      new URL(window.location.href).href?.split('=')[1]
                        ? `/kyc/individual?referralCode=${new URL(window.location.href).href?.split('=')[1]}`
                        : '/kyc/individual'
                    }
                  > */}
                  <Text sx={{ marginTop: '12px', fontSize: '13px', fontWeight: '600', color: '#6666FF' }}>
                    <Trans>Start Now</Trans>
                  </Text>
                  {/* </Link> */}
                </>
              </Flex>

              <Flex
                onClick={() => openModal('corporate')}
                sx={{
                  border: '1px solid #E6E6FF',
                  padding: isMobile ? '40px 40px' : '50px 90px',
                  marginBottom: isMobile ? '32px' : '0px',
                  width: 'max-content',
                  cursor: 'pointer',
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
                {/* <Link style={{ textDecoration: 'none ' }} to="/kyc/corporate"> */}
                <Text sx={{ marginTop: '12px', fontSize: '13px', fontWeight: '600', color: '#6666FF' }}>
                  <Trans>Start Now</Trans>
                </Text>
                {/* </Link> */}
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
                  <Link
                    style={{ textDecoration: 'none' }}
                    to={
                      new URL(window.location.href).href?.split('=')[1]
                        ? `/kyc/individual?referralCode=${new URL(window.location.href).href?.split('=')[1]}`
                        : '/kyc/individual'
                    }
                  >
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
                    <PinnedContentButton sx={{ padding: '16px 24px', marginTop: '32px' }}>
                      <Trans>Continue Pass KYC as Corporate</Trans>
                    </PinnedContentButton>
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
            <Link
              style={{ textDecoration: 'none' }}
              to={
                kyc?.corporateKycId
                  ? `/kyc/corporate`
                  : new URL(window.location.href).href?.split('=')[1]
                  ? `/kyc/individual?referralCode=${new URL(window.location.href).href?.split('=')[1]}`
                  : `/kyc/individual`
              }
            >
              {/* <Link style={{ textDecoration: 'none ' }} to={`/kyc/${kyc?.corporateKycId ? 'corporate' : 'individual'}`}> */}
              <PinnedContentButton
                sx={{ padding: '16px 24px', marginTop: '32px', boxShadow: '0px 16px 16px 0px #6666FF21' }}
                data-testid="makeChangesAndResendKycButton"
              >
                <Trans>Make changes and resend KYC</Trans>
              </PinnedContentButton>
            </Link>
          </>
        )
      case KYCStatuses.APPROVED:
        return (
          <Flex flexDirection="column" alignItems="center" marginTop="0px">
            {/* <ApprovedKYC /> */}
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

  let blurred = false
  const apiUrl = process.env.REACT_APP_API_URL
  if (apiUrl?.includes('dev') || apiUrl?.includes('staging')) {
    blurred = chainId && ![...TGE_CHAINS_WITH_STAKING].includes(chainId || 0)
  } else {
    blurred = chainId && ![...TGE_CHAINS_WITH_STAKING, SUPPORTED_TGE_CHAINS.MAIN].includes(chainId || 0)
  }

  if (blurred) {
    return (
      <Portal>
        <CenteredFixed width="100vw" height="100vh" style={{ background: 'rgba(0, 0, 0, .5)' }}>
          <NotAvailablePage />
        </CenteredFixed>
      </Portal>
    )
  }

  return (
    <StyledBodyWrapper hasAnnouncement={!cookies.annoucementsSeen}>
      <EmailVerification {...modalProps} closeModal={closeModal} />
      <StatusCard>
        {loadingRequest || loading ? (
          <RowCenter>
            <LoaderThin size={96} />
          </RowCenter>
        ) : (
          <Column style={{ alignItems: 'center' }}>
            <Content
              flexDirection="column"
              marginTop={status === KYCStatuses.NOT_SUBMITTED || status === null ? '8px' : '10px'}
              alignItems="center"
            >
              <TYPE.description6 fontWeight={'800'} marginTop={'30px'} marginBottom="15px">
                <Trans>{config?.name || 'IX Swap'} KYC</Trans>
              </TYPE.description6>
              {/* {description && <Description description={description} />} */}
              <KYCStatus status={kyc?.status || KYCStatuses.NOT_SUBMITTED} />
              {referralCode && (
                <>
                  <Column style={{ margin: '20px 0px' }}>
                    <TYPE.title11>Refer a Friend</TYPE.title11>
                  </Column>
                  <Column style={{ margin: '5px 0px' }}>
                    <StyledDiv>
                      <CenteredDiv>
                        <TitleSpan>{referralCode}</TitleSpan>
                      </CenteredDiv>
                      <FlexContainer>
                        <Copy
                          toCopy={`${new URL(window.location.href).href?.split('?')[0]}?referralCode=${referralCode}`}
                        >
                          <Trans>{`Copy Referral Link`}</Trans>
                        </Copy>
                        {/* <TextSpan></TextSpan> */}
                      </FlexContainer>
                    </StyledDiv>
                  </Column>
                </>
              )}
            </Content>
            {getKYCDescription()}
          </Column>
        )}
      </StatusCard>
    </StyledBodyWrapper>
  )
}

export default KYC

const StyledDiv = styled.div`
  border: 1px solid #e6e6ff;
  padding: 10px 16px;
  width: 280px;
`

const CenteredDiv = styled.div`
  text-align: center;
  margin-bottom: 12px;
`

const TitleSpan = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #292933;
`

const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
`

const TextSpan = styled.span`
  color: #666680;
  font-size: 11px;
  font-weight: 400;
  margin-left: 3px;
`

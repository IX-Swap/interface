import React, { useEffect } from 'react'
import styled, { useTheme } from 'styled-components'
import { useHistory } from 'react-router-dom'
import { text1, text2, text4, text5, text58, text9 } from 'components/LaunchpadMisc/typography'
import { LbpStatus } from '../types'
import { LBP_STAGE_LABELS } from 'state/lbp/constants'
import { LbpStatusBadge } from './LbpStatusBadge'
import { LbpSaleStatusInfo } from './LbpSaleStatusInfo'
import { useKYCState } from 'state/kyc/hooks'
import { KYCStatuses } from 'pages/KYC/enum'
import { useKyc, useRole } from 'state/user/hooks'
import Modal from '@mui/material/Modal'
import { PinnedContentButton } from 'components/Button'
import { TYPE } from 'theme'
import { Line } from 'components/Line'
import { ReactComponent as DraftIcon } from 'assets/images/draftStatusIcon.svg'
import { ReactComponent as RequestChange } from 'assets/images/requestChangeIcon.svg'

interface Props {
  lbp: any
}

const getStageLabel = (stage: LbpStatus) => {
  return LBP_STAGE_LABELS.find((x) => x.value === stage)?.label ?? ''
}

export const LbpCard: React.FC<Props> = ({ lbp }) => {
  const history = useHistory()
  const theme = useTheme()
  const { isChangeRequested, isPending, isDraft, isRejected } = useKyc()
  const [showDetails, setShowDetails] = React.useState(false)
  const [color, setColor] = React.useState('')
  const [showModal, setShowModal] = React.useState(false)
  const [contactFormOpen, setContactForm] = React.useState(false)

  const toggleShowDetails = React.useCallback(() => setShowDetails((state) => !state), [])
  const { kyc } = useKYCState()

  const isClosed = React.useMemo(
    () => !!lbp.status && [LbpStatus.closed, LbpStatus.ended].includes(lbp.status),
    [lbp?.status]
  )

  const onClick = React.useCallback(() => {
    if (isChangeRequested || isPending || isDraft || isRejected) {
      setShowModal(true)
    } else {
      history.push(`/lbp/${lbp.id}`)
    }
  }, [isChangeRequested, isPending, isDraft, isRejected, history, lbp.id])

  const getTitle = () => {
    if (isDraft) return 'We are still verifying your account'
    if (isPending) return 'We are still verifying your account'
    if (isRejected)
      return 'Account verification was unsuccessful. Therefore, you are not able to use the IXS Launchpad. Please try again or contact us for more information.'
    if (isChangeRequested) return 'We have requested an update to your account verification process.'
    return 'Modal Title'
  }
  const getSubtitle = () => {
    if (isDraft || isPending)
      return 'To comply with regulatory requirements, we have to verify your identity before you can proceed.'
    if (isRejected) return 'Account verification is a one-time process.'
    if (isChangeRequested)
      return 'To comply with regulatory requirements, we have to verify your identity before you can proceed.'
    return ''
  }

  useEffect(() => {
    switch (lbp.status) {
      case LbpStatus.live:
      case LbpStatus.closed:
        setColor(theme.lbp.colors.status.color.live)
        break

      case LbpStatus.pending:
        setColor(theme.lbp.colors.status.color.pending)
        break

      case LbpStatus.paused:
      case LbpStatus.ended:
        setColor(theme.lbp.colors.status.color.paused)
        break
    }
  }, [lbp])

  const checkStatus = () => {
    history.push('/kyc')
  }

  const toggleContactForm = React.useCallback(() => setContactForm((state) => !state), [])

  return (
    <>
      {showModal && (
        <Modal
          open={showModal}
          onClose={() => setShowModal(false)}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ModalContainer>
            <ImageContainer>{isRejected ? <RequestChange /> : <DraftIcon />}</ImageContainer>

            <ModalContent>
              <h2 id="modal-title">{getTitle()}</h2>
            </ModalContent>
            <PinnedContentButton onClick={checkStatus}>{isRejected ? 'Try Again' : 'Check Status'}</PinnedContentButton>
            <ModalContent>
              <TYPE.description2 id="modal-subtitle">{getSubtitle()}</TYPE.description2>
            </ModalContent>
            <Line style={{ margin: '30px' }} />
            <ModalContent>
              {isRejected ? (
                <ContactUsTextButton type="button" onClick={toggleContactForm}>
                  Contact us
                </ContactUsTextButton>
              ) : (
                <TYPE.description2 fontSize={'11px'} id="modal-subtitle">
                  {'Account verification can take 1-3 days to be process.'}
                </TYPE.description2>
              )}
            </ModalContent>
          </ModalContainer>
        </Modal>
      )}
      <LbpCardContainer>
        <LbpCardImage src={lbp.banner?.public} />

        <LbpCardHeader>
          <LbpCardTagsContainer>
            <LbpStatusBadge label={getStageLabel(lbp.status)} color={color} />
          </LbpCardTagsContainer>
        </LbpCardHeader>

        <LbpCardInfoWrapper></LbpCardInfoWrapper>

        <LbpCardInfoContainer expanded={showDetails}>
          <LbpCardIcon src={lbp.logo?.public} />

          <LbpCardDescriptionContainer onClick={toggleShowDetails}>
            <LbpCardTitle>{lbp.title}</LbpCardTitle>
            <LbpCardDescription>{lbp.description}</LbpCardDescription>
          </LbpCardDescriptionContainer>

          <LbpCardDetailsContainer show={showDetails}>
            {showDetails && (
              <>
                <LbpCardDetailsEntry>
                  <LbpCardDetailsEntryLabel>Max Supply</LbpCardDetailsEntryLabel>
                  <LbpCardDetailsEntryValue>{lbp.shareMaxSupply}</LbpCardDetailsEntryValue>
                </LbpCardDetailsEntry>

                <LbpCardDetailsSeparator />

                <LbpCardDetailsEntry>
                  <LbpCardDetailsEntryLabel>Min Price</LbpCardDetailsEntryLabel>
                  <LbpCardDetailsEntryValue>{lbp.minPrice}</LbpCardDetailsEntryValue>
                </LbpCardDetailsEntry>

                <LbpCardDetailsSeparator />
              </>
            )}
          </LbpCardDetailsContainer>

          <LbpSaleStatusInfo
            isClosed={isClosed}
            daysTillEnded={lbp.daysTillEnded}
            hoursTillEnded={lbp.hoursTillEnded}
            allowOnlyAccredited={lbp.allowOnlyAccredited}
            status={lbp.status}
          />

          <LbpCardFooter>
            {!isClosed && (
              <InvestButton type="button" onClick={onClick}>
                Invest
              </InvestButton>
            )}

            {isClosed && (
              <InvestButton type="button" onClick={onClick}>
                Learn More
              </InvestButton>
            )}
          </LbpCardFooter>
        </LbpCardInfoContainer>
      </LbpCardContainer>
    </>
  )
}

const LbpCardContainer = styled.article`
  position: relative;
  border: 1px solid ${(props) => props.theme.launchpad.colors.border.default};
  border-radius: 6px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: stretch;
  width: 380px;
  overflow: hidden;
`

const LbpCardHeader = styled.header`
  position: relative;
`

const LbpCardFooter = styled.footer`
  // z-index: 20;
`

const LbpCardImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 380px;
  overflow-x: hidden;
  border-radius: 6px;
  height: 300px;
`

const LbpCardTagsContainer = styled.header`
  position: absolute;
  top: 1rem;
  left: 1rem;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5rem;
`

const LbpCardInfoWrapper = styled.main`
  position: relative;
  margin-top: 260px;
  min-height: 270px;
`

const LbpCardInfoContainer = styled.div<{ expanded: boolean }>`
  position: absolute;
  bottom: 0;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: stretch;
  padding: 1rem 1.5rem;
  padding-top: 3rem;
  width: 100%;
  background: ${(props) => props.theme.launchpad.colors.background};
`

const LbpCardIcon = styled.img`
  position: absolute;
  top: -32px;
  left: 1rem;
  width: 64px;
  height: 64px;
  border-radius: 6px;
`

const LbpCardDescriptionContainer = styled.div`
  cursor: pointer;
`

const LbpCardTitle = styled.div`
  ${text58}
  font-family: ${(props) => props.theme.launchpad.font};

  color: ${(props) => props.theme.launchpad.colors.text.title};

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`
const LbpCardDescription = styled.div`
  ${text4}
  font-family: ${(props) => props.theme.launchpad.font};
  color: ${(props) => props.theme.launchpad.colors.text.body};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`

const LbpCardDetailsContainer = styled.div<{ show: boolean }>`
  opacity: ${(props) => (props.show ? '1' : '0')};
  height: ${(props) => (props.show ? '170px' : '0')};

  transition: height 0.3s ease-in-out, opacity 0.2s ease-out 0.1s;

  z-index: 10;

  ${(props) => props.show && `margin: 0.5rem -1.5rem;`}

  border-top: 1px solid ${(props) => props.theme.launchpad.colors.border.default};
  border-bottom: 1px solid ${(props) => props.theme.launchpad.colors.border.default};

  width: 380px;
`
const LbpCardDetailsEntry = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5rem;
`
const LbpCardDetailsSeparator = styled.hr`
  border: 1px solid ${(props) => props.theme.launchpad.colors.border.default};
  opacity: 0.8;
  margin: 0;
`

const LbpCardDetailsEntryLabel = styled.div`
  ${text5}
  color: ${(props) => props.theme.launchpad.colors.text.body};
`

const LbpCardDetailsEntryValue = styled.div`
  ${text2}
  color: ${(props) => props.theme.launchpad.colors.text.title};
`

const InvestButton = styled.button`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  background: ${(props) => props.theme.launchpad.colors.background};
  color: ${(props) => props.theme.launchpad.colors.primary};
  border: 1px solid ${(props) => props.theme.launchpad.colors.primary};
  border-radius: 6px;
  padding: 0.75rem;
  cursor: pointer;
  width: 100%;
  text-align: center;
  font-family: ${(props) => props.theme.launchpad.font};
  ${text1}
`
const ModalContainer = styled.div`
  background-color: white;
  border: 1px solid #999;
  border-radius: 6px;
  width: 400px;
  padding: 20px;
`

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 20px;
`

const ImageContainer = styled.div`
  text-align: center;
  margin-top: 20px;
`
const ContactUsTextButton = styled.button`
  display: grid;
  place-content: center;
  height: 60px;
  width: 100%;
  text-align: center;
  text-decoration: none;

  ${text9}

  cursor: pointer;
  color: ${(props) => props.theme.launchpad.colors.primary};
  background: ${(props) => props.theme.launchpad.colors.text.light};
  border-radius: 6px;
  border: none;
  outline: 0;
`

import React, { useEffect } from 'react'
import styled, { useTheme } from 'styled-components'
import { useHistory } from 'react-router-dom'
import { text1, text2, text4, text5, text58 } from 'components/LaunchpadMisc/typography'
import { LbpStatus } from '../types'
import { LBP_STAGE_LABELS } from 'state/lbp/constants'
import { LbpStatusBadge } from './LbpStatusBadge'
import { LbpSaleStatusInfo } from './LbpSaleStatusInfo'
import { useKYCState } from 'state/kyc/hooks'
import { KYCStatuses } from 'pages/KYC/enum'

interface Props {
  lbp: any
}

const getStageLabel = (stage: LbpStatus) => {
  return LBP_STAGE_LABELS.find((x) => x.value === stage)?.label ?? ''
}

export const LbpCard: React.FC<Props> = ({ lbp }) => {
  const history = useHistory()
  const theme = useTheme()

  const [showDetails, setShowDetails] = React.useState(false)
  const [color, setColor] = React.useState('')

  const toggleShowDetails = React.useCallback(() => setShowDetails((state) => !state), [])
  const { kyc } = useKYCState()
  const isKycApproved = kyc?.status === KYCStatuses.APPROVED ?? false

  const isClosed = React.useMemo(
    () => !!lbp.status && [LbpStatus.closed, LbpStatus.ended].includes(lbp.status),
    [lbp?.status]
  )

  const onClick = React.useCallback(() => {
    history.push(`/lbp/${lbp.id}`)
  }, [])

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

  return (
    <>
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
              <InvestButton disabled={!isKycApproved} type="button" onClick={onClick}>
                Invest
              </InvestButton>
            )}

            {isClosed && (
              <InvestButton disabled={!isKycApproved} type="button" onClick={onClick}>
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

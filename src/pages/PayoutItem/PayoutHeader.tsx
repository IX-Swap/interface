import React, { FC } from 'react'
import { Flex } from 'rebass'
import { Trans } from '@lingui/macro'
import { NavLink, useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { ButtonSecondary, ButtonPrimary } from 'components/Button'
import { ReadMore } from 'components/ReadMore'
import { MEDIA_WIDTHS } from 'theme'
import { PAYOUT_STATUS } from 'constants/enums'
import { routes } from 'utils/routes'
import { PayoutEvent } from 'state/token-manager/types'
import { capitalizeFirstLetter } from 'components/AdminAccreditationTable/utils'
import { checkWrongChain } from 'chains'
import { useStatusButtonInfo } from './utils'
import { InfoBlock } from './InfoBlock'
import { StyledBodyWrapper } from 'pages/SecurityTokens'
import TokenNetwork from 'components/TokenNetwork'
import Portal from '@reach/portal'
import { CenteredFixed } from 'components/LaunchpadMisc/styled'
import { NetworkNotAvailable } from 'components/Launchpad/NetworkNotAvailable'
import { useWeb3React } from '@web3-react/core'

interface Props {
  payout: PayoutEvent
  isMyPayout: boolean
}

export const PayoutHeader: FC<Props> = ({ payout, isMyPayout }) => {
  const { secToken, payoutToken, description, status, type, attachments, title, otherType, network } = payout
  const history = useHistory()
  const { chainId } = useWeb3React()
  const { isWrongChain, expectChain } = checkWrongChain(chainId, network || '')
  const edit = () => {
    history.push(`/payout/edit/${payout.id}`)
  }

  return (
    <Container>
      {isWrongChain ? (
        <Portal>
          <CenteredFixed width="100vw" height="100vh">
            <NetworkNotAvailable expectChain={expectChain} />
          </CenteredFixed>
        </Portal>
      ) : null}
      <Flex justifyContent="center">
        <StyledBodyWrapper>
          <StyledSummaryBlock>
            <TokenInformationContainer>
              <TitleContent>
                <TokenNetwork token={secToken} network={secToken.network} />
                <SecTokenLink to={routes.securityToken(secToken?.catalogId)}>
                  <Trans>{title}</Trans>
                  <span className="secTokenLinkSymbol">{secToken?.originalSymbol ?? secToken?.symbol}</span>
                </SecTokenLink>
              </TitleContent>
              <ReadMoreContainer>
                <ReadMore more={`Read More`} less={`Show Less`} lines={8}>
                  {description}
                </ReadMore>
              </ReadMoreContainer>
            </TokenInformationContainer>

            <EventContainer>
              <StatusAndEdit>
                {isMyPayout && status !== PAYOUT_STATUS.ENDED && <EditButton onClick={edit}>Edit</EditButton>}
                <PayoutStatus status={status} />
              </StatusAndEdit>
              <InfoBlock
                type={capitalizeFirstLetter(type === 'other' ? otherType : type)}
                token={payoutToken}
                attachments={attachments}
              />
            </EventContainer>
          </StyledSummaryBlock>
        </StyledBodyWrapper>
      </Flex>
    </Container>
  )
}

export const PayoutStatus: FC<{ status: PAYOUT_STATUS }> = ({ status }) => {
  const { title, backgroundColor, color, borderColor } = useStatusButtonInfo(status)

  return (
    <Status backgroundColor={backgroundColor} color={color} borderColor={borderColor}>
      {title}
    </Status>
  )
}

const Container = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.bg0};
  padding: 5rem 0;
  margin-top: -35px;
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    width: calc(100% + 24px);
    padding: 3rem 1rem;
  }
`

const TitleContent = styled.div`
  display: flex;
  align-items: center;
  @media (min-width: ${MEDIA_WIDTHS.upToSmall + 1}px) {
    flex: 1;
  }
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    width: 100%;
    align-items: flex-start;
  }
`

const StatusAndEdit = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`

const StyledSummaryBlock = styled(Flex)`
  justify-content: space-between;
  flex-direction: column;
  gap: 32px;
  @media (min-width: ${MEDIA_WIDTHS.upToSmall}px) {
    flex-direction: row;
    column-gap: 0;
  }
`

const TokenInformationContainer = styled.div`
  width: 100%;
  @media (min-width: ${MEDIA_WIDTHS.upToSmall}px) {
    width: 60%;
  }
`

const EventContainer = styled(Flex)`
  width: 100%;
  flex-direction: column;
  gap: 18px;
  @media (min-width: ${MEDIA_WIDTHS.upToSmall}px) {
    width: 35%;
  }
`

const SecTokenLink = styled(NavLink)`
  font-size: 40px;
  font-weight: 800;
  text-decoration: auto;
  color: ${({ theme }) => theme.text1};
  @media (min-width: ${MEDIA_WIDTHS.upToSmall + 1}px) {
    margin-left: 14px;
  }

  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    order: 2;
  }

  .secTokenLinkSymbol {
    margin-left: 0.5rem;
    color: ${({ theme }) => theme.text6};
  }
`

const EditButton = styled(ButtonSecondary)`
  padding: 15px 0;
  font-size: 13px;
  font-weight: 600;
  border-radius: 6px;
`

const Status = styled(ButtonPrimary)<{ backgroundColor: string; color: string; borderColor: string | null }>`
  background: ${({ backgroundColor }) => backgroundColor};
  color: ${({ color }) => color};
  border: ${({ borderColor }) => (borderColor ? `1px solid ${borderColor}` : 'none')};
  padding: 15px 0;
  font-size: 13px;
  font-weight: 600;
  pointer-events: none;
  border-radius: 6px;
`

export const ReadMoreContainer = styled.div`
  * {
    font-size: 16px;
    line-height: 24px;
    color: ${({ theme }) => theme.text2};
  }
`

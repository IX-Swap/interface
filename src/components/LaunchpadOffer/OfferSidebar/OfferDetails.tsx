import React from 'react'
import styled, { useTheme } from 'styled-components'

import { capitalize } from '@material-ui/core'
import { Copy, Info } from 'react-feather'
import { Link } from 'react-router-dom'
import { Offer, OfferStatus } from 'state/launchpad/types'

import MetamaskIcon from 'assets/images/metamask.png'

import { useFormatOfferValue } from 'state/launchpad/hooks'

import { InvestmentSaleStatusInfo } from 'components/Launchpad/InvestmentCard/InvestmentSaleStatusInfo'
import { Tooltip } from 'components/Launchpad/InvestmentCard/Tooltip'
import { InfoList } from 'components/LaunchpadOffer/util/InfoList'

import { OfferInvestmentIndicator } from './OfferInvestmentIndicator'
import { OfferFundRaiseIndicator } from './OfferFundRaiseIndicator'

import { Column, Row, Separator } from '../../LaunchpadMisc/styled'
import { InvestDialog } from '../InvestDialog'

import PlainCopy from 'components/PlainCopy/PlainCopy'
import useAddTokenByDetailsToMetamask from 'hooks/useAddTokenByDetailsToMetamask'
import { shortenAddress } from 'utils'
import { ExplorerDataType, getExplorerLink } from 'utils/getExplorerLink'
import { nameChainMap } from 'constants/chains'
import { ExternalLink } from 'theme'
import { text10, text33, text6, text9 } from 'components/LaunchpadMisc/typography'
interface Props {
  offer: Offer
}

enum OfferStageStatus {
  disabled,
  notStarted,
  active,
  closed,
}

export const OfferDetails: React.FC<Props> = (props) => {
  const theme = useTheme()
  const explorerLink = getExplorerLink(
    nameChainMap[props?.offer?.network],
    props.offer.tokenAddress,
    ExplorerDataType.TOKEN
  )
  const { addToken } = useAddTokenByDetailsToMetamask()
  const addToMetamask = () => {
    addToken({
      symbol: props.offer.tokenSymbol,
      address: props.offer.tokenAddress,
      decimals: props.offer.decimals,
    })
  }
  const formatter = React.useMemo(() => new Intl.NumberFormat('en-US', { currency: 'USD' }), [])

  const stageStatus = React.useMemo(() => {
    switch (props.offer.status) {
      case OfferStatus.preSale:
      case OfferStatus.sale:
        return OfferStageStatus.active

      case OfferStatus.closed:
      case OfferStatus.claim:
        return OfferStageStatus.closed

      case OfferStatus.approved:
        return OfferStageStatus.disabled

      default:
        return OfferStageStatus.notStarted
    }
  }, [])

  const [showInvestDialog, setShowInvestDialog] = React.useState(false)

  const openInvestDialog = React.useCallback(() => setShowInvestDialog(true), [])
  const closeInvestDialog = React.useCallback(() => setShowInvestDialog(false), [])

  return (
    <Container>
      <OfferSidebarSummary>
        <Column margin="0 0 1rem 0">
          {stageStatus === OfferStageStatus.closed && (
            <InvestmentSaleStatusInfo
              isClosed
              isSuccesfull={props.offer.softCapReached}
              daysTillClosed={props.offer.daysTillSale}
              allowOnlyAccredited={props.offer.allowOnlyAccredited}
              margin="0 0 1.5rem 0"
            />
          )}

          {stageStatus === OfferStageStatus.notStarted && <OfferNotStartedLabel>Not Started</OfferNotStartedLabel>}
          {stageStatus !== OfferStageStatus.notStarted && (
            <>
              <OfferInvestmentAmount>
                {props.offer.investingTokenSymbol} {formatter.format(props.offer.totalInvestment)}
              </OfferInvestmentAmount>

              <Row alignItems="center" gap="1rem">
                <OfferFundRaiseIndicator offer={props.offer} size={32} />
                <OfferFundRaiseLabel>Raised</OfferFundRaiseLabel>
              </Row>
            </>
          )}
        </Column>

        <OfferInvestmentIndicator offer={props.offer} />

        <Separator marginTop="1rem" marginBottom="1rem" />

        <OfferStats>
          <Participants>
            <header>
              Participants
              <Tooltip title="Participants" body="Number of investors that has participated in this deal">
                <Info size="12" />
              </Tooltip>
            </header>

            <main>0</main>
          </Participants>

          <DayCount>
            <header>The deal closes in</header>
            <main>{props.offer.daysTillClosed ?? 0} Days</main>
          </DayCount>
        </OfferStats>

        <InvestButtonContainer>
          {stageStatus !== OfferStageStatus.disabled && (
            <InvestButton onClick={openInvestDialog}>
              {stageStatus === OfferStageStatus.notStarted && 'Register to Invest'}
              {stageStatus === OfferStageStatus.active && 'Invest'}
              {stageStatus === OfferStageStatus.closed && 'Open dashboard '}
            </InvestButton>
          )}

          <InvestHelpLink to="#">How does this work?</InvestHelpLink>
        </InvestButtonContainer>

        {showInvestDialog && <InvestDialog offer={props.offer} onClose={closeInvestDialog} />}
      </OfferSidebarSummary>

      <TokenInfo>
        <TokenInfoCard>
          <span className="label">Token Network: </span>
          {capitalize(props.offer.network)}
        </TokenInfoCard>
        <TokenInfoCard>
          <AdjustedExternalLink href={explorerLink} style={{ fontSize: '14px' }}>
            Explorer
          </AdjustedExternalLink>
        </TokenInfoCard>
        <TokenInfoCard>
          <PlainCopy toCopy={props.offer.tokenAddress}>
            <Row>
              <span>{shortenAddress(props.offer.tokenAddress, 5)}</span>
              <Copy stroke={theme.launchpad.colors.text.body} size="18" />
            </Row>
          </PlainCopy>
        </TokenInfoCard>

        <TokenInfoCard onClick={addToMetamask}>
          Add to Metamask
          <img src={MetamaskIcon} width="20" />
        </TokenInfoCard>
      </TokenInfo>

      <OfferGeneralInfo {...props.offer} />
    </Container>
  )
}

type GeneralInfoFields =
  | 'issuerName'
  | 'country'
  | 'maxInvestment'
  | 'minInvestment'
  | 'investmentType'
  | 'investingTokenSymbol'
  | 'tokenPrice'
  | 'tokenSymbol'

type GeneralInfoProps = Partial<Pick<Offer, GeneralInfoFields>>

export const OfferGeneralInfo: React.FC<GeneralInfoProps> = (props) => {
  const formatedValue = useFormatOfferValue()

  const minTokenInvestment = React.useMemo(
    () => formatedValue(`${Math.floor(Number(props.minInvestment) / Number(props.tokenPrice))}`) ?? 'N/A',
    [props.minInvestment, props.tokenPrice]
  )
  const maxTokenInvestment = React.useMemo(
    () => formatedValue(`${Math.floor(Number(props.maxInvestment) / Number(props.tokenPrice))}`) ?? 'N/A',
    [props.maxInvestment, props.tokenPrice]
  )

  return (
    <InfoList
      entries={[
        { label: 'Issuer', value: props.issuerName || 'N/A' },
        { label: 'Country', value: props.country || 'N/A' },
        { label: 'Investment Type', value: props.investmentType ?? 'N/A' },
        {
          label: 'Token Price',
          value: `${props.investingTokenSymbol}  ${formatedValue(props.tokenPrice) ?? 'N/A'} / 1 ${props.tokenSymbol}`,
        },
        {
          label: 'Max. Investment Size',
          value: `${props.investingTokenSymbol} ${
            formatedValue(props.maxInvestment) ?? 'N/A'
          } / ${maxTokenInvestment} ${props.tokenSymbol}`,
        },
        {
          label: 'Min. Investment Size',
          value: `${props.investingTokenSymbol}  ${
            formatedValue(props.minInvestment) ?? 'N/A'
          } / ${minTokenInvestment} ${props.tokenSymbol}`,
        },
      ]}
    />
  )
}

const Container = styled.div`
  display: flex;

  flex-flow: column nowrap;

  justify-content: flex-start;
  align-items: stretch;

  gap: 2rem;
`

const OfferSidebarSummary = styled.div`
  display: flex;

  flex-flow: column nowrap;
  align-items: stretch;
  gap: 1rem;
`

const OfferFundRaiseLabel = styled.div`
  ${text33}
  color: ${(props) => props.theme.launchpad.colors.text.body};
`

const OfferInvestmentAmount = styled.div`
  font-style: normal;
  font-weight: 800;
  font-size: 48px;
  line-height: 120%;
  letter-spacing: -0.03em;

  color: ${(props) => props.theme.launchpad.colors.primary};
`

const OfferNotStartedLabel = styled(OfferInvestmentAmount)`
  color: ${(props) => props.theme.launchpad.colors.text.caption};
`

const OfferStats = styled.div`
  display: flex;

  flex-flow: row nowrap;
  justify-content: space-between;
`

const Participants = styled.div`
  text-align: left;
  font-style: normal;

  header {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    ${text6}
    color: ${(props) => props.theme.launchpad.colors.text.body};
  }

  main {
    font-weight: 800;
    font-size: 32px;
    line-height: 120%;
    letter-spacing: -0.03em;

    color: ${(props) => props.theme.launchpad.colors.text.title};
  }
`

const DayCount = styled(Participants)`
  text-align: right;
`

const InvestButtonContainer = styled.div`
  display: flex;

  flex-flow: column nowrap;
  align-items: center;
`

const InvestHelpLink = styled(Link)`
  ${text6}
  color: ${(props) => props.theme.launchpad.colors.primary};

  text-decoration: none;
  padding: 1rem;
`

const InvestButton = styled.button`
  height: 60px;
  width: 100%;

  color: ${(props) => props.theme.launchpad.colors.text.light};
  background: ${(props) => props.theme.launchpad.colors.primary};

  cursor: pointer;
  border: none;
  border-radius: 6px;
  ${text9}
`

const TokenInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 1rem;
`

const TokenInfoCard = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  height: 36px;

  ${text10}
  color: ${(props) => props.theme.launchpad.colors.text.title};

  border: 1px solid ${(props) => props.theme.launchpad.colors.border.default};
  border-radius: 6px;

  .label {
    color: ${(props) => props.theme.launchpad.colors.text.body};
    margin-right: 0.5rem;
  }

  svg,
  img {
    margin-left: 0.5rem;
  }
`
const AdjustedExternalLink = styled(ExternalLink)`
  color: ${({ theme }) => theme.launchpad.colors.text.title};
`

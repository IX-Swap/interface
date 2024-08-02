import React from 'react'
import styled from 'styled-components'
import { ConnectionOptions } from './ConnectionOptions'
import { ReactComponent as CrossIcon } from 'assets/launchpad/svg/close.svg'
import {  text14 } from 'components/LaunchpadMisc/typography'
import { Trans } from '@lingui/macro'
import { ContentWrapper } from 'components/WalletModal/styleds'
import { ExternalLink } from 'theme'
import { Text } from 'rebass'
import { AutoRow } from 'components/Row'
import { ReactComponent as TooltipIcon } from 'assets/images/infoBlue.svg'
import { Line } from 'components/Line'
import { useWhitelabelState } from 'state/whitelabel/hooks'

interface Props {
  onConnect: () => void
  onClose: () => void
}

export const ConnectionDialog: React.FC<Props> = (props) => {
  const { config } = useWhitelabelState()

  const handleInstallWallet = () => {
    window.location.href = 'https://www.ixswap.io/search?query=dapp'
  }

  return (
    <ModalContainer style={{ overflow: 'auto', maxHeight: '90vh' }}>
      <PromptTitle>Connect your Wallet</PromptTitle>
      <ContentWrapper>
        <AutoRow>
          <TextContent>
            <Trans>
              Connecting your wallet allows {config?.name || 'IX Swap'} to see your wallet address and, consequently,
              the funds you hold on the blockchain. This does not grant {config?.name || 'IX Swap'} the ability to
              manage or transfer your tokens; for that, you will be asked to sign a token approval.
            </Trans>
            <br />
            <br />
            <Trans>Select your wallet from the options below to get started</Trans>
          </TextContent>
        </AutoRow>
      </ContentWrapper>
      <ExitIconContainer onClick={props.onClose}>
        <CrossIcon />
      </ExitIconContainer>
      <ContentWrapper>
        <ConnectionOptions onClose={props.onClose} />
      </ContentWrapper>
      <InstallLinkContainer>
        <WalletInstallationLink onClick={handleInstallWallet}>I do not have a wallet yet</WalletInstallationLink>
        <TooltipIcon />
      </InstallLinkContainer>
      <Line />
      <AgreementNotice>
        By connecting a wallet, you agree to {config?.name || 'IX Swap'}’s{' '}
        <ExternalLink href={config?.termsAndConditionsUrl ?? 'https://ixswap.io/terms-and-conditions/'}>
          Terms and Conditions
        </ExternalLink>{' '}
        and acknowledge that you have read and understood the{' '}
        <ExternalLink href={config?.privacyPolicyUrl ?? 'https://ixswap.io/privacy-policy/'}>
          {config?.name || 'IX Swap'} Privacy Policy
        </ExternalLink>
        .
      </AgreementNotice>
    </ModalContainer>
  )
}

const PromptTitle = styled.div`
  margin-left: 16px;
  text-align: left;
  margin-bottom: 18px;
  ${text14}
  color: ${(props) => props.theme.launchpad.colors.text.title};
`

const ModalContainer = styled.div`
  background: ${(props) => props.theme.launchpad.colors.background};
  border-radius: 10px;
  padding: 2rem 1rem;
  position: relative;
`

const TextContent = styled(Text)`
  font-size: 13px;
  color: #666680;
  font-weight: 400;
  line-height: 19.5px;
`

const AgreementNotice = styled.div`
  color: #666680;
  font-size: 13px;
  padding: 1rem;

  a {
    text-decoration: none;
    color: #6666ff;
  }
`

const ExitIconContainer = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
  svg {
    fill: ${(props) => props.theme.launchpad.colors.text.body};
  }
`

const WalletInstallationLink = styled.a`
  font-size: 13px;
  color: #6666ff;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  margin-bottom: 28px;
`

const InstallLinkContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;
`

export default ConnectionDialog

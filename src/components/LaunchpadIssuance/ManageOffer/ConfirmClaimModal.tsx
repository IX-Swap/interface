import React from 'react'
import styled, { useTheme } from 'styled-components'
import { CheckCircle, Copy } from 'react-feather'

import { text10 } from 'components/LaunchpadMisc/typography'
import useCopyClipboard from 'hooks/useCopyClipboard'
import { SMART_CONTRACT_STRATEGIES } from '../types'
import { ConfirmPopup } from '../utils/ConfirmPopup'
import { shortenAddress } from 'utils'

const Content = ({ distributionControllerAddress }: { distributionControllerAddress: string }) => {
  const theme = useTheme()
  const [controllerCopied, setControllerCopied] = useCopyClipboard()
  return (
    <ContentContainer>
      <div>
        Before starting the Claim process please make sure the corresponding amount of Security Tokens has been
        transferred to this address
      </div>
      <BtnContainer onClick={() => setControllerCopied(distributionControllerAddress)}>
        {shortenAddress(distributionControllerAddress, 5)}
        {controllerCopied ? (
          <CheckCircle stroke={theme.launchpad.colors.text.body} size="18" />
        ) : (
          <Copy stroke={theme.launchpad.colors.text.body} size="18" />
        )}
      </BtnContainer>
    </ContentContainer>
  )
}

export const ConfirmClaimModal = (props: any) => {
  const { isOpen, onClose, onClaim, smartContractStrategy, distributionControllerAddress } = props
  return (
    <ConfirmPopup
      subtitle={
        smartContractStrategy === SMART_CONTRACT_STRATEGIES.nonOriginalWithNoAccess ? (
          <Content distributionControllerAddress={distributionControllerAddress} />
        ) : null
      }
      isOpen={isOpen}
      onDecline={onClose}
      onAccept={onClaim}
    />
  )
}

const BtnContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;

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

  padding: 10px 0;
  width: 180px;
  height: 40px;
  cursor: pointer;
  position: relative;
`

const ContentContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  gap: 12px;
  width: 100%;
  max-width: 320px;
`

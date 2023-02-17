import React from 'react'
import styled from 'styled-components'

import { OfferStatus } from 'state/launchpad/types'

import { ReactComponent as HelpIcon } from 'assets/launchpad/svg/help-icon.svg'

import { Separator, Spacer } from '../../LaunchpadMisc/styled'

interface Props {
  stage: OfferStatus
}

const labels = [
  { label: 'Register To Invest', value: OfferStatus.whitelist },
  { label: 'Pre-Sale', value: OfferStatus.preSale },
  { label: 'Public Sale', value: OfferStatus.sale },
  { label: 'Closed', value: OfferStatus.closed },
  { label: 'Token Claim', value: OfferStatus.claim },
]

export const InvestDialogSidebar: React.FC<Props> = (props) => {
  return (
    <StageList>
      {labels.map((entry, idx) => (
        <>
          <Stage key={`stage-${entry.value}`} active={props.stage === entry.value}>
            {entry.label}
          </Stage>

          {idx < labels.length - 1 && <Separator key={`separator-${idx}`} />}
        </>
      ))}
      <Spacer />
      {/* Hide for now https://app.clickup.com/t/4733323/IXS-2508 */}
      {/* <Help>
        <HelpIcon /> Help and Tips
      </Help> */}
    </StageList>
  )
}

const StageList = styled.div`
  display: flex;

  flex-flow: column nowrap;
  align-items: stretch;

  background: ${(props) => props.theme.launchpad.colors.foreground};
  border-radius: 16px 0 0 16px;

  height: 100%;

  padding: 2.5rem 1.5rem;
`

const Stage = styled.div<{ active: boolean }>`
  font-style: normal;
  font-weight: 500;
  font-size: 13px;

  line-height: 40px;
  letter-spacing: -0.02em;

  color: ${(props) =>
    props.active ? props.theme.launchpad.colors.primary : props.theme.launchpad.colors.text.bodyAlt};
`

const Help = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;

  gap: 0.25rem;

  font-style: normal;
  font-weight: 500;
  font-size: 13px;

  line-height: 150%;
  letter-spacing: -0.02em;

  color: ${(props) => props.theme.launchpad.colors.text.bodyAlt};

  border: 1px solid ${(props) => props.theme.launchpad.colors.border.default};
  border-radius: 8px;

  padding: 0.5rem 1rem;
`

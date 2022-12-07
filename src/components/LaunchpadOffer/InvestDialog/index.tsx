import React from 'react'
import Portal from '@reach/portal'
import styled, { useTheme } from 'styled-components'

import { X } from 'react-feather'

import { RegisterToInvestStage } from './content/RegisterToInvest'
import { SaleStage } from './content/Sale'

import { Offer, OfferStatus } from 'state/launchpad/types'

import { InvestDialogSidebar } from './Sidebar'
import { ClosedStage } from './content/Closed'

interface Props {
  offer: Offer
  onClose: () => void
}

enum StageForm {
  register,
  sale,
  closed
}

export const InvestDialog: React.FC<Props> = (props) => {
  const theme = useTheme()

  const stage = React.useMemo(() => {
    switch (props.offer.status) {
      case OfferStatus.whitelist:
        return StageForm.register
        
      case OfferStatus.preSale:
      case OfferStatus.sale:
        return StageForm.sale
        
      case OfferStatus.closed:
      case OfferStatus.claim:
        return StageForm.closed

      default:
        return null
    }
  }, [])

  return (
    <Portal>
      <ModalWrapper>
        <DialogContainer>
          <aside>
            <InvestDialogSidebar stage={props.offer.status} />
          </aside>

          <header>
            <DialogHeader>
              <DialogHeaderTitle>Dashboard</DialogHeaderTitle>
              <DialogHeaderExit onClick={props.onClose}>
                <X size="18" stroke={theme.launchpad.colors.text.bodyAlt} />
              </DialogHeaderExit>
            </DialogHeader>
          </header>

          <main>
            {stage === StageForm.register && <RegisterToInvestStage symbol={props.offer.investingTokenSymbol}/>}
            {stage === StageForm.sale && <SaleStage offer={props.offer} />}
            {stage === StageForm.closed && <ClosedStage offer={props.offer} />}
          </main>
        </DialogContainer>
      </ModalWrapper>
    </Portal>
  )
}

const ModalWrapper = styled.div`
  display: grid;
  place-content: center;
  
  position: fixed;

  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

  z-index: 30;

  background: rgba(6, 6, 40, 0.6);
  backdrop-filter: blur(16px);
`

const DialogContainer = styled.article`
  display: grid;

  grid-template-columns: 200px 500px;
  grid-template-rows: 60px 1fr;
  grid-template-areas: 
    "sidebar header"
    "sidebar content";

  background: ${props => props.theme.launchpad.colors.background};
  border-radius: 16px;

  max-width: 700px;
  min-height: 500px;

  > header {
    grid-area: header;
  }

  > main {
    grid-area: content;
  }

  > aside {
    grid-area: sidebar;
  }

  > header {
    padding: 0 2rem;
    padding-top: 1rem;
  }

  > main {
    padding: 0 2rem;
  }
`

const DialogHeader = styled.div`
  display: flex;

  flex-flow: row nowrap;
  justify-content: flex-around;
  align-items: center;
`

const DialogHeaderTitle = styled.div`
  flex-grow: 1;

  text-align: center;

  font-style: normal;
  font-weight: 500;
  font-size: 14px;

  line-height: 32px;
  letter-spacing: -0.02em;

  color: ${props => props.theme.launchpad.colors.text.bodyAlt};
`
const DialogHeaderExit = styled.button`
  display: grid;
  place-content: center;

  flex-shrink: 1;

  border: none;
  background: none;

  cursor: pointer;

  max-height: fit-content;

  padding: 0;
  margin: 0;
`

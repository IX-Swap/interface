import React, { useCallback, useMemo } from 'react'
import Portal from '@reach/portal'
import styled, { useTheme } from 'styled-components'
import { X } from 'react-feather'

import { RegisterToInvestStage } from './content/RegisterToInvest'
import { ClosedStage } from './content/Closed'
import { SaleStage } from './content/Sale'
import { InvestedDataRes, Offer, OfferStatus } from 'state/launchpad/types'
import { InvestDialogSidebar } from './Sidebar'
import { text26 } from 'components/LaunchpadMisc/typography'
import useInterval from 'hooks/useInterval'
import { Centered } from 'components/LaunchpadMisc/styled'
import { useTokenLoading } from 'hooks/Tokens'
import { Loader } from '../util/Loader'
import { isMobile } from 'react-device-detect'
import { MEDIA_WIDTHS, ModalPadding } from 'theme'

interface Props {
  offer: Offer
  onClose: () => void
  openSuccess: () => void
  investedData: InvestedDataRes
}

enum StageForm {
  register,
  sale,
  closed,
}

const allLabels = [
  { label: 'Register To Invest', value: OfferStatus.whitelist },
  { label: 'Pre-Sale', value: OfferStatus.preSale },
  { label: 'Public Sale', value: OfferStatus.sale },
  { label: 'Closed', value: OfferStatus.closed },
  { label: 'Token Claim', value: OfferStatus.claim },
]

export const InvestDialog: React.FC<Props> = (props) => {
  const theme = useTheme()

  const stage = useMemo(() => {
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
  }, [props.offer.status])

  const updateCallback = useCallback(() => {
    props.investedData.load()
  }, [props.investedData.load])
  useInterval(updateCallback, 30 * 1000)
  const labelToShow = allLabels.find((label) => label.value === props.offer.status)?.label

  console.log(props.offer.status, 'kklklk')
  return (
    <>
      <ModalContainer>
        <Portal>
          {/* <ModalPadding> */}
          <ModalWrapper>
            {isMobile && (
              <DialogHeader>
                {isMobile ? (
                  <>
                    <DialogHeaderExit style={{position: 'absolute', right: '10px', top: '24px'}} onClick={props.onClose}>
                      <X size="18" stroke={theme.launchpad.colors.text.bodyAlt} />
                    </DialogHeaderExit>
                    <DialogHeaderTitle style={{ marginBottom: '20px' }}>
                      <DialogHeaderTitle> Dashboard</DialogHeaderTitle>

                      <div
                        style={{ margin: '10px', border: '1px solid #E6E6FF', padding: '3px 5px', borderRadius: '8px' }}
                      >
                        {labelToShow || props.offer.status}
                      </div>
                    </DialogHeaderTitle>
                  </>
                ) : (
                  <DialogHeaderTitle>Dashboard</DialogHeaderTitle>
                )}
              </DialogHeader>
            )}
            <DialogContainer>
              {!isMobile && (
                <aside>
                  <InvestDialogSidebar stage={props.offer.status} hasPresale={props.offer.hasPresale} />
                </aside>
              )}

              {/* <header> */}
              {!isMobile && (
                <DialogHeader>
                  {isMobile ? (
                    <DialogHeaderTitle style={{ marginBottom: '20px' }}>
                      <DialogHeaderTitle> Dashboard</DialogHeaderTitle>
                      <div style={{ border: '1px solid #E6E6FF', padding: '10px 30px', borderRadius: '8px' }}>
                        {labelToShow || props.offer.status}
                      </div>
                    </DialogHeaderTitle>
                  ) : (
                    <DialogHeaderTitle> Dashboard</DialogHeaderTitle>
                  )}

                  <DialogHeaderExit onClick={props.onClose}>
                    <X size="18" stroke={theme.launchpad.colors.text.bodyAlt} />
                  </DialogHeaderExit>
                </DialogHeader>
              )}

              {/* </header> */}

              <main>
                {stage === StageForm.register && <RegisterToInvestStage {...props} />}
                {stage === StageForm.sale && <SaleStage {...props} />}
                {stage === StageForm.closed && <ClosedStage {...props} />}
              </main>
            </DialogContainer>
          </ModalWrapper>
          {/* </ModalPadding> */}
        </Portal>
      </ModalContainer>
    </>
  )
}
const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  // backdrop-filter: blur(36px);
  z-index: 9999;
  padding: 0px 18px;
  display: none;
  background: ${({ theme }) => theme.bg0};
  @media (max-width: 1400px) {
    display: block;
    overflow-y: scroll;
  }
`
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

  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    overflow-y: scroll;
    max-height: 100vh;
    background: white;
  }
`

const DialogContainer = styled.article`
  display: grid;

  grid-template-columns: 200px 500px;
  grid-template-areas:
    'sidebar header'
    'sidebar content';

  background: ${(props) => props.theme.launchpad.colors.background};
  border-radius: 16px;

  max-width: 700px;
  min-height: 500px;

  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    grid-template-columns: 0px 400px;
  }

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
  // flex-flow: row nowrap;
  // justify-content: flex-around;
  align-items: center;
`

const DialogHeaderTitle = styled.div`
  flex-grow: 1;
  text-align: center;
  margin-top: 20px;

  ${text26}
  color: ${(props) => props.theme.launchpad.colors.text.bodyAlt};
`
const DialogHeaderExit = styled.button`
  display: grid;
  place-content: center;
  flex-shrink: 1;
  border: none;
  background: none;
  cursor: pointer;
  max-height: fit-content;
  padding: 0px 20px;
  margin: 0;

  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    // float: right;
  }
`

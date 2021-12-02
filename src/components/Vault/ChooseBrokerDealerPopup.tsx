import { Trans } from '@lingui/macro'
import { ReactComponent as Checkmark } from 'assets/images/checked-solid-bg.svg'
import { ButtonIXSWide } from 'components/Button'
import { LoaderThin } from 'components/Loader/LoaderThin'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import Row, { RowBetween } from 'components/Row'
import React, { useCallback, useEffect, useState } from 'react'
import { ApplicationModal } from 'state/application/actions'
import { useChooseBrokerDealerModalToggle, useModalOpen } from 'state/application/hooks'
import { useBrokerDealersState, useFetchBrokerDealers } from 'state/brokerDealer/hooks'
import { usePassAccreditation, useUserState } from 'state/user/hooks'
import styled from 'styled-components'
import { ModalBlurWrapper, ModalContentWrapper, ModalPadding } from 'theme'
import { CloseIcon, TYPE } from '../../theme'

export const ChooseBrokerDealerPopup = ({ tokenId, currencyId }: { tokenId: any; currencyId?: string }) => {
  const isOpen = useModalOpen(ApplicationModal.CHOOSE_BROKER_DEALER)
  const toggle = useChooseBrokerDealerModalToggle()

  const { brokersData: brokerDealerPairs, brokersLoading, brokersError } = useBrokerDealersState()
  const [selectedBrokerPair, setSelectedBrokerPair] = useState(0)
  const { loadingAccreditation } = useUserState()
  const fetchBrokerDealerPairs = useFetchBrokerDealers()
  useEffect(() => {
    if (tokenId) {
      fetchBrokerDealerPairs(tokenId)
    }
  }, [tokenId])

  useEffect(() => {
    if (brokerDealerPairs) {
      setSelectedBrokerPair(brokerDealerPairs[0]?.id)
    }
  }, [brokerDealerPairs])

  const onClose = useCallback(() => {
    toggle()
  }, [toggle])

  const passAccreditation = usePassAccreditation(currencyId)

  return (
    <RedesignedWideModal
      isOpen={isOpen}
      onDismiss={onClose}
      minHeight={false}
      maxHeight={'fit-content'}
      mobileMaxHeight={90}
    >
      <ModalBlurWrapper data-testid="choose-broker-dealer-and-custodian-popup">
        <ModalContentWrapper style={{ borderRadius: '12px' }}>
          <ModalPadding>
            <ModalHeader>
              <TYPE.title5>
                <Trans>Broker dealer and Custodian</Trans>
              </TYPE.title5>
              <CloseIcon data-testid="cross" onClick={onClose} className="close-icon" />
            </ModalHeader>
            <Row style={{ opacity: '0.7', marginTop: '18px' }}>
              <TYPE.description2>
                <Trans>Please choose broker dealer and custodian to start accreditation process</Trans>
              </TYPE.description2>
            </Row>
          </ModalPadding>
          <div id="broker-dealer-and-custodian-list" style={{ marginTop: '8px' }}>
            {brokersLoading && (
              <div style={{ margin: 'auto', display: 'table' }}>
                <LoaderThin size={32} />
              </div>
            )}
            {brokersError && <div style={{ margin: 'auto', display: 'table' }}>Something went wrong</div>}
            {brokerDealerPairs?.map((pair) => (
              <BrokerDealerAndCustodianPair
                key={pair?.id}
                onClick={() => setSelectedBrokerPair(pair?.id)}
                className={`${selectedBrokerPair === pair?.id ? 'selected' : ''}`}
              >
                <div className="pair-text">
                  <TYPE.body4>{pair?.pair?.brokerDealer?.name}</TYPE.body4>&nbsp;—&nbsp;
                  <TYPE.body4 style={{ fontWeight: 400 }}>{pair?.pair?.custodian?.name}</TYPE.body4>
                </div>
                <IconWrapper size={28}>
                  {selectedBrokerPair === pair?.id ? (
                    <Checkmark className="selected-checkmark" />
                  ) : (
                    <CheckmarkPlaceholder />
                  )}
                </IconWrapper>
              </BrokerDealerAndCustodianPair>
            ))}
          </div>
          <StartAccreditationButtonWrapper>
            <Row style={{ marginBottom: '24px' }} className="start-accreditation-button-row">
              {!loadingAccreditation && (
                <ButtonIXSWide
                  disabled={loadingAccreditation}
                  style={{ textTransform: 'unset' }}
                  onClick={() => {
                    passAccreditation(tokenId, selectedBrokerPair)
                  }}
                >
                  <Trans>Start accreditation</Trans>
                </ButtonIXSWide>
              )}
              {loadingAccreditation && (
                <div style={{ margin: 'auto' }}>
                  <LoaderThin size={32} />
                </div>
              )}
            </Row>
          </StartAccreditationButtonWrapper>
        </ModalContentWrapper>
      </ModalBlurWrapper>
    </RedesignedWideModal>
  )
}

const ModalHeader = styled(RowBetween)`
  ${({ theme }) => theme.mediaWidth.upToSmall`
      align-items: flex-start;

      .close-icon {
        margin-top: 0.3rem;
        stroke-width: 2.5;
      }
  `};
`

const BrokerDealerAndCustodianPair = styled(Row)`
  padding: 10px 0;
  justify-content: space-between;
  cursor: pointer;
  &:hover,
  &.selected {
    background-color: #edceff0a;
  }

  .pair-text {
    margin: 0 18px 0 40px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    ${({ theme }) => theme.mediaWidth.upToSmall`
      margin: 0 16px;
    `};
  }
`

const CheckmarkPlaceholder = styled.div`
  border: 2px solid #372e5e;
  box-sizing: border-box;
  height: 28px;
  width: 28px;
  border-radius: 100%;
  opacity: 0.6;
`

export const IconWrapper = styled.div<{ size?: number }>`
  ${({ theme }) => theme.flexColumnNoWrap};
  margin-right: 40px;
  align-items: center;
  justify-content: center;
  & > img,
  span {
    height: ${({ size }) => (size ? size + 'px' : '32px')};
    width: ${({ size }) => (size ? size + 'px' : '32px')};
  }
  ${({ theme }) => theme.mediaWidth.upToMedium`
    align-items: flex-end;
  `};
  ${({ theme }) => theme.mediaWidth.upToSmall`
      margin-right: 16px;
  `};
`
const StartAccreditationButtonWrapper = styled(ModalPadding)`
  ${({ theme }) => theme.mediaWidth.upToSmall`
    margin-top: auto;

    .start-accreditation-button-row {
      margin-bottom: 10px !important;
    }
  `};
`

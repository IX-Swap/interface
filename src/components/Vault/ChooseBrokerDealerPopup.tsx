import { Trans } from '@lingui/macro'
import { ReactComponent as Checkmark } from 'assets/images/checked-solid-bg.svg'
import { ButtonIXSWide } from 'components/Button'
import { LoaderThin } from 'components/Loader/LoaderThin'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import Row, { RowBetween } from 'components/Row'
import { useCurrency } from 'hooks/Tokens'
import React, { useCallback, useEffect, useState } from 'react'
import { Flex } from 'rebass'
import { ApplicationModal } from 'state/application/actions'
import { useChooseBrokerDealerModalToggle, useModalOpen } from 'state/application/hooks'
import { useBrokerDealersState, useFetchBrokerDealers } from 'state/brokerDealer/hooks'
import { useFetchUserSecTokenListCallback, usePassAccreditation, useUserState } from 'state/user/hooks'
import styled from 'styled-components'
import { ModalBlurWrapper, ModalContentWrapper, ModalPadding } from 'theme'
import { CloseIcon, TYPE } from '../../theme'

export const ChooseBrokerDealerPopup = ({ tokenId, currencyId }: { tokenId: any; currencyId?: string }) => {
  const isOpen = useModalOpen(ApplicationModal.CHOOSE_BROKER_DEALER)
  const toggle = useChooseBrokerDealerModalToggle()

  const { brokersData: brokerDealerPairs, brokersLoading, brokersError } = useBrokerDealersState()
  const [selectedBrokerPair, setSelectedBrokerPair] = useState(0)
  const { loadingAccreditation } = useUserState()
  const tokenName = (useCurrency(currencyId) as any)?.tokenInfo?.name || null
  const fetchList = useFetchUserSecTokenListCallback()
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

  const onSuccess = () => {
    setTimeout(() => {
      fetchList()
    }, 10000)
  }

  const passAccreditation = usePassAccreditation(currencyId, onSuccess)

  return (
    <RedesignedWideModal
      isOpen={isOpen}
      onDismiss={onClose}
      minHeight={false}
      maxHeight={'fit-content'}
      mobileMaxHeight={90}
    >
      <ModalBlurWrapper data-testid="choose-broker-dealer-and-custodian-popup">
        <ModalContentWrapper style={{ borderRadius: '12px', backgroundColor: '#272046' }}>
          <div style={{ backgroundColor: '#0F0518', borderRadius: '12px 12px 0px 0px' }}>
            <ModalPadding>
              <ModalHeader>
                <TYPE.title5>
                  <Trans>Broker dealer and Custodian pair</Trans>
                </TYPE.title5>
                <CloseIcon data-testid="cross" onClick={onClose} className="close-icon" />
              </ModalHeader>
              <Row style={{ opacity: '0.7', marginTop: '18px' }}>
                <TYPE.description2 fontWeight={400}>
                  <Trans>{`Choose the pair of third-party services you want to use for ${tokenName} token.`}</Trans>
                </TYPE.description2>
              </Row>
              <Row style={{ opacity: '0.7', marginTop: '18px' }}>
                <TYPE.description2 fontWeight={600}>
                  <Trans>Broker-dealer</Trans>
                </TYPE.description2>
                &nbsp;
                <TYPE.description2 fontWeight={400}>
                  <Trans>{`will check and confirm every transaction with ${tokenName} token.`}</Trans>
                </TYPE.description2>
              </Row>
              <Row style={{ opacity: '0.7' }}>
                <TYPE.description2 fontWeight={600}>
                  <Trans>Custodian</Trans>
                </TYPE.description2>
                &nbsp;
                <TYPE.description2 fontWeight={400}>
                  <Trans>{`will keep your ${tokenName} in a safe place.`}</Trans>
                </TYPE.description2>
              </Row>
            </ModalPadding>
          </div>

          <div id="broker-dealer-and-custodian-list" style={{ marginTop: '25px' }}>
            {brokersLoading && (
              <div style={{ margin: 'auto', display: 'table' }}>
                <LoaderThin size={32} />
              </div>
            )}
            {brokersError && <div style={{ margin: 'auto', display: 'table' }}>Something went wrong</div>}
            <BrokerDealersGridHeader>
              <TYPE.description2>Broker-dealer</TYPE.description2>
              <div />
              <TYPE.description2>Custodian</TYPE.description2>
              <div />
            </BrokerDealersGridHeader>
            {brokerDealerPairs?.map((pair) => (
              <BrokerDealersGrid
                key={pair?.id}
                onClick={() => setSelectedBrokerPair(pair?.id)}
                className={`${selectedBrokerPair === pair?.id ? 'selected' : ''}`}
              >
                <TYPE.body4>{pair?.pair?.brokerDealer?.name}</TYPE.body4>
                <Flex alignItems="center">
                  <Line />
                </Flex>
                <TYPE.body4 style={{ fontWeight: 400 }}>{pair?.pair?.custodian?.name}</TYPE.body4>
                <IconWrapper size={28} style={{ marginLeft: 'auto', marginRight: 0 }}>
                  {selectedBrokerPair === pair?.id ? (
                    <Checkmark className="selected-checkmark" />
                  ) : (
                    <CheckmarkPlaceholder />
                  )}
                </IconWrapper>
              </BrokerDealersGrid>
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
  background-color: #edceff0a;
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

const BrokerDealersGridHeader = styled.div`
  display: grid;
  grid-template-columns: 115px 30px 200px 1fr;
  padding: 10px 40px;
`

const BrokerDealersGrid = styled(BrokerDealersGridHeader)`
  cursor: pointer;
  &:hover,
  &.selected {
    background-color: #edceff0a;
  }
`

const Line = styled.div`
  height: 3px;
  width: 10px;
  background-color: #edceff;
  opacity: 0.5;
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

import { Trans, t } from '@lingui/macro'
import { ReactComponent as Checkmark } from 'assets/images/checked-solid-bg.svg'
import { ButtonIXSWide } from 'components/Button'
import { LoaderThin } from 'components/Loader/LoaderThin'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import Row, { RowBetween } from 'components/Row'
import Tooltip from 'components/Tooltip'
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
import { useHistory } from 'react-router-dom'
import { useKYCState } from 'state/kyc/hooks'
import { KYCStatuses } from './enum'

const KycSourceContainer = styled.div`
  width: 100%;

  padding: 0.5rem 1.5rem;

  & > * {
    margin: 0.5rem;
  }
`

const KycRow = styled.div`
  display: flex;

  flex-flow: row nowrap;

  gap: 1rem;

  justify-content: flex-start;
  align-items: center;
`

const KycTooltipIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle opacity="0.1" cx="10" cy="10" r="10" fill="#EDCEFF" />
      <path
        opacity="0.8"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 4C9.44772 4 9 4.44772 9 5C9 5.55228 9.44772 6 10 6C10.5523 6 11 5.55228 11 5C11 4.44772 10.5523 4 10 4ZM9 15C9 15.5523 9.44772 16 10 16C10.5523 16 11 15.5523 11 15L11 9C11 8.44772 10.5523 8 10 8C9.44772 8 9 8.44771 9 9V15Z"
        fill="#EDCEFF"
      />
    </svg>
  )
}

const Spacer = styled.div`
  flex-grow: 1;
`

const Separator = styled.hr`
  background: #edceff;

  width: 100%;
  opacity: 0.2;
`

const Button = styled.button`
  background: radial-gradient(93.65% 93.65% at 58.57% 22.42%, rgba(206, 20, 132, 0.33) 0%, rgba(26, 18, 58, 0) 100%),
    #2c254a;

  color: #edceff;
  border-radius: 40px;
  border: none;
  margin: 0px 24px;
  padding: 0.5rem 2rem;

  cursor: pointer;

  border: 1px solid rgba(0, 0, 0, 0.33);

  &:active {
    border: none;
  }
`

interface KycSourceTooltipProps {
  text: string
}

const KycSourceTooltip: React.FC<KycSourceTooltipProps> = (props: React.PropsWithChildren<KycSourceTooltipProps>) => {
  const [show, setShow] = useState(false)

  return (
    <div onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      <Tooltip text={props.text} show={show}>
        {props.children ?? <KycTooltipIcon />}
      </Tooltip>
    </div>
  )
}

enum KycSource {
  IXSwap,
  InvestaX,
}

interface KycSourceSelectorProps {
  onChange: (value?: KycSource) => void
}

const KycSourceSelector = (props: KycSourceSelectorProps) => {
  const history = useHistory()
  const { kyc } = useKYCState()

  const [selected, setSelected] = useState<KycSource | undefined>(undefined)
  const [statusDesc, setStatusDesc] = useState('')

  const getText = (status: string | undefined) => {
    switch (status) {
      case KYCStatuses.APPROVED:
        return t`KYC: APPROVED`
      case KYCStatuses.REJECTED:
        return t`KYC: REJECTED`
      case KYCStatuses.PENDING:
        return t`KYC: PENDING`
      case KYCStatuses.CHANGES_REQUESTED:
        return t`KYC: CHANGE REQUESTED`
      case KYCStatuses.NOT_SUBMITTED:
        return t`KYC: NOT_SUBMITTED`
      default:
        return t`Pass KYC on IX Swap`
    }
  }

  useEffect(() => {
    const status = kyc?.data.status === KYCStatuses.APPROVED ? KycSource.IXSwap : KycSource.InvestaX //|| KYCStatuses.NOT_SUBMITTED

    setStatusDesc(getText(kyc?.data.status))
    setSelected(status)
  }, [kyc])

  useEffect(() => {
    props.onChange(selected)
  }, [props, selected])

  const onChange = useCallback(
    (value: KycSource) => {
      if (kyc?.data.status === KYCStatuses.APPROVED || value !== KycSource.IXSwap) {
        setSelected(value)
      }
    },
    [kyc]
  )

  const requestKyc = () => {
    history.push('/kyc')
  }

  return (
    <KycSourceContainer>
      <KycRow>
        <TYPE.small style={{ fontSize: '12px', color: '#EDCEFF' }}>KYC source</TYPE.small>
      </KycRow>
      <KycRow onClick={() => onChange(KycSource.IXSwap)}>
        <TYPE.body1>My IX Swap KYC</TYPE.body1>

        <KycSourceTooltip text="Recommended" />

        <Button onClick={requestKyc} disabled={kyc?.data?.status === KYCStatuses.APPROVED}>
          <TYPE.small>{statusDesc}</TYPE.small>
        </Button>

        <Spacer />
        {kyc?.data?.status === KYCStatuses.APPROVED ? (
          <IconWrapper size={28} style={{ marginLeft: 'auto', marginRight: 0 }}>
            {selected === KycSource.IXSwap ? <Checkmark className="selected-checkmark" /> : <CheckmarkPlaceholder />}
          </IconWrapper>
        ) : (
          <KycSourceTooltip text="Pass KYC on IX Swap to enable this option">
            <IconWrapper size={28} style={{ marginLeft: 'auto', marginRight: 0 }}>
              {selected === KycSource.IXSwap ? <Checkmark className="selected-checkmark" /> : <CheckmarkPlaceholder />}
            </IconWrapper>
          </KycSourceTooltip>
        )}
      </KycRow>

      {/* <KycRow onClick={() => onChange(KycSource.InvestaX)}>
        <TYPE.body1>Fetch from InvestaX</TYPE.body1>

        <KycSourceTooltip text="Make sure you have your KYC approved on InvestaX before using this option" />

        <Spacer />

        <IconWrapper size={28} style={{ marginLeft: 'auto', marginRight: 0 }}>
          {selected === KycSource.InvestaX ? <Checkmark className="selected-checkmark" /> : <CheckmarkPlaceholder />}
        </IconWrapper>
      </KycRow> */}
    </KycSourceContainer>
  )
}

export const ChooseBrokerDealerPopup = ({ tokenId, currencyId }: { tokenId: any; currencyId?: string }) => {
  const isOpen = useModalOpen(ApplicationModal.CHOOSE_BROKER_DEALER)
  const toggle = useChooseBrokerDealerModalToggle()

  const { brokersData: brokerDealerPairs, brokersLoading, brokersError } = useBrokerDealersState()
  const [source, setSource] = useState<KycSource | undefined>(undefined)
  const [selectedBrokerPair, setSelectedBrokerPair] = useState(0)
  const { loadingAccreditation } = useUserState()
  const tokenName = (useCurrency(currencyId) as any)?.tokenInfo?.symbol || null
  const fetchList = useFetchUserSecTokenListCallback()
  const fetchBrokerDealerPairs = useFetchBrokerDealers()
  const { kyc } = useKYCState()

  useEffect(() => {
    if (isOpen) {
      return () => {
        toggle()
      }
    }
  }, [isOpen, toggle])

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
                  <Trans>{tokenName} Accreditation</Trans>
                </TYPE.title5>
                <CloseIcon data-testid="cross" onClick={onClose} className="close-icon" />
              </ModalHeader>

              {/* Modal description segment */}
              {/* <div style={{ marginTop: '18px' }}>
                <TYPE.title10>1. Choose source of KYC for accreditation</TYPE.title10>
                <TYPE.description2 fontWeight={400}>
                  <Trans>{`We recommend choosing IX Swap KYC. Pass it once and use for all future accreditations quick and easy.`}</Trans>
                </TYPE.description2>
              </div>

              <div style={{ marginTop: '18px' }}>
                <TYPE.title10>
                  2. Choose the pair of third-party services you want to use for {tokenName} token
                </TYPE.title10>
                <TYPE.description2 display="inline" style={{ whiteSpace: 'nowrap' }} fontWeight={600}>
                  <Trans>Broker-dealer</Trans>
                  &nbsp;
                </TYPE.description2>
                <TYPE.description2 display="inline" fontWeight={400}>
                  <Trans>{`will check and confirm every transaction with ${tokenName} token.`}</Trans>
                </TYPE.description2>

                <TYPE.description2 display="inline" style={{ whiteSpace: 'nowrap' }} fontWeight={600}>
                  <Trans>Custodian</Trans>
                  &nbsp;
                </TYPE.description2>
                <TYPE.description2 display="inline" fontWeight={400}>
                  <Trans>{`will keep your ${tokenName} in a safe place.`}</Trans>
                </TYPE.description2>
              </div> */}
            </ModalPadding>
          </div>

          {/* KYC source segement */}
          <KycSourceSelector onChange={setSource} />

          <Separator />

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
                <Text>{pair?.pair?.brokerDealer?.name}</Text>
                <Flex alignItems="center">
                  <Line />
                </Flex>
                <Text style={{ fontWeight: 400 }}>{pair?.pair?.custodian?.name}</Text>
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
                  disabled={loadingAccreditation || kyc?.data?.status !== KYCStatuses.APPROVED}
                  style={{ textTransform: 'unset' }}
                  onClick={() => {
                    passAccreditation(tokenId, selectedBrokerPair, source === KycSource.IXSwap)
                  }}
                >
                  <Trans>Submit accreditation</Trans>
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

const Text = styled(TYPE.body4)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 8px !important;
`

const BrokerDealersGridHeader = styled.div`
  display: grid;
  grid-template-columns: 115px 30px 1fr auto;
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

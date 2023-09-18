import React, { useCallback, useEffect, useState } from 'react'
import { Trans, t } from '@lingui/macro'
import styled from 'styled-components'
import { Box, Flex } from 'rebass'
import { useHistory } from 'react-router-dom'

import { PassedIcon } from 'pages/KYC/styleds'
import { ButtonIXSWide, PinnedContentButton } from 'components/Button'
import { LoaderThin } from 'components/Loader/LoaderThin'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import Row, { RowBetween, RowCenter } from 'components/Row'
import Tooltip from 'components/Tooltip'
import { useCurrency } from 'hooks/Tokens'
import { ApplicationModal } from 'state/application/actions'
import { useChooseBrokerDealerModalToggle, useModalOpen } from 'state/application/hooks'
import { useBrokerDealersState, useFetchBrokerDealers, useClearBrokerDealers } from 'state/brokerDealer/hooks'
import { useFetchUserSecTokenListCallback, usePassAccreditation, useUserState } from 'state/user/hooks'
import { ModalBlurWrapper, ModalContentWrapper, ModalPadding, CloseIcon, TYPE } from 'theme'
import { useKYCState } from 'state/kyc/hooks'
import { KYCStatuses } from 'pages/KYC/enum'
import { useActiveWeb3React } from 'hooks/web3'
import { useWhitelabelState } from 'state/whitelabel/hooks'
import { Line } from 'components/Line'
import { ReactComponent as TooltipIcon } from 'assets/images/newTooltip.svg'
import { ReactComponent as Checked } from 'assets/images/newRightCheck.svg'
import { ReactComponent as CheckmarkPlaceholder } from 'assets/images/newContainRadio.svg'
import { ReactComponent as CheckmarkPlaceholderEmpty } from 'assets/images/newEmptyRadio.svg'

const KycSourceContainer = styled.div`
  width: 100%;

  padding: 0.5rem 0rem;

  & > * {
    margin: 0.5rem 0rem;
  }
`

const KycRow = styled.div`
  display: flex;

  flex-flow: row nowrap;

  gap: 1rem;

  justify-content: flex-start;
  align-items: center;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    overflow: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;  
    ::-webkit-scrollbar {
      display: none;
    }
  `};
`

const Button = styled.button`
  background: ${({ theme }) => theme.bg0};

  color: ${({ theme }) => theme.text1};
  border-radius: 8px;
  border: none;
  margin: 0px 24px;
  padding: 0.5rem 2rem;

  cursor: pointer;

  border: 1px solid #e6e6ff;

  &:active {
    border: none;
  }

  ${({ theme }) => theme.mediaWidth.upToSmall`
    margin: 0;
  `};
`

interface KycSourceTooltipProps {
  text: string
}

const KycSourceTooltip = (props: React.PropsWithChildren<KycSourceTooltipProps>) => {
  const [show, setShow] = useState(false)

  return (
    <div onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      <Tooltip text={props.text} show={show}>
        {props.children ?? <TooltipIcon />}
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
  const { config } = useWhitelabelState()

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
        return t`Pass KYC on ${config?.name || 'IX Swap'}`
    }
  }

  useEffect(() => {
    const status = kyc?.status === KYCStatuses.APPROVED ? KycSource.IXSwap : KycSource.InvestaX //|| KYCStatuses.NOT_SUBMITTED

    setStatusDesc(getText(kyc?.status))
    setSelected(status)
  }, [kyc])

  useEffect(() => {
    props.onChange(selected)
  }, [props, selected])

  const onChange = useCallback(
    (value: KycSource) => {
      if (kyc?.status === KYCStatuses.APPROVED || value !== KycSource.IXSwap) {
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
      <KycRow style={{ margin: '18px 0px' }}>
        <TYPE.title11>Choose source of KYC</TYPE.title11>
      </KycRow>
      <RowBetween onClick={() => onChange(KycSource.IXSwap)}>
        <div style={{ display: 'flex' }}>
          <TYPE.body1 style={{ marginRight: '5px' }} minWidth="auto">
            My {config?.name || 'IX Swap'} KYC
          </TYPE.body1>
          <KycSourceTooltip text="Recommended" />
        </div>
        <div style={{ display: 'flex' }}>
          <Button onClick={requestKyc} disabled={kyc?.status === KYCStatuses.APPROVED}>
            <TYPE.title10 color={kyc?.status === KYCStatuses.APPROVED ? '#0ECC88' : '#292933'}>
              {statusDesc}
            </TYPE.title10>
          </Button>
          {kyc?.status === KYCStatuses.APPROVED ? (
            <Box style={{ marginTop: '6px' }}>
              <Checked />
            </Box>
          ) : null}
        </div>
      </RowBetween>
      <Line style={{ margin: '10px 0px' }} />
      <RowBetween>
        <div style={{ display: 'flex' }}>
          <TYPE.body1 style={{ marginRight: '5px' }}>Fetch from InvestaX</TYPE.body1>
          <KycSourceTooltip text="Make sure you have your KYC approved on InvestaX before using this option" />
        </div>

        {/* {kyc?.status !== KYCStatuses.APPROVED && (
          <KycSourceTooltip text={`Pass KYC on ${config?.name || 'IX Swap'} to enable this option`}>
            <IconWrapper size={16} style={{ marginLeft: 'auto', marginRight: 0 }}>
              <CheckmarkPlaceholder />
            </IconWrapper>
          </KycSourceTooltip>
        )} */}

        {kyc?.status === KYCStatuses.APPROVED ? (
          <IconWrapper size={16} style={{ marginLeft: 'auto', marginRight: 0 }}>
            {selected === KycSource.IXSwap ? <CheckmarkPlaceholder /> : <CheckmarkPlaceholderEmpty />}
          </IconWrapper>
        ) : (
          <KycSourceTooltip text={`Pass KYC on ${config?.name || 'IX Swap'} to enable this option`}>
            <IconWrapper size={16} style={{ marginLeft: 'auto', marginRight: 0 }}>
              {selected === KycSource.IXSwap ? <CheckmarkPlaceholder /> : <CheckmarkPlaceholderEmpty />}
            </IconWrapper>
          </KycSourceTooltip>
        )}
      </RowBetween>

      {/* <RowBetween onClick={() => onChange(KycSource.InvestaX)}>
        <IconWrapper size={28} style={{ marginLeft: 'auto', marginRight: 0 }}>
          {selected === KycSource.InvestaX ? <CheckmarkPlaceholder /> : <CheckmarkPlaceholderEmpty />}
        </IconWrapper>
      </RowBetween> */}
    </KycSourceContainer>
  )
}

export const ChooseBrokerDealerPopup = ({
  tokenId,
  currencyId,
  symbolText,
}: {
  tokenId: any
  currencyId?: string
  symbolText?: string
}) => {
  const isOpen = useModalOpen(ApplicationModal.CHOOSE_BROKER_DEALER)
  const toggle = useChooseBrokerDealerModalToggle()

  const { chainId } = useActiveWeb3React()

  const { brokersData: brokerDealerPairs, brokersLoading, brokersError } = useBrokerDealersState()
  const [source, setSource] = useState<KycSource | undefined>(undefined)
  const [selectedBrokerPair, setSelectedBrokerPair] = useState(0)
  const { loadingAccreditation } = useUserState()
  const tokenName = (useCurrency(currencyId) as any)?.tokenInfo?.originalSymbol || null
  const fetchList = useFetchUserSecTokenListCallback()
  const fetchBrokerDealerPairs = useFetchBrokerDealers()
  const { kyc } = useKYCState()
  const clearBrokerDealers = useClearBrokerDealers()

  useEffect(() => {
    if (isOpen) {
      return () => {
        toggle()
      }
    }
  }, [isOpen, toggle])

  useEffect(() => {
    if (chainId) {
      clearBrokerDealers()
    }
  }, [chainId, clearBrokerDealers])

  useEffect(() => {
    if (tokenId && brokerDealerPairs.length === 0) {
      fetchBrokerDealerPairs(tokenId)
    }
  }, [tokenId, fetchBrokerDealerPairs, brokerDealerPairs])

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
        {/* <StyledModalContentWrapper> */}
        <div>
          <ModalPadding>
            <ModalHeader>
              <TYPE.title5>
                <Trans>{symbolText} Accreditation</Trans>
              </TYPE.title5>
              <CloseIcon data-testid="cross" onClick={onClose} className="close-icon" />
            </ModalHeader>

            {/* Modal description segment */}
            <div
              style={{ border: '1px solid #E6E6FF', padding: '25px', marginTop: '20px', backgroundColor: '#F7F7FA' }}
            >
              <div style={{ marginTop: '18px' }}>
                <TYPE.title10>1. Choose source of KYC for accreditation</TYPE.title10>
                <TYPE.description2 fontWeight={400}>
                  <Trans>{`We recommend choosing IX Swap KYC. Pass it once and use for all future accreditations quick and easy.`}</Trans>
                </TYPE.description2>
              </div>
              <Line style={{ marginTop: '10px' }} />
              <div style={{ marginTop: '18px' }}>
                <TYPE.title10>
                  2. Choose the pair of third-party services you want to use for {tokenId} token
                </TYPE.title10>

                <TYPE.description2 fontWeight={400}>
                  <Trans>{`Broker-dealer will check and confirm every transaction with ${tokenName} token. Custodian will keep your ${tokenName} in a safe place.`}</Trans>
                </TYPE.description2>
              </div>
            </div>
          </ModalPadding>
        </div>

        {/* KYC source segement */}
        <KycSourceSelector onChange={setSource} />

        {/* <Separator /> */}
        <Line style={{ margin: '6px 0px' }} />
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
              <TYPE.title10>{pair?.pair?.brokerDealer?.name}</TYPE.title10>
              <Flex alignItems="center"></Flex>
              <TYPE.title10 style={{ fontWeight: 400 }}>{pair?.pair?.custodian?.name}</TYPE.title10>
              <IconWrapper size={28} style={{ marginLeft: 'auto', marginRight: -29 }}>
                {selectedBrokerPair === pair?.id ? <CheckmarkPlaceholder /> : <CheckmarkPlaceholderEmpty />}
              </IconWrapper>
            </BrokerDealersGrid>
          ))}
          {brokerDealerPairs?.length === 0 && (
            <RowCenter marginTop="8px" padding="0px 2rem">
              No pairs available for this network, please change it.
            </RowCenter>
          )}
        </div>
        <Line style={{ margin: '20px 0px' }} />
        <StartAccreditationButtonWrapper>
          <Row style={{ marginBottom: '24px' }} className="start-accreditation-button-row">
            {!loadingAccreditation && (
              <PinnedContentButton
                disabled={
                  loadingAccreditation || kyc?.status !== KYCStatuses.APPROVED || brokerDealerPairs?.length === 0
                }
                style={{ textTransform: 'unset' }}
                onClick={() => {
                  passAccreditation(tokenId, selectedBrokerPair, source === KycSource.IXSwap)
                }}
              >
                <Trans>Start accreditation</Trans>
              </PinnedContentButton>
            )}
            {loadingAccreditation && (
              <div style={{ margin: 'auto' }}>
                <LoaderThin size={32} />
              </div>
            )}
          </Row>
        </StartAccreditationButtonWrapper>
        {/* </StyledModalContentWrapper> */}
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

const BrokerDealersGridHeader = styled.div`
  display: grid;
  grid-template-columns: 200px 30px 1fr auto;
  padding: 0.5rem 2rem;
`

const BrokerDealersGrid = styled(BrokerDealersGridHeader)`
  cursor: pointer;
  &:hover,
  &.selected {
    background-color: #edceff0a;
  }
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

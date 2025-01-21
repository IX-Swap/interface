import { Trans } from '@lingui/macro'
import IXSToken from 'assets/images/logo/IXS-Token.png'
import { IconWrapper } from 'components/AccountDetails/styleds'
import Column from 'components/Column'
import { LoaderThin } from 'components/Loader/LoaderThin'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import { RowBetween, RowCenter, RowEnd } from 'components/Row'
import { TextRow } from 'components/TextRow/TextRow'
import { IXS_GOVERNANCE_ADDRESS } from 'constants/addresses'
import { useCurrency } from 'hooks/Tokens'
import useAddTokenToMetamask from 'hooks/useAddTokenToMetamask'
import useIXSCurrency from 'hooks/useIXSCurrency'
import { useWeb3React } from 'hooks/useWeb3React'
import JSBI from 'jsbi'
import React, { useCallback } from 'react'
import { ApplicationModal } from 'state/application/actions'
import { useModalOpen, useToggleModal } from 'state/application/hooks'
import { useIXSBalance, useIXSGovBalance } from 'state/user/hooks'
import styled from 'styled-components'
import { ModalBlurWrapper, TextGradient } from 'theme'
import { ModalContentWrapper } from 'theme/components'
import { formatAmount } from 'utils/formatCurrencyAmount'
import { CloseIcon, TYPE } from '../../theme'
import { canRegisterToken } from 'utils/wallet'

export const IXSBalanceModal = () => {
  const IXSBalance = useIXSBalance()
  const IXSGovBalance = useIXSGovBalance()
  const isOpen = useModalOpen(ApplicationModal.IXS_BALANCE)
  const toggle = useToggleModal(ApplicationModal.IXS_BALANCE)
  const onClose = useCallback(() => toggle(), [toggle])
  const { chainId } = useWeb3React()
  const IXSCurrency = useIXSCurrency()
  const IXSGovCurrency = useCurrency(IXS_GOVERNANCE_ADDRESS[chainId ?? 1])
  const addIXS = useAddTokenToMetamask(IXSCurrency ?? undefined)
  const addIXSGov = useAddTokenToMetamask(IXSGovCurrency ?? undefined)
  const showBalance = JSBI.greaterThan(IXSBalance?.amount?.quotient ?? JSBI.BigInt(0), JSBI.BigInt(0))
  const isCanRegisterToken = canRegisterToken()

  return (
    <RedesignedWideModal
      isOpen={isOpen}
      onDismiss={onClose}
      minHeight={false}
      maxHeight={'fit-content'}
      mobileMaxHeight={80}
      scrollable
    >
      <ModalBlurWrapper data-testid="ixs-balance-popup">
        <CloseButtonWap>
          <CloseIcon data-testid="cross" onClick={onClose} />
        </CloseButtonWap>
        <ModalContentWrapper style={{ borderRadius: '12px' }}>
          <ModalPadding>
            <RowCenter>
              <IconWrapper size={92}>
                <img src={IXSToken} />
              </IconWrapper>
            </RowCenter>
            {showBalance && (
              <RowCenter style={{ marginTop: '12px' }}>
                <TYPE.title4>
                  <Trans>{formatAmount(Number(IXSBalance?.amount?.toSignificant(12)))}</Trans>
                </TYPE.title4>
              </RowCenter>
            )}
            <AdjustableColumn style={{ marginTop: '40px' }}>
              <TextRow
                textLeft={
                  <RowBetween style={{ gap: '5px' }}>
                    <Trans>Balance of {IXSCurrency?.symbol}</Trans>
                    {IXSCurrency && isCanRegisterToken && (
                      <AddToMetamask onClick={() => !addIXS.success && addIXS.addToken()}>
                        {!addIXS.success ? <Trans>Add to Metamask</Trans> : null}
                      </AddToMetamask>
                    )}
                  </RowBetween>
                }
                textRight={
                  IXSBalance ? (
                    <>{`${formatAmount(Number(IXSBalance?.amount?.toSignificant(12)))} ${IXSCurrency?.symbol}`}</>
                  ) : (
                    <LoaderThin size={16} />
                  )
                }
              />

              {IXSGovBalance && IXSGovBalance.amount ? (
                <TextRow
                  textLeft={
                    <RowBetween style={{ gap: '5px' }}>
                      <Trans>Balance of IXGov</Trans>
                      {IXSCurrency && isCanRegisterToken && (
                        <AddToMetamask onClick={() => !addIXSGov.success && addIXSGov.addToken()}>
                          {!addIXSGov.success ? <Trans>Add to Metamask</Trans> : null}
                        </AddToMetamask>
                      )}
                    </RowBetween>
                  }
                  textRight={
                    IXSGovBalance ? (
                      <>{`${formatAmount(Number(IXSGovBalance?.amount?.toSignificant(12)))} ${
                        IXSGovCurrency?.symbol
                      }`}</>
                    ) : (
                      <LoaderThin size={16} />
                    )
                  }
                />
              ) : null}
            </AdjustableColumn>
            <Column style={{ gap: '6px', marginTop: '22px' }}></Column>
          </ModalPadding>
        </ModalContentWrapper>
      </ModalBlurWrapper>
    </RedesignedWideModal>
  )
}

const ModalPadding = styled.div`
  padding: 37px 40px 19px 40px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
   padding: 1rem;
  `};
`
const AdjustableColumn = styled(Column)`
  gap: 6px;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
      gap: 22px;
  `};
`

const AddToMetamask = styled.div`
  cursor: pointer;
  color: #6666ff;

  &:hover {
    text-decoration: underline;
  }
`

const CloseButtonWap = styled.div`
  position: absolute;
  right: 0px;
  top: 0px;
  margin-right: 8px;
  margint-top: 8px;
  padding: 1rem;
  cursor: pointer;
  z-index: 9999;
`

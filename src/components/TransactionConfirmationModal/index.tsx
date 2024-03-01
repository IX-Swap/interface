import React, { ReactNode, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { Currency } from '@ixswap1/sdk-core'
import { Trans } from '@lingui/macro'

import { LoaderThin } from 'components/Loader/LoaderThin'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import useAddTokenToMetamask from 'hooks/useAddTokenToMetamask'
import { useExplorerName } from 'hooks/useExplorerName'

import Attention from '../../assets/images/NewWarning.svg'
import { ReactComponent as Success } from '../../assets/images/success.svg'
import { useActiveWeb3React } from '../../hooks/web3'
import { ExternalLink, TYPE, ModalContentWrapper } from '../../theme'
import { CloseIcon, ModalBlurWrapper, SvgIconWrapper } from '../../theme/components'
import { ExplorerDataType, getExplorerLink } from '../../utils/getExplorerLink'
import { ButtonGradient, ButtonGradientBorder } from '../Button'
import Column, { AutoColumn } from '../Column'
import { RowBetween, RowCenter, RowFixed } from '../Row'
import MetamaskIcon from 'assets/images/metamask.png'
import { isMobile } from 'react-device-detect'

export const StyledSuccess = styled(Success)`
  ${({ theme }) =>
    theme.config.elements &&
    css`
      path[stroke] {
        fill: none;
        stroke: ${theme.config.elements.main};
      }
    `};
`

export const StyledModalContentWrapper = styled(ModalContentWrapper)`
  // padding: 37px 190px 19px 40px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
   padding: 1rem;
  `};
`

export const StyledTitle = styled(TYPE.title7)`
  @media (max-width: 768px) {
    text-align: center;
  }
`

type AdditionalParams = {
  [key: string]: any // Customize the type based on your requirements
}

const trackEvent = (eventType: string, eventName: string, additionalParams?: AdditionalParams) => {
  // Use type assertion to inform TypeScript that 'safary' exists on 'window'
  if ((window as any).safary && (window as any).safary.track) {
    // Call the 'track' function
    ;(window as any).safary.track(eventType, eventName, additionalParams)
  }
}

export function ConfirmationPendingContent({
  onDismiss,
  pendingText,
}: {
  onDismiss: () => void
  pendingText: ReactNode
  inline?: boolean // not in modal
}) {
  return (
    <ModalBlurWrapper>
      <StyledModalContentWrapper>
        <Column>
          <RowBetween>
            <CloseIcon onClick={onDismiss} />
          </RowBetween>
          <RowCenter>
            <StyledTitle>
              <Trans>Waiting For Confirmation</Trans>
            </StyledTitle>
          </RowCenter>
          <RowCenter style={{ marginTop: '20px' }}>
            <TYPE.title9>{pendingText}</TYPE.title9>
          </RowCenter>
          <RowCenter style={{ marginTop: '53px', marginBottom: '84px' }}>
            <LoaderThin size={128} />
          </RowCenter>

          <RowCenter style={{ opacity: '0.7' }}>
            <TYPE.description2>
              <Trans>Confirm this transaction in your wallet</Trans>
            </TYPE.description2>
          </RowCenter>
        </Column>
      </StyledModalContentWrapper>
    </ModalBlurWrapper>
  )
}

export function TransactionSubmittedContent({
  onDismiss,
  chainId,
  hash,
  currencyToAdd,
  trade,
}: {
  onDismiss: () => void
  hash: string | undefined
  chainId: number
  currencyToAdd?: Currency | undefined
  inline?: boolean // not in modal
  trade?: any
}) {
  const { library } = useActiveWeb3React()

  const { addToken, success } = useAddTokenToMetamask(currencyToAdd)
  const explorerName = useExplorerName()


  const trackTransactionSubmission = () => {
    trackEvent('swap', 'ixs-swap', {
      fromAmount: trade?.inputAmount?.toSignificant(6),
      fromCurrency: trade?.inputAmount?.currency?.symbol,
      contractAddress: '0x72f54BEbabE8A26794B8BFeA832b65B7Bd88da37',
      toAmount: trade?.outputAmount?.toSignificant(6),
      toCurrency: trade?.outputAmount?.currency?.symbol,
    })
  }

  useEffect(() => {
    trackTransactionSubmission()
  }, [])

  return (
    <ModalBlurWrapper>
      <StyledModalContentWrapper>
        <Column>
          <RowBetween>
            <div />
            <CloseIcon onClick={onDismiss} />
          </RowBetween>
          <RowCenter>
            <StyledTitle>
              <Trans>Transaction Submitted</Trans>
            </StyledTitle>
          </RowCenter>
          {currencyToAdd && library?.provider?.isMetaMask && (
            <RowCenter>
              <ButtonGradient
                mt="12px"
                style={{
                  width: 'fit-content',
                  padding: '18px 45px',
                  background: 'none',
                  border: ' 1px solid #E6E6FF',
                  color: '#292933',
                  borderRadius: '6px',
                }}
                onClick={addToken}
                data-testid="add-currency-to-metamask"
                disabled={Boolean(success)}
              >
                {!success ? (
                  <RowFixed>
                    <img style={{ height: '18px', marginRight: '10px' }} src={MetamaskIcon} />
                    <Trans>Add {currencyToAdd.symbol} to Metamask</Trans>
                  </RowFixed>
                ) : (
                  <RowFixed>
                    <Trans>Added {currencyToAdd.symbol} </Trans>
                  </RowFixed>
                )}
              </ButtonGradient>
            </RowCenter>
          )}
          <RowCenter style={{ marginTop: '61px', marginBottom: '53px' }}>
            <SvgIconWrapper size={128}>
              <StyledSuccess />
            </SvgIconWrapper>
          </RowCenter>
          <AutoColumn gap="12px" justify={'center'}>
            {chainId && hash && (
              <ExternalLink
                style={{ color: '#6666FF', textDecoration: 'none' }}
                href={getExplorerLink(chainId, hash, ExplorerDataType.TRANSACTION)}
              >
                <Trans>View on {explorerName}</Trans>
              </ExternalLink>
            )}
            <ButtonGradientBorder
              onClick={onDismiss}
              data-testid="return-close"
              style={{ width: isMobile ? '200px' : '450px', marginBottom: '35px', marginTop: '10px' }}
            >
              <Trans>Close</Trans>
            </ButtonGradientBorder>
          </AutoColumn>
        </Column>
      </StyledModalContentWrapper>
    </ModalBlurWrapper>
  )
}

export function TransactionErrorContent({ message, onDismiss }: { message: ReactNode; onDismiss: () => void }) {
  return (
    <ModalBlurWrapper data-testid="TransactionPopup">
      <StyledModalContentWrapper>
        <CloseIcon style={{ position: 'absolute', right: '10px' }} onClick={onDismiss} />
        <Column>
          <RowCenter style={{ marginTop: 30 }}>
            <SvgIconWrapper size={128}>
              <img src={Attention} alt={'Error'} />
            </SvgIconWrapper>
          </RowCenter>
          <RowCenter style={{ marginTop: '20px' }}>
            <TYPE.title5>
              <Trans>Error Occurred</Trans>
            </TYPE.title5>
          </RowCenter>

          <RowCenter style={{ marginTop: 14, marginBottom: 53, textAlign: 'center' }}>
            <TYPE.error error={!!message}>{message}</TYPE.error>
          </RowCenter>
          <RowCenter style={{ marginBottom: 35 }}>
            <ButtonGradientBorder
              onClick={onDismiss}
              data-testid="close"
              style={{ width: '112px', border: '1px solid #E6E6FF ' }}
            >
              <Trans>Close</Trans>
            </ButtonGradientBorder>
          </RowCenter>
        </Column>
      </StyledModalContentWrapper>
    </ModalBlurWrapper>
  )
}

export interface ConfirmationModalProps {
  isOpen: boolean
  onDismiss: () => void
  hash: string | undefined
  content: () => ReactNode
  attemptingTxn: boolean
  pendingText: ReactNode
  currencyToAdd?: Currency | undefined
  trade?: any
}

export default function ConfirmationModalContent({
  isOpen,
  onDismiss,
  attemptingTxn,
  hash,
  pendingText,
  content,
  currencyToAdd,
  trade,
}: ConfirmationModalProps) {
  const { chainId } = useActiveWeb3React()

  if (!chainId) return null

  // confirmation screen

  // console.log(
  //   currencyToAdd,
  //   trade,
  //   trade?.inputAmount?.toSignificant(6),
  //   trade?.inputAmount?.currency?.symbol,
  //   trade?.outputAmount?.toSignificant(6),
  //   trade?.outputAmount?.currency?.symbol, 'log new 22'
  // )
  return (
    <ModalBlurWrapper data-testid="TransactionPopup">
      <StyledModalContentWrapper>
        <RedesignedWideModal isOpen={isOpen} onDismiss={onDismiss} maxHeight={90}>
          {attemptingTxn ? (
            <ConfirmationPendingContent onDismiss={onDismiss} pendingText={pendingText} />
          ) : hash ? (
            <TransactionSubmittedContent
              chainId={chainId}
              hash={hash}
              onDismiss={onDismiss}
              currencyToAdd={currencyToAdd}
              trade={trade}
            />
          ) : (
            content()
          )}
        </RedesignedWideModal>
      </StyledModalContentWrapper>
    </ModalBlurWrapper>
  )
}

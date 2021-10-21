import { Currency } from '@ixswap1/sdk-core'
import { Trans } from '@lingui/macro'
import { LoaderThin } from 'components/Loader/LoaderThin'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import useAddTokenToMetamask from 'hooks/useAddTokenToMetamask'
import { useExplorerName } from 'hooks/useExplorerName'
import React, { ReactNode } from 'react'
import styled from 'styled-components'
import Attention from '../../assets/images/attention.svg'
import Success from '../../assets/images/success.svg'
import { useActiveWeb3React } from '../../hooks/web3'
import { ExternalLink, TYPE, ModalContentWrapper } from '../../theme'
import { CloseIcon, ModalBlurWrapper, SvgIconWrapper } from '../../theme/components'
import { ExplorerDataType, getExplorerLink } from '../../utils/getExplorerLink'
import { ButtonGradient, ButtonGradientBorder } from '../Button'
import Column, { AutoColumn } from '../Column'
import { RowBetween, RowCenter, RowFixed } from '../Row'

export const StyledModalContentWrapper = styled(ModalContentWrapper)`
  padding: 37px 40px 19px 40px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
   padding: 1rem;
  `};
`

export const StyledTitle = styled(TYPE.title4)`
  @media (max-width: 768px) {
    text-align: center;
  }
`

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
            <div />
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
}: {
  onDismiss: () => void
  hash: string | undefined
  chainId: number
  currencyToAdd?: Currency | undefined
  inline?: boolean // not in modal
}) {
  const { library } = useActiveWeb3React()

  const { addToken, success } = useAddTokenToMetamask(currencyToAdd)
  const explorerName = useExplorerName()

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
                style={{ width: 'fit-content', padding: '7px 45px' }}
                onClick={addToken}
                data-testid="add-currency-to-metamask"
                disabled={Boolean(success)}
              >
                {!success ? (
                  <RowFixed>
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
              <img src={Success} alt={'Success!'} />
            </SvgIconWrapper>
          </RowCenter>
          <AutoColumn gap="12px" justify={'center'}>
            {chainId && hash && (
              <ExternalLink href={getExplorerLink(chainId, hash, ExplorerDataType.TRANSACTION)}>
                <Trans>View on {explorerName}</Trans>
              </ExternalLink>
            )}
            <ButtonGradientBorder
              onClick={onDismiss}
              data-testid="return-close"
              style={{ width: '211px', marginBottom: '35px' }}
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
        <Column>
          <RowBetween>
            <div></div>
            <CloseIcon onClick={onDismiss} />
          </RowBetween>
          <RowCenter>
            <TYPE.title4>
              <Trans>Error Occurred</Trans>
            </TYPE.title4>
          </RowCenter>
          <RowCenter style={{ marginTop: 61 }}>
            <SvgIconWrapper size={128}>
              <img src={Attention} alt={'Error'} />
            </SvgIconWrapper>
          </RowCenter>
          <RowCenter style={{ marginTop: 14, marginBottom: 53, textAlign: 'center' }}>
            <TYPE.error error={!!message}>{message}</TYPE.error>
          </RowCenter>
          <RowCenter style={{ marginBottom: 35 }}>
            <ButtonGradientBorder onClick={onDismiss} data-testid="close" style={{ width: '112px' }}>
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
}

export default function ConfirmationModalContent({
  isOpen,
  onDismiss,
  attemptingTxn,
  hash,
  pendingText,
  content,
  currencyToAdd,
}: ConfirmationModalProps) {
  const { chainId } = useActiveWeb3React()

  if (!chainId) return null

  // confirmation screen
  return (
    <RedesignedWideModal isOpen={isOpen} onDismiss={onDismiss} maxHeight={90}>
      {attemptingTxn ? (
        <ConfirmationPendingContent onDismiss={onDismiss} pendingText={pendingText} />
      ) : hash ? (
        <TransactionSubmittedContent
          chainId={chainId}
          hash={hash}
          onDismiss={onDismiss}
          currencyToAdd={currencyToAdd}
        />
      ) : (
        content()
      )}
    </RedesignedWideModal>
  )
}

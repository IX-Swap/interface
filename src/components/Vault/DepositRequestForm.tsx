import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Trans } from '@lingui/macro'
import { ReactComponent as DownArrow } from 'assets/images/DownArrow.svg'

import { PinnedContentButton } from 'components/Button'
import Column from 'components/Column'
import Row, { RowBetween } from 'components/Row'
import useENS from 'hooks/useENS'
import { useActiveWeb3React } from 'hooks/web3'
import {
  useDepositActionHandlers,
  useDepositCallback,
  useDepositState,
  useDerivedDepositInfo,
  useShowAboutWrappingCallback,
} from 'state/deposit/hooks'
import { shortAddress } from 'utils'
import { BlueGreyCard } from 'components/Card'
import { useUserSecTokens } from 'state/user/hooks'
import { TYPE } from 'theme'
import { currencyId } from 'utils/currencyId'
import { HideSmall } from 'theme'
import { getOriginalNetworkFromToken } from 'components/CurrencyLogo'
import { capitalizeFirstLetter } from 'components/AdminAccreditationTable/utils'
import { SecCurrency } from 'types/secToken'

import { AddressInput } from '../AddressInputPanel/AddressInput'
import { AmountInput } from './AmountInput'
import { DepositWarningModal } from './DepositWarningModal'
import { Line } from 'components/Line'
import { useTokenContract } from 'hooks/useContract'
import { ethers } from 'ethers'
import { formatNumberWithDecimals } from 'state/lbp/hooks'
import useDecimals from 'hooks/useDecimals'

export const ArrowWrapper = styled.div`
  // padding: 7px 5px;
  border-radius: 100%;
  margin: 0px auto;
  height: 31px;
  width: 31px;
  display: flex;
  justify-content: center;
  align-items: center;
  // background-color: ${({ theme }) => theme.bg9};
`
interface Props {
  currency?: SecCurrency & { tokenInfo?: { decimals?: number; originalDecimals?: number } }
  token: any
}

export const DepositRequestForm = ({ currency, token }: Props) => {
  const tokenContract = useTokenContract(token?.address ?? '')
  const showAboutWrapping = useShowAboutWrappingCallback()
  const { account } = useActiveWeb3React()
  const { amount, sender, currencyId: cid } = useDepositState()
  const { inputError, parsedAmount } = useDerivedDepositInfo()
  const { onTypeAmount, onTypeSender, onCurrencySet, onNetworkSet, onResetDeposit } = useDepositActionHandlers()
  const { address, loading } = useENS(sender)
  const { secTokens } = useUserSecTokens()
  const deposit = useDepositCallback()
  const tokenDecimals = useDecimals(token?.address ?? '') ?? 18

  const [isWarningOpen, handleIsWarningOpen] = useState(false)
  const [amountInputValue, setAmountInputValue] = useState('')
  const [tokenBalance, setTokenBalance] = useState('0')

  const tokenInfo = (secTokens[(currency as any)?.address || ''] as any)?.tokenInfo
  const networkName = getOriginalNetworkFromToken(tokenInfo)
  const error = Boolean(sender.length > 0 && !loading && !address && networkName === 'Ethereum')
  const computedAddress = networkName === 'Ethereum' ? address : sender

  // useEffect(() => {
  //   onResetDeposit()
  // }, [])

  const fetchTokenBalance = async () => {
    if (!tokenContract || !account) return

    let walletAddress = account

    if (sender) {
      walletAddress = sender
    }

    const balance = await tokenContract.balanceOf(walletAddress)
    const exactBalance = ethers.utils.formatUnits(balance, tokenDecimals)

    setTokenBalance(exactBalance)
  }

  const makeDeposit = () => {
    const tokenId = (secTokens[cid ?? ''] as any)?.tokenInfo?.id
    if (tokenId && !error && parsedAmount && !inputError && computedAddress) {
      deposit({
        id: tokenId,
        amount: `${parsedAmount.toExact()}`,
        fromAddress: computedAddress || '',
      })
    }
  }

  const onClick = () => {
    handleIsWarningOpen(true)
  }

  useEffect(() => {
    if (networkName) {
      onNetworkSet(networkName)
    }
  }, [onNetworkSet, networkName])

  useEffect(() => {
    const id = currencyId(currency)
    onCurrencySet(id)
  }, [currency, onCurrencySet])

  const closeWarning = () => {
    handleIsWarningOpen(false)
    makeDeposit()
  }

  const onTypeAmountInternal = (typedValue: any) => {
    onTypeAmount(typedValue)
    setAmountInputValue(typedValue)
  }

  useEffect(() => {
    fetchTokenBalance()
  }, [account, tokenContract, sender, tokenDecimals])

  return (
    <div style={{ position: 'relative' }}>
      {isWarningOpen && (
        <DepositWarningModal networkName={networkName} symbol={currency?.originalSymbol} close={closeWarning} />
      )}
      <Column style={{ gap: '25px', marginTop: '16px' }}>
        <BlueGreyCard>
          <Column style={{ gap: '11px' }}>
            <Row justify="space-between">
              <TYPE.title11>
                <Trans>I want to deposit:</Trans>
              </TYPE.title11>

              <TYPE.title11>
                <Trans>Balance: {formatNumberWithDecimals(tokenBalance, 3, true)}</Trans>
              </TYPE.title11>
            </Row>
            <AmountInput
              token={token}
              currency={currency}
              originalDecimals={tokenInfo.originalDecimals}
              value={amount ?? amountInputValue}
              onUserInput={onTypeAmountInternal}
              amount={parsedAmount}
            />
          </Column>
          <Column style={{ marginTop: '16px', gap: '11px' }}>
            <Row>
              <TYPE.body1 style={{ display: 'flex' }}>
                <Trans>
                  From my&nbsp;<TYPE.body1>{`${networkName || ''} wallet:`}</TYPE.body1>
                </Trans>
              </TYPE.body1>
            </Row>
            <AddressInput
              {...{ id: 'sender-input', value: sender || account, error, onChange: onTypeSender }}
              placeholder={`Paste your ${networkName || ''} wallet`}
            />
          </Column>
          <Column style={{ margin: '12px 0px', width: '60%' }}>
            <Row>
              <TYPE.description2 color="#B8B8CC" fontSize="11px" fontWeight="400">
                <Trans>
                  Please provide sender’s address in order to approve this transaction. Other addresses will be
                  rejected.
                </Trans>
              </TYPE.description2>
            </Row>
          </Column>
          <Line />
        </BlueGreyCard>
      </Column>
      <ArrowWrapper>
        <DownArrow />
      </ArrowWrapper>
      <Column style={{ gap: '25px', marginTop: '10px' }}>
        <BlueGreyCard>
          <Column style={{ gap: '11px' }}>
            <RowBetween>
              <TYPE.body1>
                <Trans>{`You will get wrapped ${currency?.originalSymbol || currency?.symbol}:`}</Trans>
              </TYPE.body1>
              <HideSmall style={{ cursor: 'pointer' }}>
                <TYPE.description2 color="#6666FF" onClick={showAboutWrapping}>
                  About Wrapping
                </TYPE.description2>
              </HideSmall>
            </RowBetween>
            <AmountInput
              token={token}
              currency={currency}
              originalDecimals={tokenInfo.originalDecimals}
              // value={amount ? `${amount} ${currency?.symbol || currency?.originalSymbol}` : ''}
              value={amount ? amount : ''}
              onUserInput={onTypeAmount}
              amount={parsedAmount}
              // rightItem={
              //   <>
              //     <SmallOnly>
              //       <ButtonText onClick={showAboutWrapping}>
              //         <img src={info} alt="info icon" width="20px" height="20px" />
              //       </ButtonText>
              //     </SmallOnly>
              //   </>
              // }
            />
          </Column>
          <Column style={{ marginTop: '20px', marginBottom: '10px', gap: '11px' }}>
            <Row>
              <TYPE.body1>
                <Trans>{`To your ${capitalizeFirstLetter(networkName)} wallet`}</Trans>
              </TYPE.body1>
            </Row>
            <AddressInput
              {...{
                id: 'sender-input',
                value: shortAddress(account || ''),
                error,
                onChange: onTypeSender,
                disabled: true,
                placeholder: `Paste your ${capitalizeFirstLetter(networkName || '')} wallet`,
              }}
            />
          </Column>
        </BlueGreyCard>
      </Column>
      <Row style={{ marginTop: '4px', marginBottom: '8px' }}>
        <PinnedContentButton style={{ textTransform: 'unset' }} disabled={!!inputError} onClick={onClick}>
          {inputError ?? <Trans>Create deposit request</Trans>}
        </PinnedContentButton>
      </Row>
    </div>
  )
}

import { Trans } from '@lingui/macro'
import { AddressInput } from 'components/AddressInputPanel/AddressInput'
import { ButtonIXSWide } from 'components/Button'
import { TipCard } from 'components/Card'
import Column, { ColumnCenter } from 'components/Column'
import Row, { RowFixed } from 'components/Row'
import { testTokens, TGE_CHAINS_WITH_SWAP } from 'constants/addresses'
import { useActiveWeb3React } from 'hooks/web3'
import AppBody from 'pages/AppBody'
import React, { useState } from 'react'
import { useAddPopup } from 'state/application/hooks'
import { useDistributeToken } from 'state/faucet/hooks'
import { useTransactionAdder } from 'state/transactions/hooks'
import { ExternalLink, StyledPageHeader, TYPE } from 'theme'
import { shortAddress } from 'utils'
import { FaucetTokenDropdown } from './FaucetTokenDropdown'

export interface IFaucetToken {
  name: string
  symbol: string
  address: string
}

export default function Faucet() {
  const { account, chainId } = useActiveWeb3React()
  const [selectedToken, setSelectedToken] = useState<IFaucetToken>(testTokens[0])
  const distributeToken = useDistributeToken(selectedToken.address)
  const addPopup = useAddPopup()
  const addTransaction = useTransactionAdder()

  const handleSubmitClicked = async () => {
    const { transaction, minutesToWait }: any = await distributeToken()

    if (transaction) {
      addTransaction(
        { ...transaction, hash: transaction.transactionHash },
        {
          summary: `Sent 10 ${selectedToken.symbol} to ${shortAddress(transaction.from || '')}`,
        }
      )
    } else {
      addPopup({
        info: {
          success: false,
          summary: `You have to wait ${minutesToWait} ${minutesToWait === 1 ? 'minute' : 'minutes'}`,
        },
      })
    }
  }

  const blurred = chainId !== undefined && !TGE_CHAINS_WITH_SWAP.includes(chainId)

  return (
    <>
      <ColumnCenter>
        {!blurred && (
          <TipCard style={{ maxWidth: '592px' }} padding="1rem 36px">
            <TYPE.body1>
              In order to get tokens, you must have Еthereum on Kovan. You can get some in the following faucets:
            </TYPE.body1>

            <Column style={{ gap: '10px', marginTop: '5px' }}>
              <ExternalLink style={{ fontSize: '14px' }} href="https://faucets.chain.link/kovan">
                - https://faucets.chain.link/kovan
              </ExternalLink>

              <ExternalLink style={{ fontSize: '14px' }} href="https://ethdrop.dev/">
                - https://ethdrop.dev
              </ExternalLink>
            </Column>
          </TipCard>
        )}

        <AppBody blurred={blurred}>
          <StyledPageHeader>
            <RowFixed>
              <TYPE.black fontWeight={600} fontSize={22} style={{ marginRight: '8px' }}>
                <Trans>Get Test Tokens</Trans>
              </TYPE.black>
            </RowFixed>
          </StyledPageHeader>
          <TYPE.body3>
            <Trans>This faucet transfers test tokens on Kovan testnet. Confirm details before submitting.</Trans>
          </TYPE.body3>

          <TYPE.body3>
            <Trans>You will receive 10 {selectedToken.name} tokens. The request can be repeated once every hour.</Trans>
          </TYPE.body3>

          <Column style={{ marginTop: '45px', gap: '11px' }}>
            <Row>
              <TYPE.body1>
                <Trans>Select token</Trans>
              </TYPE.body1>
            </Row>
            <FaucetTokenDropdown selectedToken={selectedToken} onSelect={setSelectedToken} />
          </Column>

          <Column style={{ marginTop: '22px', gap: '11px' }}>
            <Row>
              <TYPE.body1>
                <Trans>Wallet Address</Trans>
              </TYPE.body1>
            </Row>
            <AddressInput
              {...{
                id: 'sender-input',
                value: shortAddress(account ?? ''),
                disabled: true,
                placeholder: 'Paste your wallet',
                error: !account,
              }}
            />
          </Column>

          <ButtonIXSWide marginTop="33px" onClick={handleSubmitClicked}>
            <Trans>Submit</Trans>
          </ButtonIXSWide>
        </AppBody>
      </ColumnCenter>
    </>
  )
}

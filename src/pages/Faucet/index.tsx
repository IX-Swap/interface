import React, { useState } from 'react'

import Column from 'components/Column'
import { useActiveWeb3React } from 'hooks/web3'
import AppBody from 'pages/AppBody'
import { testTokens, TGE_CHAINS_WITH_SWAP } from 'constants/addresses'
import { StyledPageHeader, TYPE } from 'theme'
import Row, { RowFixed } from 'components/Row'
import { Trans } from '@lingui/macro'
import { ButtonIXSWide } from 'components/Button'
import { AddressInput } from 'components/AddressInputPanel/AddressInput'
import { FaucetTokenDropdown } from './FaucetTokenDropdown'
import { useDistributeToken } from 'state/faucet/hooks'
import { shortAddress } from 'utils'
import { useAddPopup } from 'state/application/hooks'

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

  const handleSubmitClicked = async () => {
    const { transaction, minutesToWait }: any = await distributeToken()

    addPopup(
      transaction
        ? {
            txn: {
              ...transaction,
              hash: transaction.transactionHash,
              summary: `Sent 10 ${selectedToken.symbol} to ${shortAddress(transaction.to || '')}`,
            },
          }
        : {
            info: {
              success: false,
              summary: `You have to wait ${minutesToWait} ${minutesToWait === 1 ? 'minute' : 'minutes'}`,
            },
          }
    )
  }

  return (
    <>
      <AppBody blurred={chainId !== undefined && !TGE_CHAINS_WITH_SWAP.includes(chainId)}>
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
    </>
  )
}

import React, { useState } from 'react'
import Column, { ColumnCenter } from 'components/Column'
import { useActiveWeb3React } from 'hooks/web3'
import AppBody from 'pages/AppBody'
import { TGE_CHAINS_WITH_SWAP } from 'constants/addresses'
import { StyledPageHeader, TYPE } from 'theme'
import Row, { RowBetween, RowFixed } from 'components/Row'
import { Trans } from '@lingui/macro'
import { ButtonIXSWide } from 'components/Button'
import { AddressInput } from 'components/AddressInputPanel/AddressInput'
import { useDepositActionHandlers, useDepositState } from 'state/deposit/hooks'
import useENS from 'hooks/useENS'
import { FaucetTokenDropdown } from './FaucetTokenDropdown'

export default function Faucet() {
  const { chainId } = useActiveWeb3React()
  const [selectedToken, setSelectedToken] = useState('Apple')
  const { sender } = useDepositState()
  const { onTypeSender } = useDepositActionHandlers()
  const { address, loading } = useENS(sender)
  const error = Boolean(sender.length > 0 && !address && !loading)

  return (
    <>
      <AppBody blurred={chainId !== undefined && !TGE_CHAINS_WITH_SWAP.includes(chainId)}>
        {/* <ColumnCenter style={{ paddingBottom: '26px' }}> */}
        <StyledPageHeader>
          <RowFixed>
            <TYPE.black fontWeight={600} fontSize={22} style={{ marginRight: '8px' }}>
              <Trans>Get Test Tokens</Trans>
            </TYPE.black>
          </RowFixed>
        </StyledPageHeader>
        <TYPE.body3>
          <Trans>
            This faucet transfers TestToken on Matic testnets and parent chain. Confirm details before submitting.
          </Trans>
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
            {...{ id: 'sender-input', value: sender ?? '', error, onChange: onTypeSender }}
            placeholder="Paste your wallet"
          />
        </Column>

        <ButtonIXSWide
          marginTop="33px"
          onClick={() => {
            console.log('privet')
          }}
        >
          <Trans>Submit</Trans>
        </ButtonIXSWide>
        {/* </ColumnCenter> */}
      </AppBody>
    </>
  )
}

import { t, Trans } from '@lingui/macro'
import { AddressInput } from 'components/AddressInputPanel/AddressInput'
import { ButtonGradient, ButtonIXSWide } from 'components/Button'
import { TipCard } from 'components/Card'
import Column, { ColumnCenter } from 'components/Column'
import Row, { RowFixed } from 'components/Row'
import { WarningCard } from 'components/WarningCard'
import { testStableCoinsTokens, TGE_CHAINS_WITH_SWAP } from 'constants/addresses'
import { useCurrency } from 'hooks/Tokens'
import useAddTokenToMetamask from 'hooks/useAddTokenToMetamask'
import { useActiveWeb3React } from 'hooks/web3'
import AppBody from 'pages/AppBody'
import { Dots } from 'pages/Pool/styleds'
import React, { useState } from 'react'
import { useDistributeToken, useFaucetState } from 'state/faucet/hooks'
import { ExternalLink, StyledPageHeader, TYPE } from 'theme'
import { shortAddress } from 'utils'
import { FaucetTokenDropdown } from './FaucetTokenDropdown'

export interface IFaucetToken {
  name: string
  symbol: string
  address: string
  contractAddress?: string
}

enum FaucetStates {
  INITAL,
  SUCCESS,
  ERROR,
}

export default function Faucet() {
  const { account, chainId, library } = useActiveWeb3React()
  const [selectedToken, setSelectedToken] = useState<IFaucetToken>(testStableCoinsTokens[0])
  const distributeToken = useDistributeToken(selectedToken)
  const selectedCurrency = useCurrency(selectedToken.address)
  const addCurrency = useAddTokenToMetamask(selectedCurrency ?? undefined)
  const isStableCoin = testStableCoinsTokens.filter((token) => token.address === selectedToken.address).length > 0
  const [success, setSuccess] = useState(FaucetStates.INITAL)
  const { loadingFaucet } = useFaucetState()
  const handleSubmitClicked = async () => {
    const result = await distributeToken()
    if (result?.transaction) {
      setSuccess(FaucetStates.SUCCESS)
    } else {
      setSuccess(FaucetStates.ERROR)
    }
  }

  const onSelectToken = (token: IFaucetToken) => {
    setSuccess(FaucetStates.INITAL)
    setSelectedToken(token)
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
                <Trans>Get IXSwap Playground Test Tokens</Trans>
              </TYPE.black>
            </RowFixed>
          </StyledPageHeader>
          <WarningCard
            style={{ padding: '15px 10px', marginBottom: '10px' }}
            message={t`These tokens are fake, they were made only for testing IXSwap Playground on Kovan`}
          />
          <TYPE.body3>
            <Trans>This faucet transfers test tokens on Kovan testnet. Confirm details before submitting.</Trans>
          </TYPE.body3>

          <TYPE.body3>
            <Trans>
              You will receive {isStableCoin ? '100' : '10'} {selectedToken.name} tokens. The request can be repeated
              once every hour.
            </Trans>
          </TYPE.body3>
          <Column style={{ marginTop: '25px', gap: '11px' }}>
            <Row>
              <TYPE.body1>
                <Trans>Select token</Trans>
              </TYPE.body1>
            </Row>
            <FaucetTokenDropdown selectedToken={selectedToken} onSelect={onSelectToken} />
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
          <Column style={{ marginTop: '20px' }}>
            {selectedCurrency && library?.provider?.isMetaMask && (
              <ButtonGradient
                style={{ cursor: 'pointer' }}
                onClick={() => !addCurrency.success && addCurrency.addToken()}
              >
                {!addCurrency.success ? (
                  <Trans>
                    Add {selectedToken.name} ({selectedToken.symbol}) to Metamask
                  </Trans>
                ) : (
                  <Trans>Added!</Trans>
                )}
              </ButtonGradient>
            )}
          </Column>
          <ButtonIXSWide marginTop="20px" onClick={handleSubmitClicked} disabled={loadingFaucet}>
            {success === FaucetStates.INITAL && !loadingFaucet && <Trans>Submit</Trans>}
            {loadingFaucet && (
              <Trans>
                <Dots>Loading</Dots>
              </Trans>
            )}
            {success === FaucetStates.SUCCESS && !loadingFaucet && <Trans>Success!</Trans>}
            {success === FaucetStates.ERROR && !loadingFaucet && <Trans>Error. Please try again later</Trans>}
          </ButtonIXSWide>
        </AppBody>
      </ColumnCenter>
    </>
  )
}

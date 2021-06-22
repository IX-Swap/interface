import { Currency, CurrencyAmount, Ether, Token } from '@ixswap1/sdk-core'
import { Trans } from '@lingui/macro'
import FullPositionCard from 'components/PositionCard'
import { TipWithMessage } from 'components/TipWithMessage'
import JSBI from 'jsbi'
import React, { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { Text } from 'rebass'
import { AutoColumn, ColumnCenter } from '../../components/Column'
import { FindPoolTabs } from '../../components/NavigationTabs'
import CurrencySearchModal from '../../components/SearchModal/CurrencySearchModal'
import { PairState, useV2Pair } from '../../hooks/useV2Pairs'
import { useActiveWeb3React } from '../../hooks/web3'
import { usePairAdder } from '../../state/user/hooks'
import { useTokenBalance } from '../../state/wallet/hooks'
import { StyledInternalLink } from '../../theme'
import { currencyId } from '../../utils/currencyId'
import AppBody from '../AppBody'
import { Dots } from '../Pool/styleds'
import { Fields } from './enums'
import { LightMessage } from './LightMessage'
import { PrerequisiteMessage } from './PrerequisiteMessage'
import { SelectCurrency } from './SelectCurrency'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

export default function PoolFinder() {
  const query = useQuery()
  const { account, chainId } = useActiveWeb3React()

  const [showSearch, setShowSearch] = useState<boolean>(false)
  const [activeField, setActiveField] = useState<number>(Fields.TOKEN1)

  const [currency0, setCurrency0] = useState<Currency | null>(() => (chainId ? Ether.onChain(chainId) : null))
  const [currency1, setCurrency1] = useState<Currency | null>(null)

  const [pairState, pair] = useV2Pair(currency0 ?? undefined, currency1 ?? undefined)
  const addPair = usePairAdder()
  useEffect(() => {
    if (pair) {
      addPair(pair)
    }
  }, [pair, addPair])

  const validPairNoLiquidity: boolean =
    pairState === PairState.NOT_EXISTS ||
    Boolean(
      pairState === PairState.EXISTS &&
        pair &&
        JSBI.equal(pair.reserve0.quotient, JSBI.BigInt(0)) &&
        JSBI.equal(pair.reserve1.quotient, JSBI.BigInt(0))
    )

  const position: CurrencyAmount<Token> | undefined = useTokenBalance(account ?? undefined, pair?.liquidityToken)
  const hasPosition = Boolean(position && JSBI.greaterThan(position.quotient, JSBI.BigInt(0)))

  const chooseToken = useCallback((field: Fields) => {
    setShowSearch(true)
    setActiveField(field)
  }, [])

  const handleCurrencySelect = useCallback(
    (currency: Currency) => {
      if (activeField === Fields.TOKEN0) {
        setCurrency0(currency)
      } else {
        setCurrency1(currency)
      }
    },
    [activeField]
  )

  const handleSearchDismiss = useCallback(() => {
    setShowSearch(false)
  }, [setShowSearch])

  return (
    <>
      <TipWithMessage
        message={<Trans>Use this tool to find pairs that don&apos;t automatically appear in the interface.</Trans>}
      />
      <AppBody>
        <FindPoolTabs origin={query.get('origin') ?? '/pool'} />
        <AutoColumn style={{ padding: '1rem' }} gap="md">
          <SelectCurrency {...{ currency0, currency1, chooseToken }} />

          {hasPosition && (
            <ColumnCenter
              style={{ justifyItems: 'center', backgroundColor: '', padding: '12px 0px', borderRadius: '12px' }}
            >
              <Text textAlign="center" fontWeight={500}>
                <Trans>Pool Found!</Trans>
              </Text>
              <StyledInternalLink to={`/pool`}>
                <Text textAlign="center">
                  <Trans>Manage this pool.</Trans>
                </Text>
              </StyledInternalLink>
            </ColumnCenter>
          )}

          {currency0 && currency1 ? (
            pairState === PairState.EXISTS ? (
              hasPosition && pair ? (
                <FullPositionCard pair={pair} />
              ) : (
                <LightMessage>
                  <AutoColumn gap="sm" justify="center">
                    <Text textAlign="center">
                      <Trans>You don’t have liquidity in this pool yet</Trans>
                    </Text>
                    <StyledInternalLink to={`/add/${currencyId(currency0)}/${currencyId(currency1)}`}>
                      <Text textAlign="center">
                        <Trans>Add liquidity</Trans>
                      </Text>
                    </StyledInternalLink>
                  </AutoColumn>
                </LightMessage>
              )
            ) : validPairNoLiquidity ? (
              <LightMessage>
                <AutoColumn gap="sm" justify="center">
                  <Text textAlign="center">
                    <Trans>No pool found</Trans>
                  </Text>
                  <StyledInternalLink to={`/add/${currencyId(currency0)}/${currencyId(currency1)}`}>
                    <Trans>Create pool</Trans>
                  </StyledInternalLink>
                </AutoColumn>
              </LightMessage>
            ) : pairState === PairState.INVALID ? (
              <LightMessage>
                <Trans>Invalid pair</Trans>
              </LightMessage>
            ) : pairState === PairState.LOADING ? (
              <LightMessage>
                <Trans>
                  <Dots>Loading</Dots>
                </Trans>
              </LightMessage>
            ) : null
          ) : (
            <PrerequisiteMessage account={account} />
          )}
        </AutoColumn>

        <CurrencySearchModal
          isOpen={showSearch}
          onCurrencySelect={handleCurrencySelect}
          onDismiss={handleSearchDismiss}
          showCommonBases
          selectedCurrency={(activeField === Fields.TOKEN0 ? currency1 : currency0) ?? undefined}
        />
      </AppBody>
    </>
  )
}

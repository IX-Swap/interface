import { Currency, CurrencyAmount, Ether, Token } from '@ixswap1/sdk-core'
import { Trans } from '@lingui/macro'
import { ButtonGradient } from 'components/Button'
import { EmptyStateInfoCard } from 'components/Card'
import FullPositionCard from 'components/PositionCard'
import { TipWithMessage } from 'components/TipWithMessage'
import useTheme from 'hooks/useTheme'
import JSBI from 'jsbi'
import React, { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import { Text } from 'rebass'
import Column, { AutoColumn } from '../../components/Column'
import { FindPoolTabs } from '../../components/NavigationTabs'
import CurrencySearchModal from '../../components/SearchModal/CurrencySearchModal'
import { PairState, useV2Pair } from '../../hooks/useV2Pairs'
import { useActiveWeb3React } from '../../hooks/web3'
import { usePairAdder } from '../../state/user/hooks'
import { useTokenBalance } from '../../state/wallet/hooks'
import { SemiTransparent, StyledInternalLink, TYPE } from '../../theme'
import { currencyId } from '../../utils/currencyId'
import AppBody from '../AppBody'
import { Dots } from '../Pool/styleds'
import { Fields } from './enums'
import { PrerequisiteMessage } from './PrerequisiteMessage'
import { SelectCurrency } from './SelectCurrency'
import { FoundPoolWrapper, PoolStateColumn, SelectCurrencyContainer } from './styleds'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}
const bodyProps = {
  padding: '0',
  paddingXS: '0',
}

export default function PoolFinder() {
  const query = useQuery()
  const theme = useTheme()
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
  const currenciesExist = currency0 && currency1
  const poolFound = currenciesExist && pairState === PairState.EXISTS && hasPosition && pair
  const noLiquidityInPool = currenciesExist && pairState === PairState.EXISTS && !(hasPosition && pair)
  const noPool = currenciesExist && !(pairState === PairState.EXISTS) && validPairNoLiquidity
  const invalidPair = currenciesExist && !(pairState === PairState.EXISTS) && pairState === PairState.INVALID
  const loadingPair = currenciesExist && !(pairState === PairState.EXISTS) && pairState === PairState.LOADING
  const prerequesiteState = !currenciesExist
  return (
    <>
      <TipWithMessage
        message={<Trans>Use this tool to find pairs that don&apos;t automatically appear in the interface.</Trans>}
      />
      <AppBody {...bodyProps}>
        <FindPoolTabs origin={query.get('origin') ?? '/pool'} />
        <AutoColumn>
          <SelectCurrencyContainer gap="md">
            <SelectCurrency {...{ currency0, currency1, chooseToken }} />
          </SelectCurrencyContainer>
          {poolFound && pair && (
            <FoundPoolWrapper>
              <Column>
                <TYPE.title9>
                  <Trans>Pool Found!</Trans>
                </TYPE.title9>
                <StyledInternalLink to={`/pool`}>
                  <SemiTransparent>
                    <Text fontSize={12} lineHeight={'18px'}>
                      <Trans>Manage this Pool</Trans>
                    </Text>
                  </SemiTransparent>
                </StyledInternalLink>
              </Column>
              <FullPositionCard pair={pair} />
            </FoundPoolWrapper>
          )}
          {!poolFound && !prerequesiteState && currency0 && currency1 && (
            <PoolStateColumn>
              {noLiquidityInPool && (
                <EmptyStateInfoCard>
                  <TYPE.title9 fontWeight={500}>
                    <Trans>You don’t have liquidity in this pool yet</Trans>
                  </TYPE.title9>
                  <ButtonGradient style={{ width: '214px' }}>
                    <Link to={`/add/${currencyId(currency0)}/${currencyId(currency1)}`} style={{ color: theme.text1 }}>
                      <Trans>Add liquidity</Trans>
                    </Link>
                  </ButtonGradient>
                </EmptyStateInfoCard>
              )}
              {noPool && currency0 && currency1 && (
                <EmptyStateInfoCard>
                  <TYPE.title9 fontWeight={500}>
                    <Trans>No pool found</Trans>
                  </TYPE.title9>
                  <ButtonGradient style={{ width: '214px' }}>
                    <Link to={`/add/${currencyId(currency0)}/${currencyId(currency1)}`} style={{ color: theme.text1 }}>
                      <Trans>Create pool</Trans>
                    </Link>
                  </ButtonGradient>
                </EmptyStateInfoCard>
              )}
              {invalidPair && (
                <EmptyStateInfoCard>
                  <Trans>Invalid pair</Trans>
                </EmptyStateInfoCard>
              )}
              {loadingPair && (
                <EmptyStateInfoCard>
                  <Trans>
                    <Dots>Loading</Dots>
                  </Trans>
                </EmptyStateInfoCard>
              )}
            </PoolStateColumn>
          )}
          {prerequesiteState && <PrerequisiteMessage account={account} />}
        </AutoColumn>

        <CurrencySearchModal
          isOpen={showSearch}
          onCurrencySelect={handleCurrencySelect}
          onDismiss={handleSearchDismiss}
          showCommonBases={false}
          selectedCurrency={(activeField === Fields.TOKEN0 ? currency1 : currency0) ?? undefined}
        />
      </AppBody>
    </>
  )
}

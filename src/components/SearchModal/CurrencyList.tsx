import { Currency, CurrencyAmount, Token } from '@ixswap1/sdk-core'
import { Trans } from '@lingui/macro'
import { VioletCard } from 'components/Card'
import QuestionHelper from 'components/QuestionHelper'
import { AccreditationStatusEnum } from 'components/Vault/enum'
import useTheme from 'hooks/useTheme'
import React, { CSSProperties, MutableRefObject, useCallback, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { VariableSizeList as List } from 'react-window'
import { Box, Text } from 'rebass'
import _get from 'lodash/get'

import { useSecTokens } from 'state/secTokens/hooks'
import { useUserSecTokens } from 'state/user/hooks'
import styled, { css } from 'styled-components/macro'
import { routes } from 'utils/routes'
import TokenListLogo from '../../assets/svg/tokenlist.svg'
import { useIsUserAddedToken } from '../../hooks/Tokens'
import { useActiveWeb3React } from '../../hooks/web3'
import { useCombinedActiveList } from '../../state/lists/hooks'
import { WrappedTokenInfo } from '../../state/lists/wrappedTokenInfo'
import { useCurrencyBalance } from '../../state/wallet/hooks'
import { TYPE } from '../../theme'
import { isTokenOnList } from '../../utils'
import Column from '../Column'
import CurrencyLogo from '../CurrencyLogo'
import Loader from '../Loader'
import Row, { RowBetween, RowFixed } from '../Row'
import { MouseoverTooltip } from '../Tooltip'
import ImportRow from './ImportRow'
import { isMobile } from 'react-device-detect'
import { useWhitelabelState } from 'state/whitelabel/hooks'

import { MenuItem, UnapprovedMenuItem, UnapprovedTokenWrapper } from './styleds'
import { formatAmount } from 'utils/formatCurrencyAmount'

type CurrencySec = Currency & { isSecToken?: boolean }

function currencyKey(currency: Currency): string {
  return currency?.isToken ? currency.address : 'ETHER'
}
const StyledBalanceText = styled(Text)`
  ${({ theme: { config } }) =>
    config.text &&
    css`
      color: ${({ theme: { config } }) => config.text.main};
    `}
  white-space: nowrap;
  overflow: hidden;
  max-width: 100%;
  text-overflow: ellipsis;
`

const Tag = styled.div`
  background-color: ${({ theme }) => theme.bg3};
  color: ${({ theme }) => theme.text2};
  font-size: 14px;
  border-radius: 4px;
  padding: 0.25rem 0.3rem 0.25rem 0.3rem;
  max-width: 6rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  justify-self: flex-end;
  margin-right: 4px;
`

const FixedContentRow = styled.div`
  padding: 4px 20px;
  height: 56px;
  display: grid;
  grid-gap: 16px;
  align-items: center;
`

const UNAPPROVED_ROW = isMobile ? 78 : 76
const NORMAL_ROW = isMobile ? 68 : 66
const BREAK_HEIGHT = 36
function Balance({ balance }: { balance: CurrencyAmount<Currency> }) {
  return <StyledBalanceText title={balance.toExact()}>{formatAmount(+balance.toSignificant(4))}</StyledBalanceText>
}

const TagContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`

const TokenListLogoWrapper = styled.img`
  height: 20px;
`

function TokenTags({ currency }: { currency: Currency }) {
  if (!(currency instanceof WrappedTokenInfo)) {
    return <span />
  }

  const tags = currency.tags
  if (!tags || tags.length === 0) return <span />

  const tag = tags[0]

  return (
    <TagContainer>
      <MouseoverTooltip text={tag.description}>
        <Tag key={tag.id}>{tag.name}</Tag>
      </MouseoverTooltip>
      {tags.length > 1 ? (
        <MouseoverTooltip
          text={tags
            .slice(1)
            .map(({ name, description }) => `${name}: ${description}`)
            .join('; \n')}
        >
          <Tag>...</Tag>
        </MouseoverTooltip>
      ) : null}
    </TagContainer>
  )
}

function CurrencyRow({
  currency,
  onSelect,
  isSelected,
  otherSelected,
  isUnapprovedSecToken,
  style,
}: {
  currency: Currency
  onSelect: () => void
  isSelected: boolean
  otherSelected: boolean
  isUnapprovedSecToken: boolean
  style: CSSProperties
}) {
  const { account } = useActiveWeb3React()
  const key = currencyKey(currency)
  const selectedTokenList = useCombinedActiveList()
  const isOnSelectedList = isTokenOnList(selectedTokenList, currency?.isToken ? currency : undefined)
  const customAdded = useIsUserAddedToken(currency)
  const balance = useCurrencyBalance(account ?? undefined, currency)
  // only show add or remove buttons if not on selected list
  const unapprovedSecToken = useMemo(() => {
    if (!isUnapprovedSecToken) return null
    return (
      <Row
        style={{
          position: 'relative',
          height: '100%',
          alignItems: 'center',
          border: isMobile ? '1px solid #E6E6FF' : 'none',
          background: isMobile ? '#F7F7F7' : 'none',
        }}
      >
        <UnapprovedTokenWrapper
          as={Link}
          to={routes.securityToken((currency as any).tokenInfo.catalogId)}
          data-testid="currency-search-sec-token-info"
        >
          <CurrencyLogo currency={currency} size={'24px'} />
          <Column style={{ marginLeft: '8px' }}>
            <div>
              <Text color={'#292933'} title={currency.name} fontWeight={500}>
                {currency.symbol}
              </Text>
              <TYPE.darkGray ml="0px" fontSize={'13px'} fontWeight={500} color={'#B8B8CC'}>
                {!currency.isNative && !isOnSelectedList && customAdded ? (
                  <Trans>{currency.name} • Added by user</Trans>
                ) : (
                  currency.name
                )}
              </TYPE.darkGray>
            </div>
            <RowFixed>
              {/* <SvgIconWrapper size={20} style={{ marginLeft: '-6px' }}>
                <img src={Attention} alt={'Attention'} />
              </SvgIconWrapper> */}
              <TYPE.popOver color="#FF6060" fontSize={"11px"}>
                <Trans>Needs accreditation</Trans>
              </TYPE.popOver>
            </RowFixed>
          </Column>
          <Column>
            <Box width="100%">
              <Text color="#6666FF" textAlign="right">
                <Trans>Info</Trans>
              </Text>
            </Box>
          </Column>
        </UnapprovedTokenWrapper>
      </Row>
    )
  }, [currency, isUnapprovedSecToken, customAdded, isOnSelectedList])
  const tokenDetails = useMemo(() => {
    if (isUnapprovedSecToken) return null
    return (
      <>
        <CurrencyLogo currency={currency} size={'24px'} />
        <Column>
          <Text title={currency.name} fontWeight={500}>
            {currency.symbol}
          </Text>
          <TYPE.darkGray ml="0px" fontSize={'12px'} fontWeight={500} color={'#B8B8CC'}>
            {!currency.isNative && !isOnSelectedList && customAdded ? (
              <Trans>{currency.name} • Added by user</Trans>
            ) : (
              currency.name
            )}
          </TYPE.darkGray>
        </Column>
        <TokenTags currency={currency} />
        <RowFixed style={{ justifySelf: 'flex-end', width: '100%' }}>
          {balance ? <Balance balance={balance} /> : account ? <Loader /> : null}
        </RowFixed>
      </>
    )
  }, [account, balance, currency, customAdded, isOnSelectedList, isUnapprovedSecToken])
  const onClick = useCallback(() => {
    if (isSelected || isUnapprovedSecToken) {
      return
    }
    onSelect()
  }, [isSelected, onSelect, isUnapprovedSecToken])
  if (isUnapprovedSecToken) {
    return (
      <UnapprovedMenuItem
        style={style}
        className={`token-item-${key}`}
        onClick={() => onClick()}
        disabled={isSelected}
        selected={otherSelected}
      >
        {unapprovedSecToken}
      </UnapprovedMenuItem>
    )
  }
  return (
    <MenuItem
      style={style}
      className={`token-item-${key}`}
      onClick={() => onClick()}
      disabled={isSelected}
      selected={otherSelected}
    >
      {tokenDetails}
    </MenuItem>
  )
}

const BREAK_LINE = 'BREAK'
type BreakLine = typeof BREAK_LINE
function isBreakLine(x: unknown): x is BreakLine {
  return x === BREAK_LINE
}

function BreakLineComponent({ style }: { style: CSSProperties }) {
  const theme = useTheme()
  return (
    <FixedContentRow style={style}>
      <VioletCard padding="8px 12px" borderRadius="8px">
        <RowBetween>
          <RowFixed>
            <TokenListLogoWrapper src={TokenListLogo} />
            <TYPE.main ml="6px" fontSize="12px" color={theme.text1}>
              <Trans>Expanded results from inactive Token Lists</Trans>
            </TYPE.main>
          </RowFixed>
          <QuestionHelper
            text={
              <Trans>
                Tokens from inactive lists. Import specific tokens below or click Manage to activate more lists.
              </Trans>
            }
          />
        </RowBetween>
      </VioletCard>
    </FixedContentRow>
  )
}

export default function CurrencyList({
  height,
  currencies,
  otherListTokens,
  selectedCurrency,
  onCurrencySelect,
  otherCurrency,
  listRef,
  showImportView,
  setImportToken,
}: {
  height: number
  currencies: Currency[]
  otherListTokens?: WrappedTokenInfo[]
  selectedCurrency?: Currency | null
  onCurrencySelect: (currency: Currency) => void
  otherCurrency?: Currency | null
  listRef?: MutableRefObject<List | undefined>
  showImportView: () => void
  setImportToken: (token: Token) => void
}) {
  const { config } = useWhitelabelState()
  const isIxswap = config?.isIxSwap ?? false

  const sortedBySecList = useMemo(() => {
    const { sec, rest, wixs, usdc } = currencies.reduce(
      (
        acc: {
          sec: CurrencySec[]
          rest: CurrencySec[]
          wixs: CurrencySec
          usdc: CurrencySec
        },
        next: any
      ) => {
        const token = next?.wrapped ?? next?.tokenInfo
        const configTokens = config?.tokens || []
        const id = _get(token, 'tokenInfo.id', '')

        if (next.isSecToken) {
          if (isIxswap) {
            acc.sec.push(next)
          } else if (config && configTokens.length > 0 && configTokens.includes(id)) {
            acc.sec.push(next)
          }
        } else if (next?.tokenInfo?.symbol === 'USDC') {
          acc.usdc = next
        } else if (['WIXS', 'IXS'].includes(next?.tokenInfo?.symbol || '')) {
          acc.wixs = next
        } else {
          acc.rest.push(next)
        }

        return acc
      },
      {
        sec: [],
        rest: [],
        wixs: {} as CurrencySec,
        usdc: {} as CurrencySec,
      }
    )

    return [...sec, ...(Object.keys(wixs).length ? [wixs] : []), ...(Object.keys(usdc).length ? [usdc] : []), ...rest]
  }, [currencies])

  const itemData: (Currency | BreakLine)[] = useMemo(() => {
    if (otherListTokens && otherListTokens?.length > 0) {
      return [...sortedBySecList, BREAK_LINE, ...otherListTokens]
    }

    return sortedBySecList
  }, [sortedBySecList, otherListTokens])

  const { secTokens: userSecTokens } = useUserSecTokens()
  const { secTokens } = useSecTokens()

  const Row = useCallback(
    function TokenRow({ data, index, style }: any) {
      const row: Currency | BreakLine = data[index]

      // Define a border style for the bottom of each row
      const borderBottomStyle = {
        borderBottom: '1px solid #E6E6FF',
      }

      if (isBreakLine(row)) {
        return <BreakLineComponent style={{ ...style, ...borderBottomStyle }} />
      }

      const currency = row
      const isSelected = Boolean(currency && selectedCurrency && selectedCurrency.equals(currency))
      const otherSelected = Boolean(currency && otherCurrency && otherCurrency.equals(currency))
      const handleSelect = () => currency && onCurrencySelect(currency)

      const showImport = index > sortedBySecList.length
      const token = currency?.wrapped
      const currencyId = token?.address

      const isUnapprovedToken =
        token && secTokens[currencyId]
          ? (userSecTokens[currencyId] as any)?.tokenInfo?.accreditationRequest?.brokerDealerStatus !==
              AccreditationStatusEnum.APPROVED ||
            (userSecTokens[currencyId] as any)?.tokenInfo?.accreditationRequest?.custodianStatus !==
              AccreditationStatusEnum.APPROVED
          : false
      if (showImport && token) {
        return (
          <ImportRow
            style={{ ...style, ...borderBottomStyle }}
            token={token}
            showImportView={showImportView}
            setImportToken={setImportToken}
            dim
          />
        )
      } else if (currency) {
        return (
          <CurrencyRow
            style={{ ...style, ...borderBottomStyle }}
            currency={currency}
            isSelected={isSelected}
            onSelect={handleSelect}
            otherSelected={otherSelected}
            isUnapprovedSecToken={isUnapprovedToken}
          />
        )
      } else {
        return null
      }
    },
    [
      sortedBySecList.length,
      onCurrencySelect,
      otherCurrency,
      selectedCurrency,
      setImportToken,
      showImportView,
      secTokens,
      userSecTokens,
    ]
  )

  const itemKey = useCallback((index: number, data: typeof itemData) => {
    const currency = data[index]
    if (isBreakLine(currency)) return BREAK_LINE
    return currencyKey(currency)
  }, [])

  const itemSize = (index: number) => {
    const currency: Currency | BreakLine = itemData[index]
    if (isBreakLine(currency)) {
      return BREAK_HEIGHT
    }
    const token = currency?.wrapped
    const currencyId = token?.address
    const isUnapprovedToken =
      token && secTokens[currencyId]
        ? (userSecTokens[currencyId] as any)?.tokenInfo?.accreditationRequest?.brokerDealerStatus !==
            AccreditationStatusEnum.APPROVED ||
          (userSecTokens[currencyId] as any)?.tokenInfo?.accreditationRequest?.custodianStatus !==
            AccreditationStatusEnum.APPROVED
        : false
    return isUnapprovedToken ? UNAPPROVED_ROW : NORMAL_ROW
  }

  return (
    <List
      height={height}
      ref={listRef as any}
      width="100%"
      itemData={itemData}
      itemCount={itemData.length}
      itemSize={itemSize}
      itemKey={itemKey}
    >
      {Row}
    </List>
  )
}

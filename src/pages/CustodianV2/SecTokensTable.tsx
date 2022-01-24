import React, { FC, useRef } from 'react'
import styled from 'styled-components'
import { FixedSizeList } from 'react-window'
import { Token } from '@ixswap1/sdk-core'
import { NavLink } from 'react-router-dom'
import { Flex } from 'rebass'

import { Table, HeaderRow, BodyRow } from 'components/Table'
import { TYPE } from 'theme'
import { Pagination } from 'components/AdminKycTable/Pagination'
import { ListType, useCurrencySearch } from 'components/SearchModal/useCurrencySearch'
import CurrencyLogo from 'components/CurrencyLogo'

import { ReactComponent as Tradable } from '../../assets/images/tradable.svg'
import { ReactComponent as NonTradable } from '../../assets/images/non-tradable.svg'

interface BodyProps {
  tokens: Token[]
}

const headerCells = ['Name', 'Issuer', 'Country', 'Industry', '']

const Header = () => {
  return (
    <StyledHeaderRow>
      {headerCells.map((cell, id) => (
        <div key={`${cell}-${id}`}>{cell}</div>
      ))}
    </StyledHeaderRow>
  )
}

const Body: FC<BodyProps> = ({ tokens }: BodyProps) => {
  return (
    <>
      {tokens.map((token, index) => {
        const tokenInfo = (token as any)?.tokenInfo
        return (
          <NavLink
            style={{ textDecoration: 'none' }}
            key={`sec-tokens-${index}`}
            to={`/security-tokens/${tokenInfo.address}`}
          >
            <StyledBodyRow>
              <div>
                <Flex alignItems="center">
                  <CurrencyLogo currency={token} size={'30px'} style={{ marginRight: 10 }} />
                  <TYPE.title5>{tokenInfo.symbol}</TYPE.title5>
                </Flex>
              </div>
              <div>
                <TYPE.main1 fontWeight={400}>{tokenInfo.platform.name}</TYPE.main1>
              </div>
              <div>
                <TYPE.main1 fontWeight={400}>USA</TYPE.main1>
              </div>
              <div>
                <TYPE.main1 fontWeight={400}>Finance</TYPE.main1>
              </div>
              <div>
                {index % 3 !== 0 ? <NonTradable width={22} height={22} /> : <Tradable width={22} height={22} />}
              </div>
            </StyledBodyRow>
          </NavLink>
        )
      })}
    </>
  )
}

export const SecTokensTable: FC = () => {
  const listRef = useRef<FixedSizeList>()
  const { filteredSortedTokens } = useCurrencySearch({
    listRef,
    list: ListType.OTHER,
  })

  return filteredSortedTokens?.length > 0 ? (
    <>
      <Flex marginBottom="40px">
        <TYPE.title5>{`Other security tokens`}</TYPE.title5>
        <TYPE.title5 marginLeft="4px" color="text2">
          {`(${filteredSortedTokens?.length || '0'})`}
        </TYPE.title5>
      </Flex>
      <Table style={{ marginBottom: 32 }} header={<Header />} body={<Body tokens={filteredSortedTokens} />} />
      <Pagination page={1} totalPages={1} onPageChange={() => console.log('change')} />{' '}
    </>
  ) : null
}

export const StyledHeaderRow = styled(HeaderRow)`
  grid-template-columns: 3fr 3fr 2fr 2fr 1fr;
`

const StyledBodyRow = styled(BodyRow)`
  grid-template-columns: 3fr 3fr 2fr 2fr 1fr;
  background: transparent;
  margin-bottom: 8px;
  border: none;
  background: rgba(39, 31, 74, 0.3);

  > div {
    display: flex;
    justify-content: start;
  }
`

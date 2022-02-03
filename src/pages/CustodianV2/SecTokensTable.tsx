import React, { FC } from 'react'
import styled from 'styled-components'
import { Token } from '@ixswap1/sdk-core'
import { NavLink } from 'react-router-dom'
import { Flex } from 'rebass'

import { Table, HeaderRow, BodyRow } from 'components/Table'
import { TYPE } from 'theme'
import { Pagination } from 'components/AdminKycTable/Pagination'
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
      {tokens.map((token: any, index) => (
        <NavLink style={{ textDecoration: 'none' }} key={`sec-tokens-${index}`} to={`/security-tokens/${token.id}`}>
          <StyledBodyRow>
            <div>
              <Flex alignItems="center">
                {token.logo ? (
                  <img
                    style={{ marginRight: 10, borderRadius: 24 }}
                    width="30px"
                    height="30px"
                    src={token.logo.public}
                  />
                ) : (
                  <CurrencyLogo currency={undefined} size={'30px'} style={{ marginRight: 16 }} />
                )}
                <TYPE.title5>{token.ticker}</TYPE.title5>
              </Flex>
            </div>
            <div>
              <TYPE.main1 fontWeight={400}>{token.issuer.name}</TYPE.main1>
            </div>
            <div>
              <TYPE.main1 fontWeight={400}>{token.country}</TYPE.main1>
            </div>
            <div>
              <TYPE.main1 fontWeight={400}>{token.industry}</TYPE.main1>
            </div>
            <div>{token.tradable ? <NonTradable width={22} height={22} /> : <Tradable width={22} height={22} />}</div>
          </StyledBodyRow>
        </NavLink>
      ))}
    </>
  )
}

export const SecTokensTable: FC<BodyProps> = ({ tokens }: BodyProps) => {
  return tokens.length > 0 ? (
    <>
      <TYPE.title5 marginBottom="40px" display="flex">
        {`Other security tokens`}
        <TYPE.title5 marginLeft="4px" color="text2">
          {`(${tokens?.length || '0'})`}
        </TYPE.title5>
      </TYPE.title5>
      <Table style={{ marginBottom: 32 }} header={<Header />} body={<Body tokens={tokens} />} />
      <Pagination page={1} totalPages={1} onPageChange={() => console.log('change')} />{' '}
    </>
  ) : null
}

export const StyledHeaderRow = styled(HeaderRow)`
  grid-template-columns: 3fr 3fr 2fr 2fr 1fr;
  min-width: 1000px;
`

const StyledBodyRow = styled(BodyRow)`
  grid-template-columns: 3fr 3fr 2fr 2fr 1fr;
  background: transparent;
  margin-bottom: 8px;
  border: none;
  background: rgba(39, 31, 74, 0.3);
  min-width: 1000px;

  > div {
    display: flex;
    justify-content: start;
  }
`

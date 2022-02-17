import React, { ChangeEvent, FC, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { Flex } from 'rebass'
import { t, Trans } from '@lingui/macro'
import { isMobile } from 'react-device-detect'

import { Table, HeaderRow, BodyRow } from 'components/Table'
import { TYPE } from 'theme'
import { Pagination } from 'components/AdminKycTable/Pagination'
import CurrencyLogo from 'components/CurrencyLogo'
import { useFetchTokens } from 'state/secCatalog/hooks'
import { FilterDropdown } from './FilterDropdown'
import { industries } from 'components/AdminSecurityCatalog/mock'
import { ButtonGradientBorder } from 'components/Button'
import { MouseoverTooltip } from 'components/Tooltip'

import { ReactComponent as Tradable } from '../../assets/images/tradable.svg'
import { ReactComponent as NonTradable } from '../../assets/images/non-tradable.svg'
import { StyledSearchInput } from './styleds'
interface Props {
  tokens: any[]
  page: number
  totalPages: number
  offset: number
  totalItems: number
}

interface BodyProps {
  tokens: any[]
}

const headerCells = ['Name', 'Issuer', 'Country', 'Industry', '']

let timer = null as any

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
                  <CurrencyLogo currency={undefined} size={'30px'} style={{ marginRight: 10 }} />
                )}
                <TYPE.title5>{token.ticker}</TYPE.title5>
              </Flex>
            </div>
            <div>
              <TYPE.main1 fontWeight={400}>{token.issuer.name}</TYPE.main1>
            </div>
            <div>
              <TYPE.main1 style={{ overflow: 'hidden', textOverflow: 'ellipsis' }} fontWeight={400}>
                {token.country}
              </TYPE.main1>
            </div>
            <div>
              <TYPE.main1 fontWeight={400}>{token.industry}</TYPE.main1>
            </div>
            <div>
              <MouseoverTooltip
                style={{ padding: 8 }}
                placement="top"
                text={`${token?.token ? 'Ready' : 'Not ready'} for trading on IXSwap`}
              >
                {token.token ? <Tradable width={22} height={22} /> : <NonTradable width={22} height={22} />}
              </MouseoverTooltip>
            </div>
          </StyledBodyRow>
        </NavLink>
      ))}
    </>
  )
}

export const SecTokensTable: FC<Props> = ({ tokens, page, offset, totalPages, totalItems }: Props) => {
  const [searchValue, setSearchValue] = useState('')
  const [filters, setFilters] = useState<any>({
    industry: null,
    country: null,
    issuer: null,
  })
  const [currentPage, setCurrentPage] = useState(1)
  const fetchTokens = useFetchTokens()

  useEffect(() => {
    const { industry, country, issuer } = filters

    clearTimeout(timer)
    timer = setTimeout(
      () =>
        fetchTokens({
          page: currentPage,
          offset,
          search: searchValue,
          industry: industry?.name || '',
          country: country?.name || '',
          issuerId: issuer?.id || '',
        }),
      250
    )

    return () => {
      clearTimeout(timer)
    }
  }, [filters, searchValue, currentPage]) // Filter tokens on filter/search change

  const onPageChange = (page: number) => {
    const yOffset = -120
    const element = document.getElementById('other-security-tokens-title')
    if (element) {
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
    setCurrentPage(page)
  }

  const handleResetFilters = () => {
    setFilters({
      industry: null,
      country: null,
      issuer: null,
    })
    setSearchValue('')
  }

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value)
  }

  const onFilterChange = (filterName: string, filter: any) => {
    setFilters({ ...filters, [filterName]: filter })
  }

  const countries = useMemo(() => {
    const result = []
    const set = new Set()
    tokens.forEach(({ country }: { country: string }) => {
      set.add(country)
    })
    for (const item of set) {
      result.push(item)
    }

    return result.map((name, index) => ({ id: ++index, name })).sort((a: any, b: any) => a.name.localeCompare(b.name))
  }, [])

  const issuers = useMemo(() => {
    const map = new Map()
    const result = []

    tokens.forEach(({ issuer }: any) => {
      map.set(issuer.id, issuer.name)
    })
    for (const [key, value] of map) {
      result.push({ id: key, name: value })
    }
    return result
  }, []) // get issuers with tokens.length > 0

  return (
    <>
      <TYPE.title5 marginBottom="40px" display="flex" id="other-security-tokens-title">
        {`Other security tokens`}
        <TYPE.title5 marginLeft="4px" color="text2">
          {`(${totalItems})`}
        </TYPE.title5>
      </TYPE.title5>

      <Flex marginBottom="40px" flexDirection={isMobile ? 'column' : 'row'}>
        <StyledSearchInput
          style={isMobile ? { marginBottom: 16, padding: '16px 22px' } : { marginRight: 16 }}
          value={searchValue}
          placeholder={t`Search`}
          onChange={onSearchChange}
        />

        <Flex>
          <FilterDropdown
            placeholder="Issuers"
            selectedItem={filters.issuer}
            onSelect={(item) => onFilterChange('issuer', item)}
            items={issuers}
            style={{ borderRadius: '30px 0px 0px 30px', marginRight: 1 }}
          />
          <FilterDropdown
            selectedItem={filters.country}
            placeholder="Country"
            onSelect={(item) => onFilterChange('country', item)}
            items={countries}
            style={{ borderRadius: '0px', marginRight: 1 }}
            withScroll
          />
          <FilterDropdown
            selectedItem={filters.industry}
            placeholder="Industry"
            onSelect={(item) => onFilterChange('industry', item)}
            items={industries}
            style={{ borderRadius: '0px 30px 30px 0px' }}
          />
        </Flex>

        <ButtonGradientBorder
          onClick={handleResetFilters}
          style={isMobile ? { width: '100%', marginTop: 16 } : { width: 200, marginLeft: 16 }}
        >
          <TYPE.body2>Reset filters</TYPE.body2>
        </ButtonGradientBorder>
      </Flex>

      {tokens.length > 0 ? (
        <>
          <Table style={{ marginBottom: 32 }} header={<Header />} body={<Body tokens={tokens} />} />
          <Pagination page={page} totalPages={totalPages} onPageChange={onPageChange} />
        </>
      ) : (
        <TYPE.body2 textAlign="center">
          <Trans>No results</Trans>
        </TYPE.body2>
      )}
    </>
  )
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

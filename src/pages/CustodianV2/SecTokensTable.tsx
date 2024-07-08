import React, { ChangeEvent, FC, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { Flex } from 'rebass'
import { t, Trans } from '@lingui/macro'
import { isMobile } from 'react-device-detect'
import { getNames } from 'country-list'
import { Table, HeaderRow, BodyRow } from 'components/Table'
import { MEDIA_WIDTHS, TYPE } from 'theme'
import { Pagination } from 'components/Pagination'
import CurrencyLogo from 'components/CurrencyLogo'
import { useFetchIssuers, useFetchTokens, useSecCatalogState } from 'state/secCatalog/hooks'
import { MouseoverTooltip } from 'components/Tooltip'
import { RowCenter } from 'components/Row'
import { LoaderThin } from 'components/Loader/LoaderThin'
import { useWhitelabelState } from 'state/whitelabel/hooks'
import { FilterDropdown } from './FilterDropdown'
import { industries } from 'components/AdminSecurityCatalog/mock'
import { ButtonGradientBorder, PinnedContentButton } from 'components/Button'

import { StyledSearchInput, StyledNonTradable, StyledTradable } from './styleds'
import { routes } from 'utils/routes'
import { BodyWrapper } from 'pages/AppBody'
// import { Pagination } from 'components/Vault/Pagination'
// import { Pagination } from 'components/AdminAccreditationTable/Pagination'
// import Pagination from '@mui/material/Pagination/Pagination'
// import Pagination from '@mui/material/Pagination'
// import { Pagination } from '@mui/material'

interface Props {
  tokens: any[]
  page: number
  totalPages: number
  offset: number
  totalItems: number
  enableFeaturedSecurityVaults?: boolean
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

export const StyledBodyWrapper = styled(BodyWrapper)`
  background: ${({ theme }) => theme.bg0};
  box-shadow: none;
  width: 100%;
  // padding: 0px;
  max-width: 1358px;
  border-radius: 8px;
  padding-top: 60px;
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    padding: 0px;
  }
`

const Body: FC<BodyProps> = ({ tokens }: BodyProps) => {
  const { config } = useWhitelabelState()

  return (
    <>
      {tokens.map((token: any, index) => (
        <NavLink style={{ textDecoration: 'none' }} key={`sec-tokens-${index}`} to={routes.securityToken(token.id)}>
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
                text={`${token?.token ? 'Ready' : 'Not ready'} for trading on ${config?.name || 'IX Swap'}`}
              >
                {token.token ? (
                  <TYPE.small color="#6666FF">Trade Now</TYPE.small>
                ) : (
                  <TYPE.small>Not Tradable</TYPE.small>
                )}
              </MouseoverTooltip>
            </div>
          </StyledBodyRow>
        </NavLink>
      ))}
    </>
  )
}

export const SecTokensTable: FC<Props> = ({
  tokens,
  page,
  offset,
  totalPages,
  enableFeaturedSecurityVaults,
}: Props) => {
  const { config } = useWhitelabelState()
  const isIxswap = config?.isIxSwap ?? false

  const [searchValue, setSearchValue] = useState('')
  // const [filters] = useState<any>({
  //   industry: null,
  //   country: null,
  //   issuer: null,
  // })
  const getIssuers = useFetchIssuers()
  // const { loadingRequest } = useSecCatalogState()
  const [currentPage, setCurrentPage] = useState(1)
  const fetchTokens = useFetchTokens()
  const [filters, setFilters] = useState<any>({
    industry: null,
    country: null,
    issuer: null,
  })
  const { issuers, loadingRequest } = useSecCatalogState()

  useEffect(() => {
    getIssuers({ page: 1, offset: 100000 })
  }, [getIssuers])

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
    setCurrentPage(1)
  }

  const onFilterChange = (filterName: string, filter: any) => {
    setFilters({ ...filters, [filterName]: filter })
    setCurrentPage(1)
  }

  const countries = useMemo(() => {
    return getNames()
      .map((name, index) => ({ id: ++index, name }))
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [])

  const issuersWithTokens = useMemo(() => {
    return issuers
      ? issuers.items
          .filter(({ tokens }: any) => tokens.length > 0)
          .map(({ id, name }: any) => ({
            id,
            name,
          }))
      : []
  }, [issuers]) // get issuers with tokens.length > 0

  return (
    <StyledBodyWrapper>
      <TYPE.title5 marginBottom="40px" display="flex" id="other-security-tokens-title">
        {`Other security tokens`}
        <TYPE.title5 marginLeft="4px" color="text2">
          {/* {`(${totalItems})`} */}
        </TYPE.title5>
      </TYPE.title5>

      {isIxswap || enableFeaturedSecurityVaults ? (
        <>
          <Flex marginBottom="40px" flexDirection={isMobile ? 'column' : 'row'}>
            <StyledSearchInput
              // style={isMobile ? { marginBottom: 16, padding: '16px 22px' } : { marginRight: 16 }}
              value={searchValue}
              placeholder={`Search`}
              onChange={onSearchChange}
            />

            <Flex>
              <FilterDropdown
                placeholder="Issuers"
                selectedItem={filters.issuer}
                onSelect={(item) => onFilterChange('issuer', item)}
                items={issuersWithTokens}
                // style={{ borderRadius: '30px 0px 0px 30px', marginRight: 1, padding: 8, width: 132 }}
              />
              <FilterDropdown
                selectedItem={filters.country}
                placeholder="Country"
                onSelect={(item) => onFilterChange('country', item)}
                items={countries}
                // style={{ borderRadius: '0px', marginRight: 1, padding: 8, width: 132 }}
                withScroll
              />
              <FilterDropdown
                selectedItem={filters.industry}
                placeholder="Industry"
                onSelect={(item) => onFilterChange('industry', item)}
                items={industries}
                // style={{ borderRadius: '1px', padding: 8, width: 132 }}
              />
            </Flex>

            <PinnedContentButton
              onClick={handleResetFilters}
              style={isMobile ? { width: '100%', marginTop: 16 } : { width: 150, marginLeft: 16 }}
            >
              <TYPE.body2 style={{ color: '#FFFFFF' }}>Reset filters</TYPE.body2>
            </PinnedContentButton>
          </Flex>
          {loadingRequest ? (
            <RowCenter>
              <LoaderThin size={64} />
            </RowCenter>
          ) : tokens.length > 0 ? (
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
      ) : (
        <TYPE.body2 textAlign="center">
          <Trans>No results</Trans>
        </TYPE.body2>
      )}
    </StyledBodyWrapper>
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
  border-bottom: 1px solid #e6e6ff;
  // background: ${({ theme: { config } }) => config.background?.main || 'rgba(39, 31, 74, 0.3)'};
  min-width: 1000px;

  > div {
    display: flex;
    justify-content: start;
  }
`

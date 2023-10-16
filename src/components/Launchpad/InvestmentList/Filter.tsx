import React from 'react'
import styled from 'styled-components'

import { FilterDropdown, FilterOption } from './FilterDropdown'

import { ReactComponent as FilterIcon } from 'assets/launchpad/svg/filter-icon.svg'
import { ReactComponent as SearchIcon } from 'assets/launchpad/svg/search-icon.svg'

import { OFFER_INDUSTRY_LABELS, OFFER_STAGE_LABELS, OFFER_TYPE_LABELS } from 'state/launchpad/constants'
import { text8 } from 'components/LaunchpadMisc/typography'
import { isMobile } from 'react-device-detect'

export interface FilterConfig {
  search: string
  industry: FilterOption<string>[]
  stage: FilterOption<string>[]
  type: FilterOption<string>[]
}

interface Props {
  onFilter: (updateFunction: (filter: FilterConfig) => FilterConfig) => void
  filter: FilterConfig
}

export const InvestmentListFilter: React.FC<Props> = ({ filter, onFilter }) => {
  const updateFilter = (newFilter: Partial<FilterConfig>) => {
    onFilter((oldFilter) => ({ ...oldFilter, ...newFilter } as FilterConfig))
  }

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateFilter({ search: event.target.value })
  }

  const handleDropdownSelect = (name: string) => {
    return (options: FilterOption<string>[]) => {
      updateFilter({ [name]: options })
    }
  }

  return (
    <FilterContainer>
      <FilterDropdown
        selected={filter.industry}
        label="Industry"
        options={OFFER_INDUSTRY_LABELS}
        onSelect={handleDropdownSelect('industry')}
      />
      <FilterDropdown
        selected={filter.stage}
        label="Stage"
        options={OFFER_STAGE_LABELS}
        onSelect={handleDropdownSelect('stage')}
      />
      {!isMobile && (
        <>
          <FilterSearchField>
            <FilterSearchInput value={filter.search} onChange={onSearchChange} />
            <SearchIcon />
          </FilterSearchField>{' '}
          <Spacer />
        </>
      )}

      {/* Disabled for version 2 https://app.clickup.com/t/4733323/IXS-2662 */}
      <FilterDropdown
        selected={filter.type}
        label="Type"
        options={OFFER_TYPE_LABELS}
        onSelect={handleDropdownSelect('type')}
        disabled={true}
      />

      <FilterButton type="button" disabled={true}>
        <FilterIcon /> Filter
      </FilterButton>

      {isMobile && (
        <FilterSearchField>
          <FilterSearchInput value={filter.search} onChange={onSearchChange} />
          <SearchIcon />
        </FilterSearchField>
      )}
    </FilterContainer>
  )
}

const Spacer = styled.div`
  flex-grow: 1;
`

const FilterContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  width: 100%;
  margin: auto;

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
   grid-template-columns: repeat(4, 1fr);
     display: grid;
      gap: 6px;
 
  `};
`

const FilterSearchField = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-items: flex-start;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border: 1px solid ${(props) => props.theme.launchpad.colors.border.default};
  border-radius: 8px;
  height: 40px;
  flex-basis: 300px;
`

const FilterSearchInput = styled.input`
  flex-grow: 1;
  border: none;
  outline: 0;
`

const FilterButton = styled.button`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 0.75rem;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  padding: 0.5rem 0.75rem;
  height: 40px;
  background: ${(props) =>
    props.disabled ? props.theme.launchpad.colors.disabled : props.theme.launchpad.colors.background};
  border: 1px solid ${(props) => props.theme.launchpad.colors.border.default};
  opacity: ${({ disabled }) => (disabled ? 0.3 : 1)};
  border: 1px solid #e6e6ff;
  border-radius: 6px;
  font-family: ${(props) => props.theme.launchpad.font};
  ${text8}
  color: ${(props) => props.theme.launchpad.colors.text.title};
`

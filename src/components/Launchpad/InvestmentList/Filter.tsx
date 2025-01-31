import React from 'react'
import styled, { css } from 'styled-components'

import { FilterDropdown, FilterOption } from './FilterDropdown'

import { ReactComponent as FilterIcon } from 'assets/launchpad/svg/filter-icon.svg'
import { ReactComponent as SearchIcon } from 'assets/launchpad/svg/search-icon.svg'

import { OFFER_INDUSTRY_LABELS, OFFER_STAGE_LABELS, OFFER_TYPE_LABELS } from 'state/launchpad/constants'
import { text8 } from 'components/LaunchpadMisc/typography'
import { isMobile } from 'react-device-detect'
import { networkOptions } from 'components/LaunchpadIssuance/IssuanceForm/Information/util'
import { useLocalization } from 'i18n'

export interface FilterConfig {
  search: string
  industry: FilterOption<string>[]
  stage: FilterOption<string>[]
  network: FilterOption<string>[]
  type: FilterOption<string>[]
}

interface Props {
  onFilter: (updateFunction: (filter: FilterConfig) => FilterConfig) => void
  filter: FilterConfig
}

export const InvestmentListFilter: React.FC<Props> = ({ filter, onFilter }) => {
  const { t } = useLocalization()

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
    <>
      <FilterContainer>
        <FilterDropdown
          selected={filter.industry}
          label={t('launchpad.investments.filters.industry')}
          options={OFFER_INDUSTRY_LABELS}
          onSelect={handleDropdownSelect('industry')}
        />
        <FilterDropdown
          selected={filter.stage}
          label={t('launchpad.investments.filters.stage')}
          options={OFFER_STAGE_LABELS}
          onSelect={handleDropdownSelect('stage')}
        />
        <FilterDropdown
          selected={filter.network}
          label={t('launchpad.investments.filters.network')}
          options={networkOptions}
          onSelect={handleDropdownSelect('network')}
        />

        {!isMobile && <Spacer />}
        {/* Disabled for version 2 https://app.clickup.com/t/4733323/IXS-2662 */}
        <FilterDropdown
          selected={filter.type}
          label={t('launchpad.investments.filters.type')}
          options={OFFER_TYPE_LABELS}
          onSelect={handleDropdownSelect('type')}
          disabled={true}
        />

        <FilterButton type="button" disabled={true}>
          <FilterIcon /> {t('launchpad.investments.filters.filter')}
        </FilterButton>
      </FilterContainer>
      {!isMobile && (
        <FilterSearchField>
          <SearchIcon />
          <FilterSearchInput
            placeholder={t('launchpad.investments.filters.search')}
            value={filter.search}
            onChange={onSearchChange}
          />
        </FilterSearchField>
      )}

      {isMobile && (
        <FilterSearchField>
          <FilterSearchInput value={filter.search} onChange={onSearchChange} />
          <SearchIcon />
        </FilterSearchField>
      )}
    </>
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

  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(4, auto);
    grid-gap: 10px;
  }
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
  margin: 10px 0px 20px 0px;
  @media (max-width: 768px) {
    flex-basis: 50px;
    margin-bottom: 20px;
  }
`

const FilterSearchInput = styled.input`
  flex-grow: 1;
  border: none;
  outline: 0;
  background: none;
`

const FilterButton = styled.button`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 0.75rem;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  padding: 0.5rem 0.75rem;
  height: 40px;
  background: ${(props) => props.theme.launchpad.colors.background};
  border: 1px solid ${(props) => props.theme.launchpad.colors.border.default};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  border: 1px solid #e6e6ff;
  border-radius: 6px;
  font-family: ${(props) => props.theme.launchpad.font};
  ${text8};
  color: ${(props) => props.theme.launchpad.colors.text.title};
`

export default InvestmentListFilter

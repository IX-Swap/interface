import React from 'react'
import styled from 'styled-components'

import { FilterDropdown, FilterOption } from './FilterDropdown'

import { ReactComponent as FilterIcon } from 'assets/launchpad/svg/filter-icon.svg'
import { ReactComponent as SearchIcon } from 'assets/launchpad/svg/search-icon.svg'
import { OfferIndustry, OfferStatus, OfferType } from 'state/launchpad/types'
import { OFFER_INDUSTRY_LABELS, OFFER_STAGE_LABELS, OFFER_TYPE_LABELS } from 'state/launchpad/constants'


export interface FilterConfig {
  search: string
  industry: FilterOption<string>[]
  stage: FilterOption<string>[]
  type: FilterOption<string>[]
}

interface Props {
  onFilter: (filter: FilterConfig) => void
}

export const InvestmentListFilter: React.FC<Props> = (props) => {
  const [filter, setFilter] = React.useState<FilterConfig>({ search: '', industry: [], stage: [], type: [] })

  const onSearchChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => 
      setFilter(state => ({ ...state, search: event.target.value })), 
    [])

  const onIndustrySelect = React.useCallback((options: FilterOption<string>[]) => {
    setFilter(state => ({ ...state, industry: options }))
  }, [])

  const onStageSelect = React.useCallback((options: FilterOption<string>[]) => {
    setFilter(state => ({ ...state, stage: options }))
  }, [])

  const onTypeSelect = React.useCallback((options: FilterOption<string>[]) => {
    setFilter(state => ({ ...state, type: options }))
  }, [])

  React.useEffect(() => {
    props.onFilter(filter)
  }, [filter])

  return (
    <FilterContainer>
      <FilterDropdown label="Industry" options={OFFER_INDUSTRY_LABELS} onSelect={onIndustrySelect} />
      <FilterDropdown label="Stage" options={OFFER_STAGE_LABELS} onSelect={onStageSelect} />

      <FilterSearchField>
        <FilterSearchInput onChange={onSearchChange} />
        <SearchIcon />
      </FilterSearchField>

      <Spacer />

      <FilterDropdown label="Type" options={OFFER_TYPE_LABELS} onSelect={onTypeSelect} />

      <FilterButton type="button" onClick={() => props.onFilter(filter)}>
        <FilterIcon /> Filter
      </FilterButton>
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
`

const FilterSearchField = styled.div`
  display: flex;

  flex-flow: row nowrap;
  justify-items: flex-start;
  align-items: center;

  padding: 0.25rem 0.75rem;

  border: 1px solid ${props => props.theme.launchpad.colors.border.default};
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
  
  cursor: pointer;
  
  padding: 0.5rem 0.75rem;

  height: 40px;

  background: #FFFFFF;
  border: 1px solid #E6E6FF;
  border-radius: 6px;

  font-style: normal;
  font-weight: 500;
  font-size: 13px;

  line-height: 16px;
  letter-spacing: -0.02em;

  color: ${props => props.theme.launchpad.colors.text.body};
`
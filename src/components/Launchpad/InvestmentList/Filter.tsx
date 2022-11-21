import React from 'react'
import styled from 'styled-components'

import { FilterDropdown, FilterOption } from './FilterDropdown'

import { ReactComponent as FilterIcon } from 'assets/launchpad/svg/filter-icon.svg'
import { ReactComponent as SearchIcon } from 'assets/launchpad/svg/search-icon.svg'
import { OfferIndustry, OfferType } from 'state/launchpad/types'

const industryOptions = [
  { label: "Technology", value: OfferIndustry.technology},
  { label: "Finance", value: OfferIndustry.finance },
  { label: "Blockchain", value: OfferIndustry.blockchain },
  { label: "Real Estate", value: OfferIndustry.realEstate },
  { label: "Gaming", value: OfferIndustry.gaming },
  { label: "Energy", value: OfferIndustry.energy },
  { label: "Healthcare", value: OfferIndustry.healthcare},
  { label: "Others", value: OfferIndustry.other },
]

const stageOptions = [
  { label: "Register to invest", value: "Register to invest" },
  { label: "Pre-Sale", value: "Pre-Sale" },
  { label: "Public Sale", value: "Public Sale" },
  { label: "Closed", value: "Closed" } 
]

const typeOptions = [
  { label: "Security token", value: OfferType.securityToken },
  { label: "Fractionalized-NFT", value: OfferType.fNFT },
  { label: "Cryptocurrency", value: OfferType.crypto } 
]

export interface FilterConfig {
  industry: FilterOption<string>[]
  stage: FilterOption<string>[]
  type: FilterOption<string>[]
}

interface Props {
  onFilter: (filter: FilterConfig) => void
}

export const InvestmentListFilter: React.FC<Props> = (props) => {
  const [filter, setFilter] = React.useState<FilterConfig>({ industry: [], stage: [], type: [] })

  const onIndustrySelect = React.useCallback((options: FilterOption<string>[]) => {
    setFilter(state => ({ ...state, industry: options }))
  }, [])

  const onStageSelect = React.useCallback((options: FilterOption<string>[]) => {
    setFilter(state => ({ ...state, stage: options }))
  }, [])

  const onTypeSelect = React.useCallback((options: FilterOption<string>[]) => {
    setFilter(state => ({ ...state, type: options }))
  }, [])

  return (
    <FilterContainer>
      <FilterDropdown label="Industry" options={industryOptions} onSelect={onIndustrySelect} />
      <FilterDropdown label="Stage" options={stageOptions} onSelect={onStageSelect} />

      <FilterSearchField>
        <FilterSearchInput />
        <SearchIcon />
      </FilterSearchField>

      <Spacer />

      <FilterDropdown label="Type" options={typeOptions} onSelect={onTypeSelect} />

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
import React, { useCallback } from 'react'
import styled from 'styled-components'

import { ReactComponent as SearchIcon } from 'assets/launchpad/svg/search-icon.svg'

export interface SearchConfig {
  search: string
  onlyMine: string
}

export interface OrderConfig {
  name?: string | null
  startDate?: string | null
  status?: string | null
  issuanceName?: string | null
  countInvestors?: string | null
  commitment?: string | null
  progressPercent?: string | null
  hardCap?: string | null
  closeDate?: string | null
  softCapReached?: string | null
}

interface Props {
  search: string
  onFilter: (search: string) => void
}

export const SearchFilter: React.FC<Props> = ({ search, onFilter }) => {
  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onFilter(event.target.value || '')
    },
    [onFilter]
  )

  return (
    <FilterContainer>
      <FilterSearchField>
        <SearchIcon />
        <FilterSearchInput placeholder="Search" value={search} onChange={onChange} />
      </FilterSearchField>

      <Spacer />
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
  max-width: 1320px;
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
  min-width: 100%;

  svg {
    margin-right: 4px;
  }
  input::placeholder {
    color: ${(props) => props.theme.launchpad.colors.text.caption};
  }
`

const FilterSearchInput = styled.input`
  flex-grow: 1;
  border: none;
  outline: 0;
`

import React from 'react'
import styled from 'styled-components'

import { ReactComponent as SearchIcon } from 'assets/launchpad/svg/search-icon.svg'

export interface SearchConfig {
  search: string
  onlyMine?: string
}

export interface OrderConfig {
  name?: string | null
  startDate?: string | null
  status?: string | null
  issuanceName?: string | null
  countInvestors?: string | null
  commitment?: string | null
  progress?: string | null
  hardCap?: string | null
  closeDate?: string | null
  softCapReached?: string | null
}

interface Props {
  onFilter?: (filter: SearchConfig) => void
  setFilter?: (filter: SearchConfig | ((prevState: SearchConfig | undefined) => SearchConfig)) => void
}

export const SearchFilter: React.FC<Props> = (props) => {
  const [filter, setFilter] = React.useState<SearchConfig>({ search: '' })

  const onSearchChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => setFilter((state) => ({ ...state, search: event.target.value })),
    []
  )

  React.useEffect(() => {
    if (props.setFilter) {
      props.setFilter((state: SearchConfig | undefined) => ({
        ...(state || {}),
        search: filter.search,
      }))
    } else if (props.onFilter) {
      props.onFilter(filter)
    }
  }, [filter])

  return (
    <FilterContainer>
      <FilterSearchField>
        <SearchIcon />
        <FilterSearchInput placeholder="Search" onChange={onSearchChange} />
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
  max-width: 1180px;
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

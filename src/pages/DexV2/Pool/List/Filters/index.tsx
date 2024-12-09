import { text8 } from "components/LaunchpadMisc/typography";
import styled from "styled-components";
import { PoolTypes } from "../constants";
import { BorderSimple, ToggleOption } from "components/Tabs";
import { Flex } from "rebass";
import { NetworkCard } from "./NetworkCard";
import { CHAINS } from "components/Web3Provider/constants";
import { useState } from "react";

const typeFilters = [
  { title: 'All', value: PoolTypes.all },
  { title: 'RWA', value: PoolTypes.rwa },
  { title: 'Crypto', value: PoolTypes.crypto },
]

const Filters: React.FC = () => {
  const [filters, setFilters] = useState({
    type: typeFilters[0].value,
    network: CHAINS[0].id,
  })

  const handleChangeType = (type: PoolTypes) => {
    setFilters({ ...filters, type })
  }

  const handleChangeNetwork = (chainId: number) => {
    setFilters({ ...filters, network: chainId })
  }

  return (
    <FilterWrapper justifyContent='space-between'>
      <Flex alignItems='center' style={{ gap: '1rem' }}>
        {typeFilters.map((tab, index) => {
          const active = filters.type === tab.value
          return (
            <ToggleOption key={`tabs-${index}`} onClick={() => handleChangeType(tab.value)} active={active}>
              <TabLabel>
                {tab.title}
              </TabLabel>
              <BorderSimple active={active} />
            </ToggleOption>
          )
        })}
      </Flex>
      <div>
        <NetworkCard
          selectedValue={filters.network}
          onChange={handleChangeNetwork}
        />
      </div>
    </FilterWrapper>
  )
}

const FilterWrapper = styled(Flex)`
  border-bottom: 1px solid ${(props) => props.theme.launchpad.colors.border.default};
`

const TabLabel = styled.div`
  padding: 1.5rem 1rem;
  ${text8}
`

export default Filters

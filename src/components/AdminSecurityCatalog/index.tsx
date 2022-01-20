import React, { FC, useState, ChangeEvent } from 'react'
import { t } from '@lingui/macro'
import { Flex } from 'rebass'

import { Container } from 'components/AdminKycTable'
import { SearchInput } from 'components/SearchModal/styleds'

import { StyledButtonGradientBorder } from './styleds'
import { mockBrokerDealers } from './mock'
import { BrokerDealerCard } from './BrokerDealerCard'

export const AdminSecurityCatalog: FC = () => {
  const [searchValue, setSearchValue] = useState('')

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value)
  }

  return (
    <Container>
      <Flex marginTop="33px">
        <SearchInput value={searchValue} placeholder={t`Search`} onChange={onSearchChange} />
        <StyledButtonGradientBorder marginLeft="33px">+ Add issuer</StyledButtonGradientBorder>
      </Flex>

      <Flex flexDirection="column">
        {mockBrokerDealers.map(({ info, tokens }, index) => (
          <BrokerDealerCard key={`bd-${index}`} info={info} tokens={tokens} />
        ))}
      </Flex>
    </Container>
  )
}

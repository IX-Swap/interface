import React, { FC } from 'react'

// import { Select } from 'pages/KYC/common'
import { Select } from 'components/Select'

import { SelectFiltersContainer } from './styleds'
import { Flex } from 'rebass'
import { Search } from 'components/AdminAccreditationTable/Search'
import { ButtonGradientBorder } from 'components/Button'
import { KYCStatusIcons } from 'pages/KYC/styleds'
import { KYCStatuses } from 'pages/KYC/enum'

export type Props = {
  identity: KYCIdentity
  onIdentityChange: (identity: KYCIdentity) => void
  setSearchValue: (search: string) => void
}

export type KYCIdentity = 'individual' | 'corporate' | '' | null // null for placeholder

export type IdentityOption = {
  label: string
  value: KYCIdentity
}

const identityOptions: IdentityOption[] = [
  { label: 'All', value: '' },
  { label: 'Individual', value: 'individual' },
  { label: 'Corporate', value: 'corporate' },
]

export const AdminKycFilters: FC<Props> = ({ identity, setSearchValue, onIdentityChange }) => {
  return (
    <>
      <Flex marginBottom="24px">
        <Search
          style={{ marginRight: 16, marginBottom: 0 }}
          placeholder="Search for Wallet"
          setSearchValue={setSearchValue}
        />
        <SelectFiltersContainer>
          <Select
            borderRadius="30px 0px 0px 30px"
            value={identity || null}
            placeholder="Identity"
            options={identityOptions}
            onSelect={onIdentityChange}
            isSearchable={false}
          />
          <Select
            borderRadius="0px 30px 30px 0px"
            value={null}
            placeholder="By Date"
            options={[]}
            isSearchable={false}
            onSelect={() => {
              console.log('select')
            }}
          />
        </SelectFiltersContainer>
      </Flex>

      <Flex marginBottom="52px" justifyContent="space-between">
        <ButtonGradientBorder
          minHeight="32px !important"
          height="32px"
          padding="6px 24px"
          fontSize="16px !important"
          lineHeight="16px !important"
        >
          {KYCStatusIcons[KYCStatuses.APPROVED]()}
          Approved - 129
        </ButtonGradientBorder>
        <ButtonGradientBorder
          minHeight="32px !important"
          height="32px"
          padding="6px 24px"
          fontSize="16px !important"
          lineHeight="16px !important"
        >
          {KYCStatusIcons[KYCStatuses.REJECTED]()}
          Declined - 32
        </ButtonGradientBorder>
        <ButtonGradientBorder
          minHeight="32px !important"
          height="32px"
          padding="6px 24px"
          fontSize="16px !important"
          lineHeight="16px !important"
        >
          {KYCStatusIcons[KYCStatuses.PENDING]()}
          Pending - 123
        </ButtonGradientBorder>
        <ButtonGradientBorder
          minHeight="32px !important"
          height="32px"
          padding="6px 24px"
          fontSize="16px !important"
          lineHeight="16px !important"
        >
          {KYCStatusIcons[KYCStatuses.CHANGES_REQUESTED]()}
          Change requested - 22
        </ButtonGradientBorder>
        <ButtonGradientBorder
          minHeight="32px !important"
          height="32px"
          padding="6px 24px"
          fontSize="16px !important"
          lineHeight="16px !important"
        >
          Total - 210
        </ButtonGradientBorder>
      </Flex>
    </>
  )
}

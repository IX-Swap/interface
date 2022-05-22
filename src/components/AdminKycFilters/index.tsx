import React, { FC, Fragment } from 'react'

// import { Select } from 'pages/KYC/common'
import { Select } from 'components/Select'

import { SelectFiltersContainer } from './styleds'
import { Flex } from 'rebass'
import { Search } from 'components/AdminAccreditationTable/Search'
import { ButtonGradientBorder, ButtonIXSGradient } from 'components/Button'
import { getStatusInfo } from 'pages/KYC/styleds'
import { KYCStatuses } from 'pages/KYC/enum'
import { TYPE } from 'theme'
import { ButtonStatusText, identityOptions, KYCIdentity } from './mock'

export type TStats = {
  status: string
  count: number
}

export type Props = {
  identity: KYCIdentity
  onIdentityChange: (identity: KYCIdentity) => void
  setSearchValue: (search: string) => void
  stats: ReadonlyArray<TStats>
}

export const AdminKycFilters: FC<Props> = ({ identity, stats, setSearchValue, onIdentityChange }) => {
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
        {stats.map(({ status, count }) => {
          const statusInfo = status !== 'total' ? getStatusInfo(status as KYCStatuses) : 'total'
          const title = <TYPE.title6 marginLeft="8px">{`${ButtonStatusText[status]} - ${count}`}</TYPE.title6>
                
          return (
            <Fragment key={`status-button-${status}`}>
              {statusInfo !== 'total' ? (
                <ButtonGradientBorder
                  minHeight="32px !important"
                  height="32px"
                  padding="6px 24px"
                  fontSize="16px !important"
                  lineHeight="16px !important"
                >
                  {statusInfo.icon()}
                  {title}
                </ButtonGradientBorder>
              ) : (
                <ButtonIXSGradient
                  minHeight="32px !important"
                  height="32px"
                  padding="6px 24px"
                  fontSize="16px !important"
                  lineHeight="16px !important"
                >
                  <TYPE.title6>{title}</TYPE.title6>
                </ButtonIXSGradient>
              )}
            </Fragment>
          )
        })}
      </Flex>
    </>
  )
}

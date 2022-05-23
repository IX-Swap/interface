import React, { FC, Fragment } from 'react'
import { Flex } from 'rebass'
import styled from 'styled-components'

import { Select } from 'components/Select'
import { Search } from 'components/AdminAccreditationTable/Search'
import { ButtonEmpty, ButtonGradientBorder, ButtonIXSGradient } from 'components/Button'
import { TYPE } from 'theme'

import { SelectFiltersContainer } from './styleds'
import { getStatusInfo } from 'pages/KYC/styleds'
import { KYCStatuses } from 'pages/KYC/enum'
import { ButtonStatusText, identityOptions, KYCIdentity } from './mock'
import { DateFilter } from 'components/DateFilter'

const ResetFilterButton = styled(ButtonEmpty)`
  color: ${({ theme }) => theme.text2};
  margin-left: 16px;
  white-space: nowrap;
  width: auto;
  font-weight: 400;
`

export type TStats = {
  status: string
  count: number
}

export type Props = {
  identity: KYCIdentity
  selectedStatuses: string[]
  stats: ReadonlyArray<TStats>
  endDate: any
  setSelectedStatuses: (newStatuses: string[]) => void
  onIdentityChange: (identity: KYCIdentity) => void
  setSearchValue: (search: string) => void
  setEndDate: (value: any) => void
}

export const AdminKycFilters: FC<Props> = ({
  identity,
  stats,
  selectedStatuses,
  endDate,
  setEndDate,
  setSelectedStatuses,
  setSearchValue,
  onIdentityChange,
}) => {
  const handleStatusChange = (status: string) => {
    const newStatuses = [...selectedStatuses]
    const indexOfSource = selectedStatuses.indexOf(status)
    const indexOfTotal = selectedStatuses.indexOf('total')

    if (status === 'total') {
      setSelectedStatuses(['total'])
      return
    } else if (indexOfTotal > -1) {
      newStatuses.splice(indexOfTotal, 1)
    }

    if (indexOfSource > -1) {
      newStatuses.splice(indexOfSource, 1)
    } else {
      newStatuses.push(status)
    }

    setSelectedStatuses(newStatuses)
  }

  const handleDateChange = (newDate: string) => {
    setEndDate(newDate)
  }

  const handleResetFilters = () => {
    setEndDate(null)
    setSelectedStatuses(['total'])
    onIdentityChange(null)
  }

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
          <DateFilter
            selectBorderRadius="0px 30px 30px 0px"
            value={endDate?.format('YYYY-MM-DD') || null}
            onChange={(newDate) => {
              handleDateChange(newDate)
            }}
          />
        </SelectFiltersContainer>
        <ResetFilterButton onClick={handleResetFilters}>
          Reset Filters
        </ResetFilterButton>
      </Flex>

      <Flex marginBottom="52px" justifyContent="space-between">
        {stats.map(({ status, count }) => {
          const statusInfo = status !== 'total' ? getStatusInfo(status as KYCStatuses) : 'total'
          const title = <TYPE.title6 marginLeft="8px">{`${ButtonStatusText[status]} - ${count}`}</TYPE.title6>

          return (
            <Fragment key={`status-button-${status}`}>
              {!selectedStatuses.includes(status) ? (
                <ButtonGradientBorder
                  minHeight="32px !important"
                  height="32px"
                  padding="6px 24px"
                  fontSize="16px !important"
                  lineHeight="16px !important"
                  onClick={() => handleStatusChange(status)}
                >
                  {statusInfo !== 'total' && statusInfo.icon()}
                  {title}
                </ButtonGradientBorder>
              ) : (
                <ButtonIXSGradient
                  minHeight="32px !important"
                  height="32px"
                  padding="6px 24px"
                  fontSize="16px !important"
                  lineHeight="16px !important"
                  onClick={() => handleStatusChange(status)}
                >
                  {statusInfo !== 'total' && statusInfo.icon()}
                  {title}
                </ButtonIXSGradient>
              )}
            </Fragment>
          )
        })}
      </Flex>
    </>
  )
}

import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { LoadingIndicator } from 'components/LoadingIndicator'
import { MultipleFilters } from 'components/MultipleFilters'
import { useGetPayoutList, usePayoutState } from 'state/payout/hooks'
import { Pagination } from 'components/Pagination'
import { FILTERS } from 'components/MultipleFilters/constants'

import { EmptyState } from './EmptyState'
import { Card } from './Card'
import { AllPayoutContainer, AllPayoutFilterContainer, AllPayoutListContainer, AllPayoutListLayout } from './styleds'
import { TmEmptyPage } from 'components/TmEmptyPage'
import { adminOffset as offset } from 'state/admin/constants'
export const AllPayoutEvents = () => {
  const { pathname } = useLocation()
  const [filters, handleFilters] = useState<Record<string, any>>({})
  const [haveFilters, handleHaveFilters] = useState(false)

  const { list, loadingRequest } = usePayoutState()

  const getPayoutList = useGetPayoutList()

  useEffect(() => {
    if (Object.keys(filters).length) {
      handleHaveFilters(true)
    }
    getPayoutList({ ...filters, offset: offset, page: list.page })
  }, [JSON.stringify(filters), getPayoutList, pathname])

  const onPageChange = async (page: number) => {
    await getPayoutList({ ...filters, page, offset: offset })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <LoadingIndicator noOverlay={true} isLoading={loadingRequest && list.items?.length === 0} />
      {list.items?.length || haveFilters ? (
        <AllPayoutContainer>
          <AllPayoutFilterContainer>
            <MultipleFilters
              filters={[
                FILTERS.STATUS,
                FILTERS.PAYOUT_TYPE,
                FILTERS.SEC_TOKENS,
                FILTERS.PAYOUT_PERIOD,
                FILTERS.RECORD_DATE,
              ]}
              onFiltersChange={handleFilters}
              isClearable
            />
          </AllPayoutFilterContainer>
          <AllPayoutListLayout>
            {list.items?.length ? (
              <>
                <AllPayoutListContainer>
                  {list.items.map((payout) => (
                    <Card key={payout.id} data={payout} secTokenWidth='30px' />
                  ))}
                </AllPayoutListContainer>
                <Pagination
                  totalItems={list.totalItems}
                  totalPages={list.totalPages}
                  page={list.page || 1}
                  onPageChange={onPageChange}
                />
              </>
            ) : (
              <EmptyState filtred />
            )}
          </AllPayoutListLayout>
        </AllPayoutContainer>
      ) : (
        <TmEmptyPage tab={'all-payout-events'} />
      )}
    </>
  )
}

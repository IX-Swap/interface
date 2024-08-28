import React, { useEffect, useState } from 'react'

import { LoadingIndicator } from 'components/LoadingIndicator'
import { MultipleFilters } from 'components/MultipleFilters'
import { useGetPayoutList, usePayoutState } from 'state/payout/hooks'
import { Pagination } from 'components/Pagination'
import { FILTERS } from 'components/MultipleFilters/constants'

import { EmptyState } from './EmptyState'
import { Card } from './Card'
import { AllPayoutContainer, AllPayoutFilterContainer, AllPayoutListContainer, AllPayoutListLayout } from './styleds'
import { TmEmptyPage } from 'components/TmEmptyPage'

export const AllPayoutEvents = () => {
  const [filters, handleFilters] = useState<Record<string, any>>({})
  const [haveFilters, handleHaveFilters] = useState(false)

  const { list, loadingRequest } = usePayoutState()

  const getPayoutList = useGetPayoutList()

  useEffect(() => {
    if (Object.keys(filters).length) {
      handleHaveFilters(true)
    }
    getPayoutList({ ...filters, offset: 16, page: 1 })
  }, [filters, getPayoutList])

  const onPageChange = async (page: number) => {
    await getPayoutList({ ...filters, page, offset: 16 })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {list.items?.length === 0 ? <LoadingIndicator noOverlay={true}  isLoading={loadingRequest} /> : null}
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
              fullWidth={false}
            />
          </AllPayoutFilterContainer>
          <AllPayoutListLayout>
            {list.items?.length ? (
              <>
                <AllPayoutListContainer>
                  {list.items.map((payout) => (
                    <Card key={payout.id} data={payout} />
                  ))}
                </AllPayoutListContainer>
                <Pagination totalItems={list.totalItems} totalPages={list.totalPages} page={list.page || 1} onPageChange={onPageChange} />
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

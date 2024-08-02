import React, { useEffect, useMemo } from 'react'
import { Trans } from '@lingui/macro'

import { LoadingIndicator } from 'components/LoadingIndicator'
import { useGetMyPayoutList, usePayoutState } from 'state/payout/hooks'
import { ButtonEmpty } from 'components/Button'
import { useUserSecTokenState } from 'state/user/hooks'

import { EmptyState } from './EmptyState'
import { Card } from './Card'
import {
  MyPayoutContainer,
  MyPayoutListContainer,
  Hr,
  ViewMoreBtnContainer,
  MyEventsEmptyText,
  MyListTitle,
  MyListContainer,
  MyPayoutTitleContainer,
} from './styleds'

const itemsPerLine = 4

export const MyPayouts = () => {
  const { accredited, owningTokens, claimed, loadingRequest } = usePayoutState()
  const secTokens = useUserSecTokenState()

  const getMyPayoutList = useGetMyPayoutList()

  const items = [
    { label: 'Passed Accreditation', type: 'passed-accreditation', data: accredited },
    { label: 'Active Events', type: 'owning-tokens', data: owningTokens },
    { label: 'Past Events', type: 'already-claimed', data: claimed },
  ]

  useEffect(() => {
    getMyPayoutList({ offset: itemsPerLine, listType: 'passed-accreditation' })
    getMyPayoutList({ offset: itemsPerLine, listType: 'owning-tokens' })
    getMyPayoutList({ offset: itemsPerLine, listType: 'already-claimed' })
  }, [getMyPayoutList])

  const viewMore = async (type: string, offset: number) => {
    await getMyPayoutList({ listType: type, offset })
  }

  const viewLess = async (type: string) => {
    await getMyPayoutList({ listType: type, offset: itemsPerLine })
  }

  const isEmpty = useMemo(() => {
    return secTokens?.length === 0
  }, [secTokens])

  return (
    <>
      <LoadingIndicator isLoading={loadingRequest} />
      {isEmpty ? (
        <EmptyState my />
      ) : (
        <MyPayoutContainer>
          {items.map(({ label, data, type }, index) => (
            <>
              <MyPayoutListContainer>
                <MyPayoutTitleContainer>
                  <MyListTitle>
                    <Trans>{`${label}`}</Trans>
                  </MyListTitle>
                  {data.totalItems > itemsPerLine && (
                    <ViewMoreBtnContainer>
                      <ButtonEmpty
                        onClick={() => {
                          if (data.totalItems === data.itemCount) {
                            viewLess(type)
                          } else {
                            viewMore(type, data.totalItems)
                          }
                        }}
                      >
                        <Trans>{data.totalItems === data.itemCount ? 'View Less' : 'View More'}</Trans>
                      </ButtonEmpty>
                    </ViewMoreBtnContainer>
                  )}
                </MyPayoutTitleContainer>
                {data.totalItems ? (
                  <MyListContainer>
                    {data.items.map((item) => (
                      <Card key={item.id} data={item} />
                    ))}
                  </MyListContainer>
                ) : (
                  <MyEventsEmptyText>
                    <Trans>No Available Payout Events</Trans>
                  </MyEventsEmptyText>
                )}
              </MyPayoutListContainer>
              {index < items.length - 1 && <Hr />}
            </>
          ))}
        </MyPayoutContainer>
      )}
    </>
  )
}

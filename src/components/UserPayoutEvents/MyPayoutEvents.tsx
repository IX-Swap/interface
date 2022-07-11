import React, { useEffect, useMemo } from 'react'
import { Trans, t } from '@lingui/macro'

import { LoadingIndicator } from 'components/LoadingIndicator'
import { useGetMyPayoutList, usePayoutState } from 'state/payout/hooks'
import { ButtonIXSGradient } from 'components/Button'
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
} from './styleds'

export const MyPayouts = () => {
  const { accredited, owningTokens, claimed, loadingRequest } = usePayoutState()
  const secTokens = useUserSecTokenState()

  const getMyPayoutList = useGetMyPayoutList()

  const items = [
    { label: 'Passed Accreditation', type: 'passed-accreditation', data: accredited },
    { label: 'Owning Tokens', type: 'owning-tokens', data: owningTokens },
    { label: 'Already Claimed', type: 'already-claimed', data: claimed },
  ]

  useEffect(() => {
    getMyPayoutList({ offset: 4, listType: 'passed-accreditation' })
    getMyPayoutList({ offset: 4, listType: 'owning-tokens' })
    getMyPayoutList({ offset: 4, listType: 'already-claimed' })
  }, [getMyPayoutList])

  const viewMore = async (type: string, offset: number) => {
    await getMyPayoutList({ listType: type, offset })
  }

  const viewLess = async (type: string) => {
    await getMyPayoutList({ listType: type, offset: 4 })
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
                <MyListTitle>{t`${label}`}</MyListTitle>
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
              {data.totalItems > 4 && (
                <ViewMoreBtnContainer>
                  <ButtonIXSGradient
                    onClick={() => {
                      if (data.totalItems === data.itemCount) {
                        viewLess(type)
                      } else {
                        viewMore(type, data.totalItems)
                      }
                    }}
                  >
                    <Trans>{data.totalItems === data.itemCount ? 'View Less' : 'View More'}</Trans>
                  </ButtonIXSGradient>
                </ViewMoreBtnContainer>
              )}
              {index < items.length - 1 && <Hr />}
            </>
          ))}
        </MyPayoutContainer>
      )}
    </>
  )
}

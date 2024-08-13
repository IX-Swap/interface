import React, { useState, useEffect } from 'react'
import { Pagination } from 'components/Pagination'
import { PayoutEvent } from 'state/token-manager/types'
import {
  getPayouts,
} from 'state/payout/hooks'
import { Card } from 'components/UserPayoutEvents/Card'
import styled from 'styled-components'
import { MEDIA_WIDTHS } from 'theme'

const MorePayoutEvents = ({ payoutId }: { payoutId: number }) => {
  const [payouts, setPayouts] = useState([] as PayoutEvent[])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    async function load() {
      const data = await getPayouts({ page, offset: 3 })

      setPayouts((data.items as PayoutEvent[]).filter((item) => item.id !== payoutId))
      setTotalPages(data.totalPages)
      setPage(data.page)
    }

    load()
  }, [page])

  return (
    <MoreEventsContainer>
      <MoreEventsTitle>More Payout Events</MoreEventsTitle>
      <MoreEventsList>
        {payouts.map((event) => (
          <Card data={event} key={event.id} secTokenWidth='40px' />
        ))}
      </MoreEventsList>
      <Pagination hidePaginationLabel page={page || 1} totalPages={totalPages} onPageChange={(newPage) => setPage(newPage)} />
    </MoreEventsContainer>
  )
}


const MoreEventsContainer = styled.div``

const MoreEventsTitle = styled.div`
  font-family: 'Inter';
  font-weight: 700;
  font-size: 24px;
  margin-bottom: 32px;
`

const MoreEventsList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0px, 1fr));
  column-gap: 20px;
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    grid-template-columns: repeat(1, minmax(0px, 1fr));
    row-gap: 20px;
  }
`

export default MorePayoutEvents
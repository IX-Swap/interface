import React, { useMemo } from 'react'
import { Trans } from '@lingui/macro'
import { useHistory } from 'react-router-dom'
import { PinnedContentButton } from 'components/Button'
import { routes } from 'utils/routes'
import { EmptyContainer, EmptyText, NothingFound } from './styleds'
import { TmEmptyPage } from 'components/TmEmptyPage'

interface Props {
  filtred?: boolean
  my?: boolean
}

export const EmptyState = ({ filtred, my }: Props) => {
  const history = useHistory()
  const redirectToSwap = () => {
    history.push(routes.swap)
  }

  const content = useMemo(() => {
    if (my) {
      return (
        <>
          <TmEmptyPage tab={'no-upcoming-event'} />
          <PinnedContentButton style={{ width: '200px', marginTop: '20px' }} onClick={redirectToSwap}>
            Buy RWAs
          </PinnedContentButton>
        </>
      )
    }

    if (filtred) {
      return (
        <NothingFound>
          <EmptyText>
            <Trans>Nothing found</Trans>
          </EmptyText>
          <div>
            <Trans>{`We couldn't find anything with this criteria`}</Trans>
          </div>
        </NothingFound>
      )
    }

    return (
      <EmptyText>
        <Trans>{`No Payout Events!`}</Trans>
      </EmptyText>
    )
  }, [filtred, my])

  return (
    <EmptyContainer>
      {content}
    </EmptyContainer>
  )
}

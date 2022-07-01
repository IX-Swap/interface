import { Trans } from '@lingui/macro'
import React from 'react'
import styled, { css } from 'styled-components'

import { ReactComponent as ArrowIcon } from '../../assets/images/chevron.svg'

interface Props {
  page: number
  totalPages: number
  onPageChange: (data: number) => void
}

export const Pagination = ({ page, onPageChange, totalPages }: Props) => {
  const nextPage = () => page < totalPages && onPageChange(page + 1)
  const prevPage = () => page - 1 > 0 && onPageChange(page - 1)

  return (
    <Container>
      <Button disabled={page === 1} onClick={prevPage}>
        <Prev />
      </Button>
      <Text>
        <Trans>
          {page}&nbsp;of&nbsp;{totalPages}
        </Trans>
      </Text>
      <Button disabled={page === totalPages} onClick={nextPage}>
        <Next />
      </Button>
    </Container>
  )
}

const Button = styled.div<{ disabled?: boolean }>`
  cursor: pointer;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: rgba(237, 206, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.5;
      cursor: not-allowed;
    `}
  > img {
    width: 12px;
    height: 12px;
  }
`

const Text = styled.div`
  font-size: 20px;
  min-width: 75px;
  text-align: center;
`

const Next = styled(ArrowIcon)``

const Prev = styled(ArrowIcon)`
  transform: rotate(-180deg);
`

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  > :first-child {
    margin-right: 22px;
  }
  > :last-child {
    margin-left: 22px;
  }
`

import React, { useState, useEffect } from 'react'
import { Trans } from '@lingui/macro'
import styled, { css } from 'styled-components'
import ReactPaginate from 'react-paginate'
import { Input } from 'components/Input'
import { inputGradientBorder, MEDIA_WIDTHS, TYPE } from 'theme'

import { ReactComponent as ArrowIcon } from '../../assets/images/newArrow.svg'

interface Props {
  page: number
  totalPages: number
  onPageChange: (data: number) => void
}

export const Pagination = ({ page, onPageChange, totalPages }: Props) => {
  const [inputPage, hanldeInputPage] = useState<number | string>(0)

  useEffect(() => {
    hanldeInputPage(page)
  }, [page])

  const onPageClick = ({ selected }: { selected: number }) => {
    onPageChange(selected + 1)
  }

  const onPageInputChange = ({ target: { value } }: { target: { value: string } }) => {
    hanldeInputPage(+value || value)
  }

  const onClickButton = () => {
    if (!inputPage) {
      hanldeInputPage(1)
      onPageChange(1)
      return
    }

    if (+inputPage && +inputPage > totalPages) {
      hanldeInputPage(totalPages)
      onPageChange(totalPages)

      return
    }
    onPageChange(+inputPage)
  }

  if (!totalPages) return null

  return (
    <Container>
      {/* <ReactPaginate
        forcePage={page - 1}
        breakLabel="..."
        onPageChange={onPageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={3}
        pageCount={totalPages}
        previousLabel={<Prev />}
        nextLabel={<Next />}
        containerClassName="pagination-container"
        pageClassName="page"
      /> */}
      <InfoContainer>
        <TYPE.small>
          {page}-{Math.min(page + 4, totalPages)} of {totalPages}
        </TYPE.small>
        <Button onClick={() => onPageChange(page - 1)} disabled={page !== totalPages}>
          <Prev />
        </Button>
        <Button onClick={() => onPageChange(page + 1)} disabled={page === totalPages}>
          <Next />
        </Button>
      </InfoContainer>
    </Container>
  )
}

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
`

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    flex-direction: column;
  }
  .pagination-container {
    margin: 0px;
    padding: 0px;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 16px;
    display: flex;
  }
  * li {
    cursor: pointer;
    display: block;
    font-weight: 500;
    font-size: 16px;
    line-height: 33px;
    min-width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    > a {
      color: ${({ theme }) => theme.text1};
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .break {
    font-weight: 500;
    font-size: 20px;
    line-height: 33px;
  }
  .disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  .page {
    // border: ${({ theme }) => `1px solid ${theme.bg11};`};
    border-radius: 50%;
  }
  .selected {
    border: none;
    background: ${({ theme }) => theme.bgG3};
  }
  .previous,
  .next {
    background-color: ${({ theme }) => theme.text10};
    border-radius: 50%;
  }
`

const Button = styled.div<{ disabled?: boolean }>`
  cursor: pointer;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.text10};
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

const Next = styled(ArrowIcon)``

const Prev = styled(ArrowIcon)`
  transform: rotate(-180deg);
`

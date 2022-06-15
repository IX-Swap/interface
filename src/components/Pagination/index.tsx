import React, { useMemo, useCallback } from 'react'
import styled, { css } from 'styled-components'
import ReactPaginate from 'react-paginate'

import arrowIcon from '../../assets/images/chevron.svg'
import { Trans } from '@lingui/macro'
import { Select } from 'components/Select'
import { gradientBorder } from 'theme'

interface Props {
  page: number
  totalPages: number
  onPageChange: (data: number) => void
}

export const Pagination = ({ page, onPageChange, totalPages }: Props) => {
  const onPageClick = ({ selected }: { selected: number }) => {
    onPageChange(selected)
  }

  const pagesOptions = useMemo(
    () => [...new Array(totalPages)].map((el, index) => ({ value: index, label: `${index + 1}` })),
    [totalPages]
  )

  const onSelectPage = ({ value }: { value: number }) => {
    onPageChange(value)
  }

  return (
    <Container>
      <ReactPaginate
        forcePage={page}
        breakLabel="..."
        onPageChange={onPageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={3}
        pageCount={totalPages}
        previousLabel={<Prev src={arrowIcon} alt="prevIcon" />}
        nextLabel={<Next src={arrowIcon} alt="nextIcon" />}
        containerClassName="pagination-container"
        pageClassName="page"
      />
      <GoToContaner>
        <Trans>Go to Page</Trans>
        <SelectContainer>
          <Select options={pagesOptions} value={page} onSelect={onSelectPage} isSearchable={false} />
        </SelectContainer>
      </GoToContaner>
    </Container>
  )
}

const SelectContainer = styled.div`
  *[class*='control'] {
    position: relative;
    height: 32px;
    background-color: transparent;
    ${gradientBorder}
  }
  div[class*='ValueContainer'] {
    padding-left: 0px;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
  }
  div[class*='indicatorContainer'] {
    padding: 0px;
    > svg {
      fill: white;
    }
  }
`

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-top: 48px;
  .pagination-container {
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
      color: white;
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
    border: ${({ theme }) => `1px solid ${theme.bg11};`};
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

const GoToContaner = styled.div`
  display: flex;
  align-items: center;
  column-gap: 8px;
`

const Next = styled.img``

const Prev = styled.img`
  transform: rotate(-180deg);
`

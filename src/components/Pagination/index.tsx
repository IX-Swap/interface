import React, { useState, useEffect } from 'react'
import { Trans } from '@lingui/macro'
import styled, { css } from 'styled-components'
import ReactPaginate from 'react-paginate'

import { Input } from 'components/Input'
import { inputGradientBorder } from 'theme'

import arrowIcon from '../../assets/images/chevron.svg'

interface Props {
  page: number
  totalPages: number
  onPageChange: (data: number) => void
}

export const Pagination = ({ page, onPageChange, totalPages }: Props) => {
  const [inputPage, hanldeInputPage] = useState(0)

  useEffect(() => {
    hanldeInputPage(page + 1)
  }, [page])

  const onPageClick = ({ selected }: { selected: number }) => {
    onPageChange(selected)
  }

  const onPageInputChange = ({ target: { value } }: { target: { value: string } }) => {
    if (!value) {
      hanldeInputPage(1)
    }
    if (+value && +value > totalPages) {
      hanldeInputPage(totalPages)

      return
    }
    hanldeInputPage(+value || 1)
  }

  const onClickButton = () => {
    onPageChange(inputPage - 1)
  }

  if (!totalPages) return null

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
        <InputContainer>
          <StyledInput value={inputPage} onChange={onPageInputChange} />
        </InputContainer>
        <Button onClick={onClickButton}>
          <Next src={arrowIcon} alt="nextIcon" />
        </Button>
      </GoToContaner>
    </Container>
  )
}

const InputContainer = styled.div`
  border-radius: 12px;
  position: relative;
  z-index: 1;
  ${inputGradientBorder};
  padding: 0 16px;
  width: 60px;
`

const StyledInput = styled(Input)`
  background-color: transparent;
  width: auto;
  border-radius: 12px;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  height: 32px;
  z-index: 20;
  padding: 0;
  width: 100%;
  text-align: center;
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

const Next = styled.img``

const Prev = styled.img`
  transform: rotate(-180deg);
`

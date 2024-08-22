import React from 'react'
import styled from 'styled-components'

import { ReactComponent as ArrowIcon } from '../../assets/images/newArrow.svg'

interface PaginatorProps {
  total: number
  pageSize: number
  currentPage: number
  onPageChange: (page: number) => void
}

const Paginator: React.FC<PaginatorProps> = ({ total, pageSize, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(total / pageSize)

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page)
    }
  }

  return (
    <PaginatorContainer>
      <Button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
        <PrevIcon />
      </Button>
      {Array.from({ length: totalPages }, (_, index) => (
        <PageNumber key={index + 1} active={index + 1 === currentPage} onClick={() => handlePageChange(index + 1)}>
          {index + 1}
        </PageNumber>
      ))}
      <Button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        <NextIcon />
      </Button>
    </PaginatorContainer>
  )
}

export default Paginator

const PaginatorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`

const Button = styled.button`
  padding: 8px 16px;
  margin: 0 4px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:disabled {
    background-color: #d9d9d9;
    cursor: not-allowed;
  }
`

const PageNumber = styled.span<{ active: boolean }>`
  padding: 8px 16px;
  margin: 0 4px;
  background-color: ${(props) => (props.active ? '#1890ff' : 'white')};
  color: ${(props) => (props.active ? 'white' : '#1890ff')};
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => (props.active ? '#1890ff' : '#e6f7ff')};
  }
`

const NextIcon = styled(ArrowIcon)``

const PrevIcon = styled(ArrowIcon)`
  transform: rotate(-180deg);
`

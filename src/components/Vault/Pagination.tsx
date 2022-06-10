import React from 'react'
import ReactPaginate from 'react-paginate'
import { useEventState, useGetEventCallback } from 'state/eventLog/hooks'
import styled from 'styled-components'
import { ActionTypes } from './enum'

export const PaginationContainer = styled.div`
  width: 100%;
  margin-top: 16px;
  ul {
    width: 100%;
    display: flex;
    gap: 15px;
    justify-content: center;
    flex-wrap: wrap;
    li {
      display: inline-block;
      a {
        color: ${({ theme }) => theme.text2};
        :hover {
          text-decoration: underline;
          cursor: pointer;
        }
      }
      &.selected {
        a {
          color: ${({ theme }) => theme.text1};
          font-weight: bold;
          padding: 1px 8px;
          border-radius: 50%;
          background-color: ${({ theme }) => theme.bg7};
        }
      }
    }
  }
`
export const Pagination = () => {
  const getEvents = useGetEventCallback()
  const {
    filter,
    tokenId,
    paginationDetails: { totalPages },
    page,
  } = useEventState()
  const onChange = ({ selected }: { selected: number }) => {
    getEvents({ filter: filter ?? ActionTypes.DEPOSIT, tokenId, page: selected + 1 })
  }
  return (
    <PaginationContainer>
      {totalPages > 1 && (
        <ReactPaginate
          pageCount={totalPages}
          forcePage={page - 1}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          onPageChange={(e: any) => onChange(e)}
        />
      )}
    </PaginationContainer>
  )
}

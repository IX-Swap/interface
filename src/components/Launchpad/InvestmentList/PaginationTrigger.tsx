import React from 'react'
import styled from 'styled-components'

interface Props {
  onTriggered: () => void
}

export const PaginationTrigger: React.FC<Props> = (props) => {
  return (
    <LoadMoreButton type="button" onClick={props.onTriggered}>
      Load more
    </LoadMoreButton>
  )
}

const LoadMoreButton = styled.button`
  display: grid;

  place-content: center;

  height: 60px;
  width: 100%;

  text-align: center;
  text-decoration: none;

  font-style: normal;
  font-weight: 600;
  font-size: 16px;

  line-height: 19px;
  letter-spacing: -0.02em;

  cursor: pointer;

  margin: 1rem auto;
  padding: 0.25rem 3rem;

  width: max-content;



  color: ${props => props.theme.launchpad.colors.text.light};
  background: ${props => props.theme.launchpad.colors.primary};
  border-radius: 6px;
  border: none;
  outline: 0;
`
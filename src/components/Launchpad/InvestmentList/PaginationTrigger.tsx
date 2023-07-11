import React from 'react'
import styled from 'styled-components'

import { Centered } from 'components/LaunchpadMisc/styled'
import { Loader } from 'components/LaunchpadOffer/util/Loader'
import { text9 } from 'components/LaunchpadMisc/typography'

interface Props {
  isLoading?: boolean
  onTriggered: () => void
}

export const PaginationTrigger: React.FC<Props> = (props) => {
  if (props.isLoading) {
    return (
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>
    )
  }

  return (
    <LoadMoreButton type="button" onClick={props.onTriggered}>
      Load more
    </LoadMoreButton>
  )
}

const LoaderWrapper = styled(Centered)`
  padding: 1rem;
`

const LoadMoreButton = styled.button`
  display: grid;
  place-content: center;
  height: 60px;
  width: 100%;
  text-align: center;
  text-decoration: none;

  font-family: ${(props) => props.theme.launchpad.font};

  ${text9}

  cursor: pointer;
  margin: 1rem auto;
  padding: 0.25rem 3rem;
  width: max-content;

  color: ${(props) => props.theme.launchpad.colors.text.light};
  background: ${(props) => props.theme.launchpad.colors.primary};
  border-radius: 6px;
  border: none;
  outline: 0;
`

import React from 'react'
import styled from 'styled-components'

interface Props {
  onTriggered: () => void
}

export const PaginationTrigger: React.FC<Props> = (props) => {
  const [isVisible, setIsVisible] = React.useState(false)

  const toggleContactForm = React.useCallback(() => setIsVisible(true), [])

  React.useEffect(() => {
    if (isVisible) {
      props.onTriggered()
    }
  }, [isVisible])

  return (
    <LoadMoreButton type="button" onClick={toggleContactForm}>
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

  color: ${props => props.theme.launchpad.colors.primary};
  background: ${props => props.theme.launchpad.colors.text.light};
  border-radius: 6px;
  border: none;
  outline: 0;
`
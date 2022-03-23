import React from 'react'
import styled from 'styled-components'

interface Props {
  name: string
  collectionName: string
  description?: string
  goToCollection: () => void
}

export const Info = ({ name, collectionName, description, goToCollection }: Props) => {
  return (
    <Container>
      <div onClick={goToCollection}>{collectionName}</div>
      <div>{name}</div>
      {description && <div>{description}</div>}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 12px;
  > div:nth-child(1) {
    font-size: 14px;
    text-decoration: underline;
    cursor: pointer;
  }
  > div:nth-child(2) {
    font-weight: 600;
    font-size: 36px;
  }
  > div:nth-child(3) {
    font-size: 18px;
  }
`

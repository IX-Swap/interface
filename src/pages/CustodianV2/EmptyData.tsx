import React from 'react'
import emptyImg from 'assets/images/empty-data.svg'
import styled from 'styled-components'

interface EmptyDataProps {
  title: string
  desc: string
}

const EmptyData: React.FC<EmptyDataProps> = ({ title, desc }) => {
  return (
    <Wrap>
      <img src={emptyImg} alt="empty" />
      <Title>{title}</Title>
      <Desc>{desc}</Desc>
    </Wrap>
  )
}

export default EmptyData

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 64px 20px;
  img {
    margin-bottom: 20px;
  }
`

const Title = styled.div`
  color: #556;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.28px;
`

const Desc = styled.div`
  color: #8f8fb2;
  text-align: center;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.42px;
  margin-top: 4px;
`

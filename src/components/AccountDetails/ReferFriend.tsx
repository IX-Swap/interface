import React from 'react'
import styled from 'styled-components'
import Copy from './Copy'

interface ReferFriendProps {
  referralCode: string
}

const ReferFriend: React.FC<ReferFriendProps> = ({ referralCode }) => {
  // Add your component logic here

  return (
    <div>
      <Title>Refer a Friend</Title>

      <BoxContainer>
        <ReferCode>{referralCode}</ReferCode>

        <Copy toCopy={`${new URL(window.location.href).href?.split('?')[0]}?referralCode=${referralCode}`} />
      </BoxContainer>
    </div>
  )
}

export default ReferFriend

const Title = styled.div`
  color: #292933;
  font-family: Inter;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.26px;
  margin-top: 8px;
`

const BoxContainer = styled.div`
  border-radius: 8px;
  margin-top: 12px;
  border: 1px solid #e6e6ff;
  background: #fff;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ReferCode = styled.div`
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  color: #292933;
`

import React, { Fragment } from 'react'
import { Flex } from 'rebass'
import styled from 'styled-components'

import SuccessIcon from 'assets/svg/success.svg'

interface SuccessProps {
  message: string
}

const Success: React.FC<SuccessProps> = ({ message }) => {
  return (
    <Fragment>
      <Flex className="toastify-body">
        <div style={{ paddingTop: 4 }}>
          <img src={SuccessIcon} alt="icon" style={{ marginRight: 12 }} />
        </div>
        <Message>{message}</Message>
      </Flex>
    </Fragment>
  )
}

export default Success

const Message = styled.div`
  color: #666680;
  font-family: Inter;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 20.8px */
  letter-spacing: -0.26px;
`

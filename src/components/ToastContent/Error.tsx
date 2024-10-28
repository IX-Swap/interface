import React, { Fragment } from 'react'
import styled from 'styled-components'
import { Flex } from 'rebass'

import ErrorIcon from 'assets/svg/error.svg'

interface ErrorProps {
  message?: string
  subMessage?: string
}

const Error: React.FC<ErrorProps> = ({ message = 'Something wrong.', subMessage = 'Try again.' }) => {
  return (
    <Fragment>
      <Flex className="toastify-body">
        <div style={{ paddingTop: 4 }}>
          <img src={ErrorIcon} alt="icon" style={{ marginRight: 12 }} />
        </div>
        <div>
          <Message>{message} </Message>
          <SubMessage>{subMessage}</SubMessage>
        </div>
      </Flex>
    </Fragment>
  )
}

export default Error

const Message = styled.div`
  color: #666680;
  font-family: Inter;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 20.8px */
  letter-spacing: -0.26px;
`

const SubMessage = styled.div`
  font-size: 12px;
  font-weight: medium;
  display: flex;
  align-items: center;
  margin-top: 10px;
`

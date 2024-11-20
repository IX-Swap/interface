import React from 'react'
import { Flex } from 'rebass'
import styled from 'styled-components'

import { ReactComponent as AlertIcon } from 'assets/images/icons/alert.svg'

const countries = {
  us: {
    name: 'United States',
    flags: ['🇺🇸'],
  },
  kp: {
    name: 'North Korea',
    flags: ['🇰🇵'],
  },
}

const CountriesBlockAlert: React.FC = () => {
  const flags = [...countries.us.flags, ...countries.kp.flags]

  return (
    <Container>
      <Flex alignItems={'center'} style={{ gap: 8 }}>
        <AlertIcon />
        <div>Our service is currently unavailable to citizens of the United States or North Korea.</div>
      </Flex>

      <Flex alignItems="center">
        {flags.map((flag, index) => (
          <span key={index} style={{ fontSize: 28 }}>
            {flag}
          </span>
        ))}
      </Flex>
    </Container>
  )
}

export default CountriesBlockAlert

const Container = styled.div`
  border-radius: 8px;
  border: 1px solid rgba(255, 168, 0, 0.5);
  background: rgba(255, 168, 0, 0.1);
  display: flex;
  padding: 12px 16px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  color: #e0a83d;
  text-align: center;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 22.4px */
  letter-spacing: -0.28px;
`

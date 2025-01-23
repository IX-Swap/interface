import React from 'react'
import notSupported from 'assets/images/not_supported.png'
import { Box, Text } from 'rebass'
import styled from 'styled-components'

const FeatureNotSupported: React.FC = () => {
  return (
    <Container>
      <Box css={{ maxWidth: 400, textAlign: 'center', margin: '0 auto' }}>
        <img src={notSupported} alt="Feature Not Supported" />
        <Text fontSize={48} lineHeight="56px" fontWeight={700} mt="21px">
          Feature
          <br /> Not Supported
        </Text>
        <Text mt="21px" fontSize={16} lineHeight="24px" fontWeight={400}>
          This feature is not supported on the current blockchain network. Please switch to a <br /> supported network
          to access it.
        </Text>
      </Box>
    </Container>
  )
}

export default FeatureNotSupported

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 124px);
  width: 100vw;
  background-color: #fff;
`

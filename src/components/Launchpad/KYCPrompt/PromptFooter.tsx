import React from 'react'
import styled from 'styled-components'

export const PromptFooter = () => {
  return (
    <Container>
      <CompianceNotice>
        To comply with regulatory requirements, we have to verify your identity before you can proceed.
      </CompianceNotice>

      <Separator />

      <ProcessingEstimationInfo>
        Account verification can take 1-3 days to be process.
      </ProcessingEstimationInfo>
    </Container>
  )
}

const Container = styled.div`
  display: flex;

  flex-flow: column nowrap;
  justify-content: space-around;
  align-items: stretch;

  gap: 1rem;

  text-align: center;
`
const CompianceNotice = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 13px;

  line-height: 150%;
  letter-spacing: -0.02em;
  
  text-align: center;

  color: ${props => props.theme.launchpad.colors.text.title};

  opacity: 0.8;
`

const Separator = styled.div`
  margin-top: 2rem;
  border-top: 1px solid ${props => props.theme.launchpad.colors.border.default};
`

const ProcessingEstimationInfo = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 11px;

  line-height: 150%;
  letter-spacing: -0.02em;
  
  text-align: center;

  color: ${props => props.theme.launchpad.colors.text.title};
  
  opacity: 0.6;
`
import React from 'react'
import styled from 'styled-components'

const ProgressContainer = styled.div`
  height: 14px;
  width: 100%;
  background: ${({ theme }) => theme.bgG16};
  border-radius: 24px;
  margin: 8px 0;
`
const ProgressFiller = styled.div<{ completed: number }>`
  height: 100%;
  width: ${({ completed }) => `${completed}%`};
  background: ${({ theme }) => theme.bgG3};
  border-radius: inherit;
  text-align: right;
`

const IXSProgressBar = ({ completed }: { completed: number }) => {
  return (
    <ProgressContainer>
      <ProgressFiller completed={completed} />
    </ProgressContainer>
  )
}

export default IXSProgressBar

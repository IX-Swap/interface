import styled from 'styled-components'

export const PrerequisiteMessageWrapper = styled.div`
  background: ${({ theme }) => theme.bgGradientGray};
  border-radius: 34px;
  backdrop-filter: blur(4px);
  padding: 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
}
`

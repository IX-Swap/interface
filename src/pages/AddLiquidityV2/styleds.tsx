import styled from 'styled-components'

export const ToggleableBody = styled.div<{ isVisible?: boolean }>`
  max-width: 592px;
  width: 100%;
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
`

export const ModalHeaderWrapper = styled.div`
  padding-bottom: 1rem;
  margin-left: 40px;
  margin-right: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ModalBottomWrapper = styled.div`
  padding: 27px 40px 27px 40px;
  background: ${({ theme }) => theme.bgGradientGray};
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`

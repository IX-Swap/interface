import styled from 'styled-components'

export const ToggleableBody = styled.div<{ isVisible?: boolean }>`
  max-width: 592px;
  width: 100%;
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
`

export const ModalHeaderWrapper = styled.div`
  padding-bottom: 1rem;
  margin-bottom: 20px;
  display: flex;
  padding: 27px 40px 27px 40px;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.bg25};
  border: solid 1px #e6e6ff;
  border-radius: 10px;

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
   padding: 27px 22px 27px 10px;
  `};
`

export const ModalBottomWrapper = styled.div`
  padding: 27px 40px 27px 40px;
  background: ${({ theme }) => theme.bg1};
  border-radius: 10px;
  border: solid 1px #e6e6ff;

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
   padding: 27px 22px 27px 10px;
  `}
`

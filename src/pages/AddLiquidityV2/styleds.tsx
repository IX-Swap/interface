import styled from 'styled-components'

export const ToggleableBody = styled.div<{ isVisible?: boolean }>`
  max-width: 592px;
  width: 100%;
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
`
export const MenuFlyoutWrapper = styled.span`
  background: ${({ theme }) => theme.bgGradientShadow};
  border-radius: 45px;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  display: flex;
  min-width: 622px;
  z-index: 5;
  padding: 34px;
  backdrop-filter: blur(20px);
  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 0;
  `};
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    min-width: 100%;
    max-width: 100%;
  `};
  user-select: none;
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

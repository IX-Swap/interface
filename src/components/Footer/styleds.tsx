import styled from 'styled-components'
import { MEDIA_WIDTHS } from 'theme'

export const Container = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  background-color: ${({ theme }) => theme.bg16};
  z-index: 2;
`

export const Content = styled.div`
  padding: 40px 16px 18px;
  max-width: 1300px;
  width: 100%;
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => `${theme.text2}50`};
  * {
    font-weight: 600;
  }
`

export const LogoBlockContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 12px;
  font-size: 12px;
  max-width: 293px;
  align-items: flex-start;
`
export const ProductsBlockContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 18px;
  font-size: 14px;
  > div:last-child {
    * {
      color: ${({ theme }) => theme.white};
      text-decoration: none;
    }
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 76px;
    row-gap: 8px;
  }
`

export const SocialBlockContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 18px;
  font-size: 14px;
  > div:last-child {
    * {
      color: ${({ theme }) => theme.white};
      text-decoration: none;
    }
    display: grid;
    grid-template-columns: repeat(4, 18px);
    column-gap: 34px;
    row-gap: 26px;
  }
`

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.bg7};
  margin: 32px 0;
`
export const InfoBlockContainer = styled.div`
  display: flex;
  justify-content: space-between;
  column-gap: 32px;
  > div {
    font-size: 10px;
    display: flex;
    flex-direction: column;
    row-gap: 16px;
    max-width: 544px;
    @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
      max-width: 100%;
    }
  }

  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    flex-direction: column;
    row-gap: 32px;
  }
`
export const CopyrightBlockContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 10px;
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.text2};
  }
  > div:first-child {
    color: ${({ theme }) => theme.text2};
    display: flex;
    column-gap: 32px;
  }
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    flex-direction: column-reverse;
    row-gap: 16px;
  }
`

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 32px;
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    flex-wrap: wrap;
  }
`

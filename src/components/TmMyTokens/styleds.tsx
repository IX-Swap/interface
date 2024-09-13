import styled from 'styled-components'

import {  MEDIA_WIDTHS } from 'theme'

export const Container = styled.div`
  flex: 1;
`

export const TokensList = styled.div`
  position: relative;
  border: 1px solid #e6e6ff;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 32px;
  gap: 30px;
  border-radius: 8px;
  background: ${({ theme }) => theme.bg25};
  :before {
    border-radius: 30px;
  }
  @media (max-width: ${MEDIA_WIDTHS.upToLarge}px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }

  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    grid-template-columns: 1fr;
    gap: 16px;
    padding: 16px;
  }
`

export const Item = styled.div`
  cursor: pointer;
  padding: 16px 24px;
  border-radius: 8px;
  border: 1px solid #e6e6ff;
  background: ${({ theme }) => theme.bg25};
  backdrop-filter: blur(20px);
  display: flex;
  align-items: center;
  gap: 16px;
  @media (max-width: ${MEDIA_WIDTHS.upToMedium}px) {
    padding: 26px 48px;
  }
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    padding: 16px 26px;
  }
`

export const InfoContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`

export const Symbol = styled.div`
  font-weight: 500;
  font-size: 13px;
  line-height: 33px;
  color: #292933;
`

export const Name = styled.div`
  font-weight: 500;
  font-size: 13px;
  line-height: 16px;
  color: ${({ theme }) => theme.text11};
`

import styled from 'styled-components'

import { gradientBorder, MEDIA_WIDTHS } from 'theme'

export const Container = styled.div`
  position: relative;
  ${gradientBorder}
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 32px;
  gap: 30px;
  border-radius: 30px;
  background: ${({ theme }) => theme.bgG4};
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
  padding: 26px 86px;
  border-radius: 30px;
  background: ${({ theme }) => theme.bgG19};
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
  flex-direction: column;
`

export const Symbol = styled.div`
  font-weight: 600;
  font-size: 22px;
  line-height: 33px;
  color: #ffffff;
`

export const Name = styled.div`
  font-weight: 600;
  font-size: 11px;
  line-height: 16px;
  color: ${({ theme }) => theme.text2};
`

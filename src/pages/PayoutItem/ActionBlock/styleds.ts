import styled, { css } from 'styled-components'

import { ButtonIXSWide } from 'components/Button'
import { MEDIA_WIDTHS } from 'theme'

const commonStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 65px 0;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 8px;
  font-size: 14px;
  line-height: 150%;
  color: ${({ theme }) => theme.text2};
`

export const TokenSymbol = styled.span`
  color: rgba(143, 143, 178, 1);
`

export const Container = styled.div`
  ${commonStyles}
  background: ${({ theme }) => theme.bg0};
  color: rgba(41, 41, 51, 1);
  letter-spacing: -0.02em;
  :before {
    border-radius: 30px;
    padding: 1px;
  }
`

export const StyledButton = styled(ButtonIXSWide)`
  font-size: 13px;
  font-weight: 600;
  border-radius: 6px;
  padding: 15px 63px;
  margin-right: 0;
  width: auto;
`

export const FuturePayoutContainer = styled.div`
  ${commonStyles}
  background: radial-gradient(76.91% 60% at 2.38% 3.84%, rgba(123, 66, 169, 0.39) 0%, rgba(26, 18, 58, 0) 100%),
    radial-gradient(79.76% 116.06% at 44.22% 136.36%, rgba(102, 20, 206, 0.132) 0%, rgba(26, 18, 58, 0) 100%),
    radial-gradient(93.65% 93.65% at 58.57% 22.42%, rgba(206, 20, 132, 0.198) 0%, rgba(26, 18, 58, 0) 100%),
    rgba(44, 37, 74, 0.3);
`

export const DelayedContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
  > div {
    display: flex;
    align-items: center;
    gap: 4px;
    flex-wrap: wrap;
    justify-content: center;
  }
  > div:first-child {
    font-weight: 400;
    font-size: 16px;
  }
  > div:nth-child(2) {
    font-weight: 600;
    font-size: 20px;
    line-height: 36px;
    @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
      line-height: 24px;
    }
  }
  > div:last-child {
    color: ${({ theme }) => theme.text9};
    font-weight: 400;
    font-size: 16px;
  }
`
